# Databricks Data Engineer Learning Content Repo

## Role
You are a Databricks and data engineering expert and content creator. This repo contains educational content covering Databricks platform concepts, targeting the Databricks Certified Data Engineer Associate exam.

See `../CLAUDE.md` for shared notebook conventions, repo structure, audio generation, TTS guidelines, and content guidelines.

## Exam Coverage

Content is organised around the five official exam domains:

| Domain | Weight | Section |
|--------|--------|---------|
| Databricks Lakehouse Platform | 24% | Lakehouse Platform |
| ELT with Spark SQL & Python | 29% | ELT with Spark SQL & Python |
| Incremental Data Processing | 22% | Incremental Data Processing |
| Production Pipelines | 16% | Production Pipelines |
| Data Governance | 9% | Data Governance |

## Content Guidelines

- Use PySpark and Spark SQL for all code examples (exam uses both)
- Code cells should be written as if running in a Databricks notebook (no local SparkSession setup needed)
- Cross-reference apache-spark repo for Spark fundamentals — do not duplicate theory already covered there
- Keep Delta Lake basics brief here; `apache-spark` notebooks 18–20 cover them in depth

## Topics Covered

### Lakehouse Platform
| Topic | Notebook | Audio |
|-------|----------|-------|
| Lakehouse Architecture | `01-lakehouse-architecture.ipynb` | `01-lakehouse-architecture.wav` |
| Databricks Workspace & Clusters | `02-workspace-clusters.ipynb` | `02-workspace-clusters.wav` |
| Delta Lake on Databricks | `03-delta-lake-on-databricks.ipynb` | `03-delta-lake-on-databricks.wav` |

### ELT with Spark SQL & Python
| Topic | Notebook | Audio |
|-------|----------|-------|
| Querying Files with Spark SQL | `04-querying-files-spark-sql.ipynb` | `04-querying-files-spark-sql.wav` |
| Writing to Delta Tables | `05-writing-to-delta-tables.ipynb` | `05-writing-to-delta-tables.wav` |
| Cleaning & Transforming Data | `06-cleaning-transforming-data.ipynb` | `06-cleaning-transforming-data.wav` |
| SQL UDFs & Higher-Order Functions | `07-sql-udfs-higher-order-functions.ipynb` | `07-sql-udfs-higher-order-functions.wav` |
| Python UDFs & Control Flow | `08-python-udfs-control-flow.ipynb` | `08-python-udfs-control-flow.wav` |

### Incremental Data Processing
| Topic | Notebook | Audio |
|-------|----------|-------|
| Auto Loader | `09-auto-loader.ipynb` | `09-auto-loader.wav` |
| Change Data Capture & MERGE | `10-change-data-capture-merge.ipynb` | `10-change-data-capture-merge.wav` |
| Structured Streaming on Databricks | `11-structured-streaming-databricks.ipynb` | `11-structured-streaming-databricks.wav` |

### Production Pipelines
| Topic | Notebook | Audio |
|-------|----------|-------|
| Delta Live Tables | `12-delta-live-tables.ipynb` | `12-delta-live-tables.wav` |
| DLT Expectations & Data Quality | `13-dlt-expectations-data-quality.ipynb` | `13-dlt-expectations-data-quality.wav` |
| Databricks Workflows & Jobs | `14-databricks-workflows-jobs.ipynb` | `14-databricks-workflows-jobs.wav` |

### Data Governance
| Topic | Notebook | Audio |
|-------|----------|-------|
| Unity Catalog | `15-unity-catalog.ipynb` | `15-unity-catalog.wav` |
| Data Objects & Access Control | `16-data-objects-access-control.ipynb` | `16-data-objects-access-control.wav` |
