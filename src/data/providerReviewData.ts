export type ReviewContribution = {
  id: string
  title: string
  scope: 'Part A' | 'Part B' | 'Part C' | 'Cross-Part'
  status: 'Completed' | 'Planned'
  awsPillars: string[]
  databricksPillars: string[]
  contribution: string
  evidence: string[]
}

export type ReviewWave = {
  wave: 'Wave 1 (P0)' | 'Wave 2 (P1)' | 'Wave 3 (P2)'
  status: 'Completed' | 'Planned'
  tasks: string[]
}

export const reviewContributions: ReviewContribution[] = [
  {
    id: 'REV-C-001',
    title: 'UC data access baseline (storage credential, external location, volume)',
    scope: 'Part B',
    status: 'Completed',
    awsPillars: ['Security', 'Reliability', 'Operational Excellence'],
    databricksPillars: ['Data Management', 'Governance & Monitoring'],
    contribution:
      'Codifies Unity Catalog external-data access in IaC and reduces manual onboarding drift for data domains.',
    evidence: [
      'modules/unity_catalog_baseline/main.tf',
      'workspace_configuration/main.tf',
      'workspace_configuration/variables.tf',
    ],
  },
  {
    id: 'REV-C-002',
    title: 'Reusable UC grants templates and bindings',
    scope: 'Part B',
    status: 'Completed',
    awsPillars: ['Operational Excellence'],
    databricksPillars: ['Security & Compliance', 'Governance & Monitoring'],
    contribution:
      'Standardizes least-privilege access patterns and improves repeatability for environment/domain onboarding.',
    evidence: [
      'modules/unity_catalog_baseline/variables.tf',
      'modules/unity_catalog_baseline/main.tf',
      'workspace_configuration/vars/dev.tfvars',
    ],
  },
  {
    id: 'REV-C-003',
    title: 'Workspace hardening baseline (IP access lists + secrets family)',
    scope: 'Part B',
    status: 'Completed',
    awsPillars: ['Security', 'Operational Excellence'],
    databricksPillars: ['Security & Compliance', 'Operational Excellence'],
    contribution:
      'Introduces provider-backed workspace hardening controls and operational secret scope governance.',
    evidence: [
      'modules/workspace_hardening/main.tf',
      'modules/workspace_hardening/variables.tf',
      'workspace_configuration/main.tf',
    ],
  },
  {
    id: 'REV-C-004',
    title: 'Auth profile effective in provider blocks (OIDC-first ready)',
    scope: 'Cross-Part',
    status: 'Completed',
    awsPillars: ['Security', 'Operational Excellence'],
    databricksPillars: ['Security & Compliance', 'Operational Excellence'],
    contribution:
      'Moves auth strategy from variable contract to runtime provider behavior in Part A, Part B, and Part C.',
    evidence: [
      'aws_databricks_provisioning/databricks_deployment/providers.tf',
      'databricks-workspace-configuration-aws/workspace_configuration/providers.tf',
      'databricks-service-principal-bootstrap/providers.tf',
    ],
  },
  {
    id: 'REV-C-005',
    title: 'Dedicated UC external data IAM role wiring',
    scope: 'Part A',
    status: 'Completed',
    awsPillars: ['Security', 'Reliability'],
    databricksPillars: ['Data Management', 'Governance & Monitoring'],
    contribution:
      'Separates metastore and external-data access responsibilities and improves cloud storage access posture for UC objects.',
    evidence: [
      'aws_databricks_provisioning/modules/dbx_metastore/storage_config.tf',
      'aws_databricks_provisioning/databricks_deployment/outputs.tf',
      'workspace_configuration/remote_state.tf',
    ],
  },
]

export const reviewWaves: ReviewWave[] = [
  {
    wave: 'Wave 1 (P0)',
    status: 'Completed',
    tasks: [
      'Extend UC baseline with storage credentials, external locations, and external volumes',
      'Add reusable UC grant templates and environment mappings',
      'Implement workspace hardening controls (IP access lists + secrets family + settings baseline)',
      'Activate auth_profile strategy in provider configuration across Part A / Part B / Part C',
    ],
  },
  {
    wave: 'Wave 2 (P1)',
    status: 'Planned',
    tasks: [
      'Add compute runtime baseline (instance pools, global init scripts, curated platform clusters)',
      'Add optional data engineering starter baseline (pipeline and repo/notebook assets where platform-owned)',
    ],
  },
  {
    wave: 'Wave 3 (P2)',
    status: 'Planned',
    tasks: [
      'Standardize SQL resource model choices and naming conventions',
      'Upgrade Databricks provider in controlled phases (Part C → Part A → Part B) with compatibility testing',
    ],
  },
]

export const awsPillarContributionSummary = [
  'Security: workspace hardening controls, OIDC-first provider auth behavior, and dedicated UC external data IAM role.',
  'Operational Excellence: reusable grant templates and provider-auth profile consistency across all parts.',
  'Reliability: clearer UC storage role separation and less manual drift in governance/data-access provisioning.',
]

export const databricksPillarContributionSummary = [
  'Security & Compliance: codified UC privilege model + workspace secret governance + profile-aware auth execution.',
  'Governance & Monitoring: baseline UC data-access objects and templated grants for repeatable domain onboarding.',
  'Data Management: external location/volume/storage credential IaC pattern anchored to foundation outputs.',
  'Operational Excellence: deterministic Wave-based backlog execution and implemented Part A → Part B dependency flow.',
]
