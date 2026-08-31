import type { Scene } from '../../render-engine'

// §2 git-folders — the remote and the workspace folder are bidirectional, which is the whole feature:
// Git inside the UI. The closing band draws the division of labour against bundles, because the two
// are complementary and the exam can blur them: humans EDIT in a Git Folder, a bundle DEPLOYS.
export const gitFolders: Scene = {
  id: 'git-folders',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'backed',
      label: 'A workspace folder backed by a Git remote',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'gf-remote',
          label: 'Git remote',
          pattern: 'external',
          icon: 'gitbranch',
          sub: 'GitHub · GitLab · ADO · Bitbucket',
        },
        {
          id: 'gf-folder',
          label: 'Git Folder',
          pattern: 'service',
          icon: 'code',
          sub: 'Git inside the workspace UI',
        },
      ],
      edges: [{ source: 'gf-remote', target: 'gf-folder', bidirectional: true }],
    },
    {
      id: 'ui-verbs',
      label: 'From the UI',
      pattern: 'group',
      cols: 5,
      children: [
        { id: 'gv-clone', label: 'clone', pattern: 'network', icon: 'copy', variant: 'tile' },
        { id: 'gv-branch', label: 'branch', pattern: 'network', icon: 'gitbranch', variant: 'tile' },
        { id: 'gv-commit', label: 'commit + push', pattern: 'network', icon: 'circlecheck', variant: 'tile' },
        { id: 'gv-pull', label: 'pull', pattern: 'network', icon: 'repeat', variant: 'tile' },
        { id: 'gv-pr', label: 'open a PR', pattern: 'network', icon: 'dooropen', variant: 'tile' },
      ],
    },
    {
      id: 'outside',
      label: 'Outside a Git Folder',
      pattern: 'warn',
      icon: 'ban',
      sub: 'files are NOT source-controlled',
    },
  ],
  edges: [
    { source: 'backed', target: 'ui-verbs' },
    { source: 'ui-verbs', target: 'outside' },
  ],
}
