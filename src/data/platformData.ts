export type Pillar = {
  name: string
  score: string
  highlights: string[]
}

export type KeyGap = {
  id: string
  framework: 'AWS' | 'Databricks' | 'Shared'
  pillar: string
  severity: 'High' | 'Medium' | 'Low'
  title: string
  currentState: string
  impact: string
  remediation: string
}

export const awsFramework: Pillar[] = [
  {
    name: 'Operational Excellence',
    score: '88%',
    highlights: [
      'VPC Flow Logs to CloudWatch with lifecycle policies and retention',
      'Databricks audit and billable usage logs to S3 with versioning',
      'GitHub Actions Terraform CI/CD pipelines with OIDC and optional Git PAT support',
      'CloudWatch dashboards (infrastructure, network, storage) and SNS-based alarms',
      'Service principal lifecycles managed in AWS Secrets Manager with rotation framework',
      'Disaster recovery runbook with RTO/RPO targets (1h/4h/8h by tier) and quarterly drills',
      'Incident tracking and post-mortem procedures for continuous improvement',
    ],
  },
  {
    name: 'Security',
    score: '94%',
    highlights: [
      'SSO/SCIM account-level federation with external ID validation',
      'KMS encryption for root/metastore/audit buckets with DES support',
      'PrivateLink for REST API + SCC relay with no internet exposure',
      'Cross-account IAM with least-privilege service roles',
      'Audit log delivery with 90-day retention and versioning',
      'Network isolation via security groups and VPC endpoints',
    ],
  },
  {
    name: 'Reliability',
    score: '86%',
    highlights: [
      'Multi-AZ VPC networking and NAT gateways for HA with connection error alarms',
      'S3 versioning on all data buckets (root, metastore, audit logs) for point-in-time recovery',
      'Pipeline-driven immutable infrastructure changes with destructive-change detection',
      'CloudWatch log retention policies for compliance (VPC logs, NAT gateway, S3)',
      'DynamoDB state locking for concurrent terraform operations',
      'Documented disaster recovery runbook with pre-flight checks and scenario-specific procedures',
      'Terraform auto-recovery for workspace deletion (redeploy via orchestrator)',
      'S3 lifecycle policies with 90-day Glacier transition and 365-day expiry',
    ],
  },
  {
    name: 'Performance Efficiency',
    score: '79%',
    highlights: [
      'VPC endpoints for S3, STS, Kinesis to reduce latency',
      'Cluster policy controls for scaling guardrails and resource optimization',
      'Workspace monitoring module with system table readiness',
      'Multi-AZ networking for cross-zone communication',
      '⚠️ Gap: Spot instance optimization and burst capacity management',
    ],
  },
  {
    name: 'Cost Optimization',
    score: '78%',
    highlights: [
      'Cost tagging module with cost center, department, and business unit mapping for chargeback',
      'Billable usage log delivery to S3 for detailed by-workspace cost tracking',
      'Cluster-level budget allocation ($500 dev, $2000 standard, $5000 prod)',
      'Reserved vs spot strategy framework with spot eligibility tags in cluster policies',
      'S3 lifecycle policies for log archival (90-day Glacier transition, 365-day expiry)',
      'Team-based cost tracking jobs and tag validation framework',
      'CloudWatch dashboards for cost visibility (S3 storage, NAT bandwidth)',
      '⚠️ Gap: Automated anomaly detection and budget threshold enforcement pending',
    ],
  },
]

export const databricksFramework: Pillar[] = [
  {
    name: 'Reliability & Performance',
    score: '84%',
    highlights: [
      'Cluster policy controls with 5 policy templates (dev/prod/power/read/cost) including budget enforcement',
      'Pipeline-managed workspace configuration for consistency and immutability',
      'Monitoring integration with CloudWatch alarms for infrastructure health',
      'Unity Catalog metastore for centralized governance with cost tagging',
      'Spot instance optimization framework and budget tier controls ($500-$5000)',
      'Auto-termination policies (10-240 minute range) for cost control',
      '⚠️ Gap: Advanced cluster auto-scaling and predictive scaling optimization',
    ],
  },
  {
    name: 'Security & Compliance',
    score: '90%',
    highlights: [
      'SSO/SCIM with automatic account-level identity federation',
      'PrivateLink for secure API and SCC relay endpoints',
      'Audit log delivery with cryptographic verification',
      'Service principal isolation per environment with Secrets Manager',
      'KMS encryption for all workspace storage and log buckets',
    ],
  },
  {
    name: 'Governance & Monitoring',
    score: '84%',
    highlights: [
      'Unity Catalog metastore with schema-level access controls and cost tagging',
      'System tables readiness for SQL-based analytics and audit compliance',
      'CloudWatch dashboards (infrastructure, network, cost) with real-time metric visualization',
      'S3 audit logging with 90-day Glacier + 365-day expiry lifecycle for compliance',
      'SNS-based alarm notifications for infrastructure anomalies',
      'VPC Flow Logs integration with CloudWatch for network visibility',
      'Audit log ingestion backed by Databricks-certified pipeline',
      '⚠️ Gap: End-to-end lineage and data quality SLA/SLO observability is still partial',
    ],
  },
  {
    name: 'Data Management',
    score: '84%',
    highlights: [
      'Metastore storage bucket with KMS encryption and versioning',
      'Separate buckets for root storage, metastore, and audit logs',
      'Automatic credential management via IAM roles (no static keys)',
      'S3 bucket policies with least-privilege data access',
      'Workspace-to-storage isolation via cross-account IAM',
    ],
  },
  {
    name: 'Cost Optimization',
    score: '69%',
    highlights: [
      'Cost tags framework with cost center mapping',
      'Billable usage logs for detailed by-workspace cost tracking',
      'Cluster policy enforcement for resource limits',
      '⚠️ Gap: Automated cost alerts, spot policy rollout, and budget guardrails pending',
    ],
  },
  {
    name: 'Operational Excellence',
    score: '81%',
    highlights: [
      'IaC-first design with modular 4-layer architecture',
      'Automated plan/apply/destroy with destructive change detection',
      'Repository modularization by capability and environment',
      'Reusable modules for all workspace deployment patterns',
      'Documentation covering prerequisites, architecture, and decision frameworks',
    ],
  },
]

export const moduleGroups = [
  {
    name: 'aws_databricks_provisioning/modules',
    modules: [
      'networking',
      'storage',
      'dbx_workspace_creation',
      'dbx_metastore',
      'dbx_privatelink',
      'audit_log_delivery',
    ],
  },
  {
    name: 'databricks-workspace-configuration-aws/modules',
    modules: [
      'sso_configuration',
      'scim_connector',
      'dbx_users_groups',
      'cluster_policies',
      'workspace_monitoring',
      'cost_tagging',
    ],
  },
  {
    name: 'Backend & Bootstrap',
    modules: [
      'aws-databricks-backend-provisioning',
      'aws-databricks-backend-bootstrap-cloudformation',
      'databricks-service-principal-bootstrap',
      'pipeline_workflows',
    ],
  },
]

export const maturityRows = [
  { dimension: 'Infrastructure', level: 'L4.1', detail: 'Multi-AZ VPC, encryption, PrivateLink, VPC flow logs, CloudWatch monitoring with alarms' },
  { dimension: 'Platform', level: 'L3.7', detail: 'Workspace + Unity Catalog + config modules, complete 4-layer architecture, DR procedures' },
  { dimension: 'Security', level: 'L4.1', detail: 'SSO/SCIM, KMS + DES, audit logs, cross-account IAM, Git PAT support, comprehensive permission hardening' },
  { dimension: 'Data Governance', level: 'L3.4', detail: 'Metastore foundation, governance controls, audit log delivery, system tables ready, cost tagging' },
  { dimension: 'Operational Excellence', level: 'L3.7', detail: 'Full CI/CD automation, DR runbooks with RTO/RPO, observability baseline, logging and monitoring with alarms' },
  { dimension: 'Cost Management', level: 'L3.0', detail: 'Cost tagging framework, billable usage logs, cluster policy budgets, team cost tracking, CloudWatch dashboards' },
]

export type Milestone = {
  number: number
  title: string
  status: string
  description: string
  features: string[]
}

export const scoreCards = {
  awsWaf: '85%',
  databricksWaf: '83%',
  platformMaturity: 'L3.5',
  securityPillar: '91%',
}

export const keyGaps: KeyGap[] = [
  {
    id: 'gap-sso-scim-manual',
    framework: 'Databricks',
    pillar: 'Security & Compliance',
    severity: 'High',
    title: 'Account-level SSO/SCIM onboarding still manual',
    currentState: 'Terraform prepares workspace objects but account-console IdP wiring remains manual.',
    impact: 'Provisioning lead time and onboarding consistency depend on operator execution.',
    remediation: 'Automate post-apply validation checks and enforce completion gates in release workflows.',
  },
  {
    id: 'gap-token-rotation',
    framework: 'Shared',
    pillar: 'Security',
    severity: 'High',
    title: 'SCIM/bootstrap secret rotation is not fully automated',
    currentState: 'Secrets Manager storage exists, but periodic rotation orchestration is not end-to-end.',
    impact: 'Credential age can drift beyond policy and increase access risk.',
    remediation: 'Implement scheduled rotation Lambda/workflow with expiry alarms and runbook auto-ticketing.',
  },
  {
    id: 'gap-audit-log-drift',
    framework: 'AWS',
    pillar: 'Operational Excellence',
    severity: 'Low',
    title: '✅ RESOLVED: Audit log delivery drift guards tightened',
    currentState: 'Removed broad ignore_changes from storage module (KMS policy and S3 lifecycle rules).',
    impact: 'Terraform plan now detects real configuration changes; drift detection fidelity improved.',
    remediation: 'Monitor for permission errors during apply; IAM policies will surface real issues.',
  },
  {
    id: 'gap-dr-rto-rpo',
    framework: 'AWS',
    pillar: 'Reliability',
    severity: 'Low',
    title: '✅ RESOLVED: DR runbook with RTO/RPO and quarterly drills',
    currentState: 'Comprehensive disaster recovery runbook published with prod=1h/staging=4h/dev=8h RTO. Quarterly drill schedule established.',
    impact: 'Recovery timelines are now measurable and regularly validated through simulated exercises.',
    remediation: 'Schedule Q2 2026 quarterly DR drill for staging environment. Track incidents in INCIDENT_LOG.md.',
  },
  {
    id: 'gap-cost-enforcement',
    framework: 'Shared',
    pillar: 'Cost Optimization',
    severity: 'Medium',
    title: 'Cost governance is descriptive, not enforced',
    currentState: 'Tagging and billable logs are in place but budget alarms and rightsizing automation are limited.',
    impact: 'Spend outliers are detected late and optimization remains manual.',
    remediation: 'Add budget thresholds, anomaly triggers, and policy-backed cluster sizing controls.',
  },
  {
    id: 'gap-observability-depth',
    framework: 'Databricks',
    pillar: 'Governance & Monitoring',
    severity: 'Medium',
    title: 'Observability depth is incomplete for data quality and lineage',
    currentState: 'Infrastructure telemetry is strong; quality/lineage and operational SLO views are partial.',
    impact: 'Issue detection shifts from proactive to reactive for data/product teams.',
    remediation: 'Expand dashboards to include lineage, SLA/SLO, and quality KPIs from system tables.',
  },
  {
    id: 'gap-user-deprovisioning',
    framework: 'Databricks',
    pillar: 'Security & Compliance',
    severity: 'Medium',
    title: 'User deprovisioning lifecycle is not fully automated',
    currentState: 'SCIM integration path exists but complete leaver workflow enforcement is not guaranteed.',
    impact: 'Dormant identities can persist longer than policy allows.',
    remediation: 'Implement periodic entitlement reconciliation and automatic deactivation for stale principals.',
  },
  {
    id: 'gap-git-restrictions',
    framework: 'Databricks',
    pillar: 'Operational Excellence',
    severity: 'Medium',
    title: 'Git URL restriction settings require console governance',
    currentState: 'Workspace conf API does not support repo restriction keys used by policy intent.',
    impact: 'Git source governance depends on manual admin controls outside IaC.',
    remediation: 'Document mandatory account-console controls and add compliance checks in pipeline validation.',
  },
]

export const milestones: Milestone[] = [
  {
    number: 1,
    title: 'Backend Bootstrap',
    status: '✅ Complete',
    description: 'Terraform state, CI/CD auth, and secret storage foundation.',
    features: ['S3 backend + versioning', 'DynamoDB state lock', 'OIDC providers (GitHub/Azure/GitLab)'],
  },
  {
    number: 2,
    title: 'Unified Networking Module',
    status: '✅ Complete',
    description: 'Flexible networking for standalone/firewall/hub-spoke/spoke-only.',
    features: ['Configurable VPC and subnets', 'NAT + IGW', 'VPC endpoints and security groups'],
  },
  {
    number: 3,
    title: 'Storage Provisioning',
    status: '✅ Complete',
    description: 'Reusable S3 storage for root and metastore with controls.',
    features: ['Bucket creation/reference', 'Versioning and encryption', 'Policy-based access controls'],
  },
  {
    number: 4,
    title: 'Workspace Creation',
    status: '✅ Complete',
    description: 'E2 workspace provisioning with VPC and IAM integration.',
    features: ['Workspace deployment', 'Network attachment', 'Cross-account IAM role setup', 'MWS credentials validation'],
  },
  {
    number: 5,
    title: 'Unity Catalog Metastore',
    status: '✅ Complete',
    description: 'Centralized governance with metastore and workspace attachment.',
    features: ['Regional metastore', 'Metastore storage bucket', 'Automatic credential management', 'Audit log delivery'],
  },
  {
    number: 6,
    title: 'Workspace Configuration',
    status: '✅ Complete',
    description: 'Identity/groups controls and workspace-level governance.',
    features: ['Users/groups management', 'SSO+SCIM integration complete', 'Cluster policies (5 templates)', 'Cost tagging framework'],
  },
  {
    number: 7,
    title: 'Service Principal Bootstrap',
    status: '✅ Complete',
    description: 'Automated SP lifecycle for secure CI/CD and app authentication.',
    features: ['Service principal provisioning', 'Token management', 'Secrets Manager integration', 'Environment isolation'],
  },
  {
    number: 8,
    title: 'CI/CD Automation',
    status: '✅ Complete',
    description: 'Reusable workflows with safety checks and approvals.',
    features: ['Plan/apply/destroy workflows', 'Destructive-change detection', 'PR comments and OIDC auth', 'Multi-environment support'],
  },
  {
    number: 9,
    title: 'Monitoring & Observability',
    status: '✅ 95% Complete',
    description: 'Operational monitoring with logs, dashboards, and alerting.',
    features: [
      '✅ VPC Flow Logs to CloudWatch with lifecycle policies',
      '✅ Audit logs and billable usage logs to S3 with versioning',
      '✅ CloudWatch log groups and retention (30-90 day policies)',
      '✅ CloudWatch dashboards for infrastructure, network, and cost visibility',
      '✅ SNS-based alarms for NAT gateway, S3, and KMS events',
      '📋 Real-time data quality and lineage observability pending',
    ],
  },
  {
    number: 10,
    title: 'Security Hardening',
    status: '✅ 95% Complete',
    description: 'Comprehensive IAM and KMS permission hardening with credential validation.',
    features: [
      '✅ SSO/SCIM with external ID validation',
      '✅ KMS encryption with dedicated read/write/account operations',
      '✅ PrivateLink + network isolation',
      '✅ Comprehensive IAM policies (deploy/destroy/plan)',
      '✅ Cross-account role KMS permissions',
      '✅ Audit log delivery role with proper assume policies',
      '✅ VPC Flow Logs lifecycle rules for pre-existing resources',
      '📋 Advanced cluster policy enforcement (in progress)',
    ],
  },
  {
    number: 11,
    title: 'Cost Optimization',
    status: '✅ 75% Complete',
    description: 'Cost policies and optimization workflow framework.',
    features: [
      '✅ Cost tagging module with cost center, department, business unit mapping',
      '✅ Billable usage log delivery to S3 for detailed cost analysis',
      '✅ Cluster policy budget tiers: $500 (dev), $2000 (standard), $5000 (prod)',
      '✅ Team-based cost tracking jobs and tag validation framework',
      '✅ Reserved vs spot strategy framework with spot eligibility tags',
      '☑️ Spot instance policy rollout in progress',
      '📋 Automated cost anomaly alerts and rightsize dashboard pending',
    ],
  },
  {
    number: 12,
    title: 'Operational Excellence & DR',
    status: '✅ 80% Complete',
    description: 'Backup/DR, runbooks, and operational maturity for resilience.',
    features: [
      '✅ Disaster recovery runbook with RTO/RPO targets (1h/4h/8h by tier)',
      '✅ Pre-flight checks and scenario-specific recovery procedures',
      '✅ Incident log template and post-mortem process documented',
      '✅ S3 versioning on all buckets for point-in-time recovery',
      '✅ Quarterly DR drill schedule for staging environment',
      '✅ Git PAT support across all CI/CD pipelines with env-based gating',
      '✅ Lifecycle drift guard removal for improved drift detection',
      '🔄 Bootstrap user management (manage_users=true for initial provisioning)',
      '📋 SLA/SLO tracking and automated runbook triggering pending',
    ],
  },
]

// ============================================================================
// Detailed Component Architecture
// ============================================================================

export type ComponentDetail = {
  name: string
  layer: string
  status: string
  purpose: string
  keyFeatures: string[]
  dependencies: string[]
  security: string[]
}

export const componentDetails: ComponentDetail[] = [
  // Layer 1: Infrastructure Provisioning
  {
    name: 'Networking Module',
    layer: 'Layer 1: Provisioning',
    status: '✅ Production',
    purpose: 'Flexible VPC networking for standalone/firewall/hub-spoke/spoke-only patterns',
    keyFeatures: [
      'Multi-AZ VPC with configurable CIDR blocks',
      'NAT gateways for secure outbound traffic',
      'VPC endpoints for S3, STS, Kinesis',
      'Security groups with least-privilege rules',
      'Flow logs to CloudWatch for monitoring',
    ],
    dependencies: ['AWS EC2 VPC'],
    security: ['Network isolation', 'Flow log monitoring', 'Security group NACL rules'],
  },
  {
    name: 'Storage Module',
    layer: 'Layer 1: Provisioning',
    status: '✅ Production',
    purpose: 'Reusable S3 bucket provisioning with encryption and versioning',
    keyFeatures: [
      'Create or reference existing S3 buckets',
      'KMS encryption with configurable keys',
      'Versioning for data recovery',
      'Public access blocking',
      'Lifecycle policies for cost optimization',
    ],
    dependencies: ['AWS S3', 'AWS KMS'],
    security: ['KMS encryption', 'Versioning', 'Block public access', 'Bucket policies'],
  },
  {
    name: 'Workspace Creation Module',
    layer: 'Layer 1: Provisioning',
    status: '✅ Production',
    purpose: 'Databricks workspace provisioning with cross-account IAM and networking',
    keyFeatures: [
      'E2 workspace creation',
      'Cross-account IAM role with dynamic policies',
      'VPC attachment and network configuration',
      'MWS credentials validation',
      'KMS permissions for workspace encryption',
    ],
    dependencies: ['Networking Module', 'Storage Module', 'AWS IAM'],
    security: ['Cross-account IAM', 'External ID validation', 'KMS permissions', 'Network isolation'],
  },
  {
    name: 'Metastore Module',
    layer: 'Layer 1: Provisioning',
    status: '✅ Production',
    purpose: 'Unity Catalog metastore setup for comprehensive data governance',
    keyFeatures: [
      'Regional metastore deployment',
      'Metastore storage bucket configuration',
      'Automatic IAM policy generation',
      'Workspace metastore attachment',
      'Audit log bucket integration',
    ],
    dependencies: ['Storage Module', 'Workspace Creation Module'],
    security: ['KMS encryption', 'Least-privilege bucket policies', 'Audit logging'],
  },
  {
    name: 'PrivateLink Module',
    layer: 'Layer 1: Provisioning',
    status: '✅ Optional',
    purpose: 'Secure private connectivity for REST API and SCC relay',
    keyFeatures: [
      'REST API endpoint configuration',
      'SCC relay endpoint setup',
      'VPC endpoint service configuration',
      'Private DNS resolution',
    ],
    dependencies: ['Networking Module', 'Workspace Creation Module'],
    security: ['Private connectivity', 'No internet exposure', 'VPC endpoint policies'],
  },
  {
    name: 'Audit Log Delivery Module',
    layer: 'Layer 1: Provisioning',
    status: '⚠️ Operational (Import/Drift Guard)',
    purpose: 'Databricks audit log delivery with cross-account access',
    keyFeatures: [
      'Cross-account IAM role for log delivery',
      'KMS encryption for audit logs',
      'S3 bucket for log storage',
      'Log retention policies (90-day default)',
      'Duplicate config handling currently relies on lifecycle ignore_changes',
    ],
    dependencies: ['Storage Module', 'AWS IAM'],
    security: ['Cross-account IAM', 'KMS encryption', 'External ID validation', 'S3 versioning'],
  },

  // Layer 2: Backend & Bootstrap
  {
    name: 'Backend Infrastructure',
    layer: 'Layer 2: Bootstrap',
    status: '✅ Production',
    purpose: 'Terraform state management and CI/CD foundation',
    keyFeatures: [
      'S3 terraform state bucket with versioning',
      'DynamoDB state locking',
      'OIDC provider configuration (GitHub, Azure DevOps, GitLab)',
      'Encryption at rest for state',
      'MFA delete protection',
    ],
    dependencies: ['AWS S3', 'AWS DynamoDB', 'AWS IAM'],
    security: ['State encryption', 'Versioning', 'OIDC authentication', 'No stored credentials'],
  },
  {
    name: 'Service Principal Bootstrap',
    layer: 'Layer 2: Bootstrap',
    status: '⚙️ Mostly Automated',
    purpose: 'Automated lifecycle for Databricks service principals',
    keyFeatures: [
      'Service principal provisioning per environment',
      'Token management in AWS Secrets Manager',
      'Environment-specific credentials isolation',
      'CI/CD authentication without stored keys',
      'Bootstrap credential seeding can still require manual initialization',
    ],
    dependencies: ['AWS Secrets Manager', 'AWS IAM'],
    security: ['No plaintext credentials', 'Secrets Manager integration', 'Environment isolation'],
  },

  // Layer 3: Workspace Configuration
  {
    name: 'Users & Groups Management',
    layer: 'Layer 3: Configuration',
    status: '⚠️ Partial Automation',
    purpose: 'Identity and access management at workspace level',
    keyFeatures: [
      'Group provisioning with SSO/SCIM-aware user lookup',
      'SSO/SCIM integration scaffolding',
      'External ID validation',
      'Permission assignment',
      'Manual account-console SAML/SCIM setup still required',
    ],
    dependencies: ['Workspace Creation Module', 'Identity Provider'],
    security: ['SSO/SCIM', 'External ID', 'Least-privilege groups', 'Account-level SCIM'],
  },
  {
    name: 'Cluster Policies',
    layer: 'Layer 3: Configuration',
    status: '✅ Production',
    purpose: 'Governance and cost controls for Databricks clusters',
    keyFeatures: [
      '5 policy templates: dev, prod, power user, read-only, cost control',
      'Node type restrictions',
      'Auto-scaling guardrails',
      'Instance pool enforcement',
      'Spot instance policies',
    ],
    dependencies: ['Workspace Creation Module'],
    security: ['Resource limits', 'Cost controls', 'Instance type restrictions'],
  },
  {
    name: 'Cost Tagging Framework',
    layer: 'Layer 3: Configuration',
    status: '⚙️ Foundation Complete',
    purpose: 'Cost allocation and chargeback modeling',
    keyFeatures: [
      'Cost center mapping',
      'Workspace owner tagging',
      'Environment tagging',
      'Default tag automation',
      'Chargeback integration ready (enforcement workflows pending)',
    ],
    dependencies: ['Workspace Creation Module'],
    security: ['Cost governance', 'Financial audit trail'],
  },

  // Layer 4: Platform Operations
  {
    name: 'CI/CD Pipelines',
    layer: 'Layer 4: Operations',
    status: '✅ Production',
    purpose: 'Infrastructure as Code deployment automation',
    keyFeatures: [
      'GitHub Actions workflows (plan/apply/destroy)',
      'Destructive change detection',
      'PR comments with plan output',
      'OIDC authentication (no stored credentials)',
      'Manual approval gates',
      'Multi-environment support',
    ],
    dependencies: ['GitHub', 'Terraform', 'AWS'],
    security: ['OIDC auth', 'PR-based approvals', 'Audit trail'],
  },
  {
    name: 'Monitoring & Observability',
    layer: 'Layer 4: Operations',
    status: '⚙️ 85% Complete',
    purpose: 'Comprehensive infrastructure and workspace monitoring',
    keyFeatures: [
      'VPC Flow Logs to CloudWatch',
      'Audit log delivery to S3',
      'Billable usage tracking',
      'CloudWatch dashboards (in progress)',
      'Alarm configuration (in progress)',
      'System tables integration ready',
    ],
    dependencies: ['CloudWatch', 'S3', 'Databricks Workspace'],
    security: ['Log retention policies', 'Audit log encryption', 'Compliance readiness'],
  },
]

// ============================================================================
// Architecture Assessment & Recommendations
// ============================================================================

export const architectureAssessment = {
  overallMaturity: 'L3.4 (Managed & Optimized)',
  implementationStatus: 89,
  lastUpdated: '2026-03-04',
  nextMilestonesLabel: [
    '📊 Cost governance automation (Q1 2026)',
    '🔄 Advanced cluster policies (Q1 2026)',
    '🛡️ Disaster recovery procedures (Q2 2026)',
    '📈 Advanced monitoring dashboards (Q2 2026)',
  ],
  strengths: [
    'Enterprise-grade security with minimal attack surface',
    'Complete 4-layer modular architecture for scalability',
    'Production-ready CI/CD with OIDC and approval gates',
    'Comprehensive audit and log delivery for compliance',
    'Multiple deployment patterns supporting diverse requirements',
  ],
  gaps: [
    'SSO/SCIM onboarding and token lifecycle still include manual controls',
    'Audit log delivery drift guard (ignore_changes) requires import-first remediation',
    'RTO/RPO disaster recovery playbooks and failover drills are not formalized',
    'Budget enforcement, anomaly alerts, and rightsizing automation remain partial',
    'User deprovisioning and entitlement reconciliation are not end-to-end automated',
  ],
  recommendations: [
    'Implement import-first standard for existing Databricks log delivery resources (Month 1)',
    'Automate SCIM/bootstrap credential rotation with expiry alerting (Month 1-2)',
    'Publish and test RTO/RPO runbooks with scheduled restore drills (Month 2)',
    'Add budget, anomaly, and spot-optimization enforcement in CI/CD guardrails (Month 2-3)',
    'Add periodic identity deprovisioning/entitlement reconciliation controls (Month 3)',
  ],
}