import type { Scene } from '../../render-engine'

// §3, §4, §5, §7 — the governance SQL block, the concept's last code run. Same house rules: lines at
// or under CODE_MIN_COLS (76), and no `sub` on a SQL card (codeLines would append it as a `#`
// comment, not `--`), so the commentary is inline.

const code = (id: string, filename: string, label: string): Scene => ({
  id,
  padding: 0.16,
  nodes: [{ id: `${id}-card`, kind: 'code', filename, label }],
  edges: [],
})

export const codeGrants = code(
  'code-grants',
  'grants.sql',
  `-- GRANT adds. Walk the hierarchy TOP-DOWN -- all three of these
-- together are what actually let a group read a table.
GRANT USE CATALOG ON CATALOG fintech_dev            TO \`analysts\`;
GRANT USE SCHEMA  ON SCHEMA  fintech_dev.gold       TO \`analysts\`;
GRANT SELECT ON TABLE fintech_dev.gold.customer_360 TO \`analysts\`;

-- REVOKE removes a privilege you granted earlier.
REVOKE SELECT ON TABLE fintech_dev.gold.customer_360
  FROM \`analysts\`;

-- DENY blocks it, even when another grant would have allowed it.
DENY SELECT ON TABLE fintech_dev.silver.customers TO \`analysts\`;

-- THE PRECEDENCE RULE: **DENY beats GRANT**. Granted SELECT on the
-- whole catalog, then DENY on one table? They read everything in
-- the catalog EXCEPT that table. DENY is the surgical exception.

-- Three principal types: users | GROUPS | service principals.
-- Grant to GROUPS, never individuals -- group grants survive
-- joiners and leavers. Per-user grants rot into an unauditable
-- mess nobody dares clean up.`,
)

export const codeMasking = code(
  'code-masking',
  'masking.sql',
  `-- A column mask is a FUNCTION that runs at query time and decides
-- -- from the caller's identity -- what value to return.

-- 1. Declare the mask as a UC function.
CREATE FUNCTION security.mask_pan(pan STRING) RETURNS STRING
RETURN CASE
  WHEN is_account_group_member('fraud_analysts')
    THEN concat('XXXX-XXXX-XXXX-', right(pan, 4))
  WHEN is_account_group_member('compliance') THEN pan
  ELSE 'REDACTED'
END;

-- 2. Attach it to the column.
ALTER TABLE silver.card_accounts
  ALTER COLUMN pan SET MASK security.mask_pan;

-- From now on EVERY read of that column runs through the mask --
-- whatever the query path, whatever the BI tool.
-- Remove it with: ALTER COLUMN pan DROP MASK

-- WHY NOT JUST A VIEW: a mask is applied to the BASE TABLE, so
-- there is no "someone forgot to use the secure view" hole. The
-- mask travels with the column itself.`,
)

export const codeRowFilters = code(
  'code-row-filters',
  'row_filters.sql',
  `-- A mask controls WHICH COLUMNS' VALUES you see.
-- A row filter controls WHICH ROWS you see at all.

CREATE FUNCTION security.region_filter(country STRING)
RETURNS BOOLEAN
RETURN CASE
  WHEN is_account_group_member('compliance_in') THEN country = 'IN'
  WHEN is_account_group_member('compliance_us') THEN country = 'US'
  WHEN is_account_group_member('compliance')    THEN TRUE
  ELSE FALSE                    -- in no group? you see NOTHING
END;

ALTER TABLE silver.customers
  SET ROW FILTER security.region_filter ON (country);

-- Every read is now implicitly:
--   WHERE security.region_filter(country) = TRUE
-- Remove it with: ALTER TABLE ... DROP ROW FILTER

-- COMBINE THEM for a full PII regime on ONE base table:
--   a compliance analyst in India sees full PII, Indian rows only
--   a plain analyst sees Indian rows with REDACTED in the PAN`,
)

export const codeDynamicViews = code(
  'code-dynamic-views',
  'dynamic_views.sql',
  `-- The LEGACY way to do both jobs, before masks and row filters
-- were first-class: one view doing them in its own SELECT.

CREATE VIEW gold.customers_secure AS
SELECT customer_id,
       CASE WHEN is_account_group_member('compliance')
            THEN email ELSE 'REDACTED' END AS email,
       city, country
FROM   silver.customers
WHERE  CASE
         WHEN is_account_group_member('compliance_in')
           THEN country = 'IN'
         WHEN is_account_group_member('compliance') THEN TRUE
         ELSE FALSE
       END;

-- STILL USE A VIEW FOR: very simple cases, or a non-UC client
-- that does not understand masks and filters.

-- OTHERWISE masks + filters + ABAC win, for three reasons:
--   they apply to the BASE TABLE -- no forgot-the-view hole
--   they compose with ordinary grants
--   ABAC scales them across many tables, by tag`,
)
