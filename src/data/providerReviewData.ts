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
  {
    id: 'REV-C-007',
    title: 'Security baseline module: Enhanced Security Monitoring + Compliance Security Profile',
    scope: 'Part B',
    status: 'Completed',
    awsPillars: ['Security', 'Operational Excellence'],
    databricksPillars: ['Security & Compliance', 'Governance & Monitoring'],
    contribution:
      'Codifies workspace-level ESM for SIEM integration and threat detection, and Compliance Security Profile (HIPAA + FEDRAMP_MODERATE) in IaC. Resolves PGP-001 and PGP-003.',
    evidence: [
      'terraform-modules-central/security/main.tf',
      'terraform-modules-central/security/variables.tf',
      'databricks-workspace-configuration-aws/workspace_configuration/main.tf',
    ],
  },
  {
    id: 'REV-C-008',
    title: 'Cluster policies governance framework with compute runtime standardization',
    scope: 'Part B',
    status: 'Completed',
    awsPillars: ['Performance Efficiency', 'Cost Optimization', 'Security'],
    databricksPillars: ['Reliability & Performance', 'Cost Optimization', 'Security & Compliance'],
    contribution:
      'Delivers 5-tier cluster policy framework (default/dev/prod/cost_control/security) with instance pool support, global init scripts, automatic cluster update, and per-policy budget caps. Resolves PGP-002, PGP-006, PGP-007.',
    evidence: [
      'terraform-modules-central/cluster_policies/main.tf',
      'terraform-modules-central/cluster_policies/variables.tf',
      'databricks-workspace-configuration-aws/workspace_configuration/main.tf',
    ],
  },
  {
    id: 'REV-C-009',
    title: 'Workspace Apps baseline module for serverless app governance',
    scope: 'Part B',
    status: 'Completed',
    awsPillars: ['Operational Excellence'],
    databricksPillars: ['Operational Excellence', 'Security & Compliance'],
    contribution:
      'Provisions Databricks Apps via IaC with permissions baseline, platform governance, and cost allocation tagging. Resolves PGP-004.',
    evidence: [
      'terraform-modules-central/workspace_apps/main.tf',
      'terraform-modules-central/workspace_apps/variables.tf',
    ],
  },
  {
    id: 'REV-C-010',
    title: 'Provider configuration DRY refactoring and module migration',
    scope: 'Cross-Part',
    status: 'Completed',
    awsPillars: ['Operational Excellence', 'Reliability'],
    databricksPillars: ['Operational Excellence'],
    contribution:
      'Consolidated provider blocks from child modules to terraform.tf across 22 modules. Migrated provisioning repos to terraform-modules-central with versioned references (v0.1.0). Reduces boilerplate and aligns all stacks to consistent provider configuration.',
    evidence: [
      'terraform-modules-central/*/providers.tf',
      'aws_databricks_provisioning/databricks_deployment/main.tf',
      'databricks-workspace-configuration-aws/workspace_configuration/main.tf',
    ],
  },
  {
    id: 'REV-C-011',
    title: 'Enhanced workspace monitoring with Lakeview dashboards and quality monitors',
    scope: 'Part B',
    status: 'Completed',
    awsPillars: ['Operational Excellence', 'Reliability'],
    databricksPillars: ['Governance & Monitoring', 'Reliability & Performance'],
    contribution:
      'Extends workspace monitoring with Lakeview dashboards (5 embedded datasets), Lakehouse quality monitors (time_series/snapshot/inference_log), failure rate alerts, and dynamic SQL warehouse management. Resolves PGP-011.',
    evidence: [
      'terraform-modules-central/workspace_monitoring/main.tf',
      'terraform-modules-central/workspace_monitoring/variables.tf',
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
    status: 'Completed',
    tasks: [
      '✅ Security baseline module: ESM + Compliance Security Profile (HIPAA/FEDRAMP) codified in IaC',
      '✅ Cluster policies governance: 5-tier framework with instance pools, global init scripts, auto cluster update',
      '✅ Workspace Apps baseline: serverless app deployment with permissions and governance',
      '✅ Enhanced workspace monitoring: Lakeview dashboards, quality monitors, failure rate alerts',
      '✅ Provider config DRY refactoring: consolidated provider blocks across 22 modules',
      'Add optional data engineering starter baseline (pipeline and repo/notebook assets where platform-owned)',
      'Implement Budget Policies (databricks_budget_policy) for principal-level spend controls',
      'Implement Catalog Workspace Bindings for multi-workspace isolation',
    ],
  },
  {
    wave: 'Wave 3 (P2)',
    status: 'Planned',
    tasks: [
      'Standardize SQL resource model choices and naming conventions',
      'Implement Network Connectivity Config (NCC) for serverless private egress',
      'Upgrade Databricks provider in controlled phases (Part C → Part A → Part B) with compatibility testing',
    ],
  },
]

export const awsPillarContributionSummary = [
  'Security: workspace hardening controls, ESM + Compliance Security Profile (HIPAA/FEDRAMP), OIDC-first provider auth, dedicated UC external data IAM role, and IAM policy hardening.',
  'Operational Excellence: reusable grant templates, centralized 22-module registry (v0.1.0), DRY provider config, workspace apps governance, and provider-auth profile consistency across all parts.',
  'Reliability: clearer UC storage role separation, quality monitors for data SLO tracking, auto cluster update for patch currency, and less manual drift in governance/data-access provisioning.',
  'Performance Efficiency: instance pools for reduced cold-start latency, global init scripts for consistent bootstrap, Lakeview dashboards for real-time analytics, and 5-tier cluster policy budget enforcement.',
  'Cost Optimization: cost-tier cluster policies ($300-$5000), spot optimization, budget enforcement, and anomaly detection with real-time CloudWatch monitoring.',
]

export const databricksPillarContributionSummary = [
  'Security & Compliance: ESM + Compliance Security Profile codified, UC privilege model, workspace secret governance, security-tier cluster policy with encryption/audit, and profile-aware auth execution.',
  'Governance & Monitoring: Lakeview dashboards with 5 embedded datasets, Lakehouse quality monitors (time_series/snapshot/inference_log), failure rate alerts, baseline UC data-access objects, and templated grants for repeatable domain onboarding.',
  'Data Management: external location/volume/storage credential IaC pattern anchored to foundation outputs, quality monitor data SLO tracking.',
  'Operational Excellence: deterministic Wave-based backlog execution, 22-module centralized model, DRY provider config, workspace apps baseline, and implemented Part A → Part B dependency flow.',
  'Reliability & Performance: instance pools for spot stability, auto cluster update for runtime currency, global init scripts for consistent bootstrap, and compute runtime standardization across 5 policy tiers.',
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
  status?: 'Open' | 'Resolved' | 'Partially Resolved'
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
    title: '✅ RESOLVED: Enhanced Security Monitoring now enabled via security module',
    description:
      'Workspace-level ESM is now codified in the dedicated security module (terraform-modules-central/security). Enables continuous SIEM integration, extra audit events, and malicious-activity detection.',
    impact:
      'ESM-level audit events and threat-detection signals are now active. Compliance evidence for security-sensitive workloads is strengthened.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.57',
    status: 'Resolved',
  },
  {
    id: 'PGP-002',
    category: 'Security & Compliance',
    severity: 'High',
    resource: 'databricks_automatic_cluster_update',
    title: '✅ RESOLVED: Automatic cluster runtime update configured in cluster_policies module',
    description:
      'Automatic cluster update workspace settings are now codified in the cluster_policies module (terraform-modules-central/cluster_policies). Enables workspace-wide automated patching of cluster runtimes.',
    impact:
      'Cluster runtimes are automatically kept current with the patched DBR line, reducing CVE exposure window.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.57',
    status: 'Resolved',
  },
  {
    id: 'PGP-003',
    category: 'Security & Compliance',
    severity: 'Medium',
    resource: 'databricks_compliance_security_profile',
    title: '✅ RESOLVED: Compliance Security Profile now IaC-managed via security module',
    description:
      'Compliance Security Profile (HIPAA + FEDRAMP_MODERATE) is now codified in the dedicated security module (terraform-modules-central/security). Profile settings are in Terraform state and drift-detectable.',
    impact:
      'Compliance profile-level controls are now within Terraform state. Regulated-workload onboarding is unblocked with codified standards.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.57',
    status: 'Resolved',
  },
  // ── Compute & Serverless ─────────────────────────────────────────────────
  {
    id: 'PGP-004',
    category: 'Compute & Serverless',
    severity: 'High',
    resource: 'databricks_app',
    title: '✅ RESOLVED: Databricks Apps baseline deployed via workspace_apps module',
    description:
      'Databricks Apps provisioning is now codified in the workspace_apps module (terraform-modules-central/workspace_apps). Includes permissions baseline, platform governance, and cost allocation tagging.',
    impact:
      'Teams can deploy Databricks Apps through IaC with platform guardrails, tagging, and access controls.',
    wave: 'Wave 3 (P2)',
    providerVersionIntroduced: '≥ 1.65',
    status: 'Resolved',
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
    status: 'Open',
  },
  {
    id: 'PGP-006',
    category: 'Compute & Serverless',
    severity: 'Medium',
    resource: 'databricks_instance_pool',
    title: '✅ RESOLVED: Instance pools now IaC-managed via cluster_policies module',
    description:
      'Instance pool support is now integrated into the cluster_policies module (terraform-modules-central/cluster_policies) with auto-termination and spot optimization. Pools reduce cluster start-up latency and improve spot-instance stability.',
    impact:
      'Cluster cold-start times reduced; spot-interruption recovery improved with pool buffer.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.0',
    status: 'Resolved',
  },
  {
    id: 'PGP-007',
    category: 'Compute & Serverless',
    severity: 'Medium',
    resource: 'databricks_global_init_script',
    title: '✅ RESOLVED: Global init scripts now IaC-managed via cluster_policies module',
    description:
      'Global init scripts integration is now codified in the cluster_policies module (terraform-modules-central/cluster_policies). Enables consistent bootstrap behavior (environment variables, agent installs, compliance tooling) across all clusters.',
    impact:
      'Runtime environment consistency enforced via centrally governed global init scripts baseline.',
    wave: 'Wave 2 (P1)',
    providerVersionIntroduced: '≥ 1.0',
    status: 'Resolved',
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
    status: 'Open',
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
    status: 'Open',
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
    status: 'Open',
  },
  // ── Governance & Monitoring ──────────────────────────────────────────────
  {
    id: 'PGP-011',
    category: 'Governance & Monitoring',
    severity: 'Medium',
    resource: 'databricks_quality_monitor',
    title: '✅ RESOLVED: Quality monitors now IaC-managed via workspace_monitoring module',
    description:
      'Lakehouse quality monitors (time_series, snapshot, inference_log) are now codified in the workspace_monitoring module (terraform-modules-central/workspace_monitoring). Includes failure rate alerts and standardized monitor templates.',
    impact:
      'Data quality SLOs are now tracked at the platform layer with standardized monitor templates, threshold policies, and email notification wiring.',
    wave: 'Wave 3 (P2)',
    providerVersionIntroduced: '≥ 1.50',
    status: 'Resolved',
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
    status: 'Open',
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
    status: 'Open',
  },
  // ── Provider Currency ────────────────────────────────────────────────────
  {
    id: 'PGP-014',
    category: 'Provider Currency',
    severity: 'Medium',
    resource: 'hashicorp/databricks provider version',
    title: 'Provider pinned at ~> 1.91; staged upgrade still recommended for remaining gaps',
    description:
      'All three stacks (Part A, Part B, Part C) pin the Databricks provider at ~> 1.91. 7 of 13 provider gaps have been resolved at the current pin (PGP-001/002/003/004/006/007/011). Remaining gaps (NCC, Budget Policy, Catalog Binding, Model Serving, Model Registry, Vector Search) may benefit from latest provider features. Upgrade requires staged compatibility testing: Part C first, then Part A, then Part B.',
    impact:
      '6 remaining provider gaps (PGP-005/008/009/010/012/013) remain open. Staged upgrade path recommended for Wave 3 to access latest fixes and resources.',
    wave: 'Wave 3 (P2)',
    providerVersionIntroduced: 'latest',
    status: 'Partially Resolved',
  },
]

export const CURRENT_PROVIDER_VERSION = '~> 1.91'
export const LATEST_PROVIDER_VERSION = 'latest (1.65.x as of Mar 2026)'
