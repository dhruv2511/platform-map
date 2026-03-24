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
  {
    id: 'REV-C-006',
    title: 'Centralized module registry completion with split networking topology modules',
    scope: 'Cross-Part',
    status: 'Completed',
    awsPillars: ['Operational Excellence', 'Reliability', 'Security'],
    databricksPillars: ['Operational Excellence', 'Governance & Monitoring'],
    contribution:
      'Completes shared module operating model and enforces reusable topology-aware deployment patterns for single_vpc, hub_spoke, and spoke_only.',
    evidence: [
      'terraform-modules-central/README.md',
      'aws_databricks_provisioning/databricks_deployment/main.tf',
      'databricks-workspace-configuration-aws/workspace_configuration/main.tf',
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
      'Complete centralized module registry and split networking modules (networking / network_hub / network_spoke)',
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
  'Operational Excellence: reusable grant templates, centralized module registry, and provider-auth profile consistency across all parts.',
  'Reliability: clearer UC storage role separation and less manual drift in governance/data-access provisioning.',
]

export const databricksPillarContributionSummary = [
  'Security & Compliance: codified UC privilege model + workspace secret governance + profile-aware auth execution.',
  'Governance & Monitoring: baseline UC data-access objects and templated grants for repeatable domain onboarding.',
  'Data Management: external location/volume/storage credential IaC pattern anchored to foundation outputs.',
  'Operational Excellence: deterministic Wave-based backlog execution, centralized module model, and implemented Part A → Part B dependency flow.',
]

// ============================================================================
// Provider Gap Analysis vs Latest Databricks Terraform Provider
// ============================================================================

export type ProviderGapSeverity = 'High' | 'Medium' | 'Low'
export type ProviderGapCategory =
  | 'Security & Compliance'
  | 'Compute & Serverless'
  | 'AI / ML Platform'
  | 'Governance & Monitoring'
  | 'Provider Currency'

export type ProviderGap = {
  id: string
  category: ProviderGapCategory
  severity: ProviderGapSeverity
  resource: string
  title: string
  description: string
  impact: string
  wave: 'Wave 2 (P1)' | 'Wave 3 (P2)' | 'Backlog'
  providerVersionIntroduced: string
}

/**
 * Current baseline: provider pinned at ~> 1.91 across all stacks.
 * Latest provider as of Mar 2026: 1.65.x (registry.terraform.io/providers/databricks/databricks).
 *
 * Each entry below is a resource or capability available in the latest provider
 * that the platform has not yet adopted, either because it post-dates the current
 * pin or was not in scope for Wave 1.
 */
export const providerGaps: ProviderGap[] = [
  // ── Security & Compliance ────────────────────────────────────────────────
  {
    id: 'PGP-001',
    category: 'Security & Compliance',
    severity: 'High',
    resource: 'databricks_enhanced_security_monitoring',
    title: 'Enhanced Security Monitoring not enabled',
    description:
      'Provider resource for workspace-level enhanced security monitoring (ESM) enables continuous integration with SIEM tooling, extra audit events, and malicious-activity detection. Not yet codified in workspace_hardening module.',
    impact:
      'ESM-level audit events and threat-detection signals are absent; compliance evidence for security-sensitive workloads is weaker.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.57',
  },
  {
    id: 'PGP-002',
    category: 'Security & Compliance',
    severity: 'High',
    resource: 'databricks_automatic_cluster_update',
    title: 'Automatic cluster runtime update not configured',
    description:
      'Provider resource enables workspace-wide automated patching of cluster runtimes. Without it, DBR version currency relies on manual cluster policy updates and job reconfiguration after each DBR release.',
    impact:
      'Cluster runtimes can drift from the patched DBR line between manual maintenance windows, increasing CVE exposure.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.57',
  },
  {
    id: 'PGP-003',
    category: 'Security & Compliance',
    severity: 'Medium',
    resource: 'databricks_compliance_security_profile',
    title: 'Compliance Security Profile (FedRAMP/HIPAA) not IaC-managed',
    description:
      'Provider resource controls the workspace compliance security profile (FedRAMP High, HIPAA, etc.). Currently not included in the workspace_hardening module; profile must be set manually via the account console.',
    impact:
      'Compliance profile-level controls are outside Terraform state, creating audit drift and blocking regulated-workload onboarding.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.57',
  },
  // ── Compute & Serverless ─────────────────────────────────────────────────
  {
    id: 'PGP-004',
    category: 'Compute & Serverless',
    severity: 'High',
    resource: 'databricks_app',
    title: 'Databricks Apps serverless runtime not provisioned',
    description:
      'Databricks Apps is a new serverless compute tier for deploying web applications and dashboards. GA in 2025; not yet modelled in any platform module. No deployment pattern, IAM, or network baseline exists.',
    impact:
      'Teams wanting to deploy Databricks Apps must provision them manually, outside IaC governance and without platform guardrails.',
    wave: 'Wave 3 (P2)',
    providerVersionIntroduced: '≥ 1.65',
  },
  {
    id: 'PGP-005',
    category: 'Compute & Serverless',
    severity: 'Medium',
    resource: 'databricks_network_connectivity_config',
    title: 'No private connectivity config for serverless workloads',
    description:
      'Serverless compute (SQL warehouses, Model Serving, Apps) uses a separate network path from classic clusters. The provider resource for Network Connectivity Configs (NCC) manages private endpoints for this serverless egress path. Not yet implemented.',
    impact:
      'Serverless workloads currently egress over public routes, bypassing the PrivateLink isolation established for classic cluster traffic.',
    wave: 'Wave 3 (P2)',
    providerVersionIntroduced: '≥ 1.48',
  },
  {
    id: 'PGP-006',
    category: 'Compute & Serverless',
    severity: 'Medium',
    resource: 'databricks_instance_pool',
    title: 'Instance pools not IaC-managed (Wave 2 backlog)',
    description:
      'Already identified in Wave 2 (P1). Instance pools reduce cluster start-up latency and improve spot-instance stability. The resource is available in the current provider pin but not yet implemented in any module.',
    impact:
      'Cluster cold-start times are higher than necessary; spot-interruption recovery is slower without a pool buffer.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.0',
  },
  {
    id: 'PGP-007',
    category: 'Compute & Serverless',
    severity: 'Medium',
    resource: 'databricks_global_init_script',
    title: 'Global init scripts not IaC-managed (Wave 2 backlog)',
    description:
      'Already identified in Wave 2 (P1). Global init scripts allow consistent bootstrap behavior (environment variables, agent installs, compliance tooling) across all clusters. Not yet implemented.',
    impact:
      'Runtime environment consistency depends on per-cluster init scripts rather than a centrally governed global baseline.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.0',
  },
  // ── AI / ML Platform ─────────────────────────────────────────────────────
  {
    id: 'PGP-008',
    category: 'AI / ML Platform',
    severity: 'Medium',
    resource: 'databricks_model_serving',
    title: 'Model Serving endpoints not IaC-managed',
    description:
      'Provider resource for Model Serving endpoints (real-time inference). No platform baseline or module exists for endpoint provisioning, scaling configuration, or access controls.',
    impact:
      'Data science teams provision serving endpoints ad-hoc; no governance, tagging, or access-control baseline is enforced.',
    wave: 'Wave 3 (P2)',
    providerVersionIntroduced: '≥ 1.40',
  },
  {
    id: 'PGP-009',
    category: 'AI / ML Platform',
    severity: 'Medium',
    resource: 'databricks_registered_model',
    title: 'UC Model Registry not IaC-managed',
    description:
      'Provider resources for Unity Catalog Registered Models and Registered Model Versions enable IaC-governed ML model lifecycle management. Not yet in the UC baseline module.',
    impact:
      'ML model registration, aliasing, and promotion remain manual; no Terraform-verified ownership or access-control baseline.',
    wave: 'Wave 3 (P2)',
    providerVersionIntroduced: '≥ 1.48',
  },
  {
    id: 'PGP-010',
    category: 'AI / ML Platform',
    severity: 'Low',
    resource: 'databricks_vector_search_endpoint / databricks_vector_search_index',
    title: 'Vector Search endpoints and indexes not IaC-managed',
    description:
      'Provider resources for Vector Search allow IaC provisioning of similarity-search indexes against Delta tables. Not in scope for any current wave.',
    impact:
      'Vector Search infrastructure is provisioned manually without platform tagging, cost-allocation, or network isolation controls.',
    wave: 'Backlog',
    providerVersionIntroduced: '≥ 1.55',
  },
  // ── Governance & Monitoring ──────────────────────────────────────────────
  {
    id: 'PGP-011',
    category: 'Governance & Monitoring',
    severity: 'Medium',
    resource: 'databricks_quality_monitor',
    title: 'Lakehouse Monitoring quality monitors not IaC-managed',
    description:
      'Provider resource for Lakehouse Monitoring quality monitors enables automated data-quality SLA tracking directly in Unity Catalog. No platform baseline exists; monitors are created manually by data teams.',
    impact:
      'Data quality SLOs are untracked at the platform layer; no standardized monitor template, threshold policy, or notification wiring.',
    wave: 'Wave 3 (P2)',
    providerVersionIntroduced: '≥ 1.50',
  },
  {
    id: 'PGP-012',
    category: 'Governance & Monitoring',
    severity: 'Medium',
    resource: 'databricks_budget_policy',
    title: 'Budget Policies (new governance primitive) not implemented',
    description:
      'Newer provider resource that attaches budget policies to users, service principals, and groups — more granular than cluster-policy budget tiers. Provides a second layer of spend control beyond the current cluster-level enforcement.',
    impact:
      'Principal-level spend controls are absent; a compromised or misconfigured SP can consume disproportionate DBU budget beyond cluster-policy caps.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.60',
  },
  {
    id: 'PGP-013',
    category: 'Governance & Monitoring',
    severity: 'Medium',
    resource: 'databricks_catalog_workspace_binding',
    title: 'Catalog workspace bindings not explicitly managed',
    description:
      'Provider resource explicitly manages which workspaces can access a given UC catalog. The current UC baseline relies on default binding behaviour. Explicit bindings are required for multi-workspace isolation.',
    impact:
      'In a multi-workspace deployment, catalogs may be accessible to unintended workspaces; isolation relies on grant controls rather than binding restrictions.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.53',
  },
  // ── Provider Currency ────────────────────────────────────────────────────
  {
    id: 'PGP-014',
    category: 'Provider Currency',
    severity: 'High',
    resource: 'hashicorp/databricks provider version',
    title: 'Provider still pinned at ~> 1.91; staged upgrade to latest required',
    description:
      'All three stacks (Part A, Part B, Part C) pin the Databricks provider at ~> 1.91. The latest published version includes fixes and new resources (Apps, NCC, ESM, Budget Policy, Catalog Binding). Upgrade requires staged compatibility testing: Part C first, then Part A, then Part B.',
    impact:
      '12 newer provider resources (PGP-001 through PGP-013) cannot be safely adopted until the provider pin is advanced. Security patches and deprecated-resource warnings also accumulate on old pins.',
    wave: 'Wave 3 (P2)',
    providerVersionIntroduced: 'latest',
  },
]

export const CURRENT_PROVIDER_VERSION = '~> 1.91'
export const LATEST_PROVIDER_VERSION = 'latest (1.65.x as of Mar 2026)'
