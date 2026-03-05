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
    score: '87%',
    highlights: [
      '✅ Cost tagging module with cost center, department, and business unit mapping for chargeback',
      '✅ Billable usage log delivery to S3 for detailed by-workspace cost tracking',
      '✅ Cluster-level budget allocation ($500 dev, $2000 standard, $5000 prod)',
      '✅ Reserved vs spot strategy framework with spot eligibility tags in cluster policies',
      '✅ S3 lifecycle policies for log archival (90-day Glacier transition, 365-day expiry)',
      '✅ Team-based cost tracking jobs and tag validation framework',
      '✅ CloudWatch budget threshold alarms with monthly budget enforcement ($5k default)',
      '✅ CloudWatch anomaly detection (ANOMALY_DETECTION_BAND 2σ) for daily cost monitoring',
      '✅ Weekly cost spike alerts (25% threshold) with SNS email notifications',
      '✅ Databricks monthly cost analysis job on 1st at 9am UTC',
      '✅ CloudWatch dashboard for real-time cost visualization',
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
    score: '82%',
    highlights: [
      '✅ Cost tags framework with cost center mapping',
      '✅ Billable usage logs for detailed by-workspace cost tracking',
      '✅ Cluster policy enforcement for resource limits',
      '✅ SNS-based cost alert notifications to ops/finance teams',
      '✅ CloudWatch budget threshold enforcement ($5,000/month configurable)',
      '✅ Daily cost anomaly detection with 2σ confidence interval',
      '✅ Weekly cost spike detection and alerts',
      '✅ Optional Lambda auto-remediation framework for cost overages',
      '📋 Gap: Spot policy rollout and cost chargeback model automation pending',
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
      'monitoring_observability',
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
      'git_integration',
      'cost_alerting',
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
  { dimension: 'Cost Management', level: 'L3.4', detail: 'Cost tagging framework, billable usage logs, cluster policy budgets, team cost tracking, CloudWatch dashboards, budget alarms, anomaly detection, weekly spike alerts, SNS notifications' },
]

export type Milestone = {
  number: number
  title: string
  status: string
  description: string
  features: string[]
}

export const scoreCards = {
  awsWaf: '86%',
  databricksWaf: '84%',
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
    title: '✅ RESOLVED: Cost governance is now enforced with real-time alerts',
    currentState: 'SNS email alerts for budget thresholds, anomaly detection (2σ), and weekly spikes. CloudWatch dashboard for real-time monitoring. Databricks monthly cost analysis job.',
    impact: 'Spend outliers detected in real-time (5-min check interval). Operations and finance teams notified immediately. Monthly trend analysis available for optimization.',
    remediation: 'Monitor CloudWatch alarms and SNS notifications. Configure cost_alert_email_addresses in workspace_configuration for ops/finance recipients.',
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
    title: 'Git URL restrictions require account-console setup (API limitation)',
    currentState: 'Git versioning and credentials are IaC-managed via git_integration module. URL restrictions (clone whitelisting) use Databricks Account Console due to API limitations.',
    impact: 'Git governance enforcement spans both Terraform IaC and manual account-console settings. Requires documented handoff between infrastructure and identity teams.',
    remediation: 'Reference documented git_integration module for CI/CD Git credentials; document mandatory account-console controls (URL restrictions, IP access lists) in operations runbook.',
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
    status: '✅ 95% Complete',
    description: 'Comprehensive cost monitoring, alerting, and optimization framework.',
    features: [
      '✅ Cost tagging module with cost center, department, business unit mapping',
      '✅ Billable usage log delivery to S3 for detailed cost analysis',
      '✅ Cluster policy budget tiers: $500 (dev), $2000 (standard), $5000 (prod)',
      '✅ Team-based cost tracking jobs and tag validation framework',
      '✅ Reserved vs spot strategy framework with spot eligibility tags',
      '✅ CloudWatch budget threshold alarm ($5,000/month default, configurable)',
      '✅ Daily cost anomaly detection (ANOMALY_DETECTION_BAND 2σ = 95% confidence)',
      '✅ Weekly cost spike alerts (25% increase threshold, configurable)',
      '✅ SNS topic with email subscriptions for ops/finance notifications',
      '✅ CloudWatch dashboard for real-time cost visualization',
      '✅ Databricks monthly cost analysis job (1st of month, 9am UTC)',
      '✅ Optional Lambda-based auto-remediation framework (disabled by default)',
      '☑️ Spot instance policy rollout in progress',
      '📋 Cost chargeback model automation and budget enforcement at team-level pending',
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
  {
    name: 'Infrastructure Monitoring Module',
    layer: 'Layer 1: Provisioning',
    status: '✅ Production',
    purpose: 'CloudWatch dashboards and alarms for infrastructure monitoring',
    keyFeatures: [
      'Infrastructure dashboard (VPC Flow Logs, NAT Gateway, S3, KMS metrics)',
      'Network dashboard (connection monitoring, traffic patterns)',
      'Cost dashboard (data transfer, storage, operation costs)',
      'CloudWatch alarms for NAT Gateway bandwidth, S3 errors, connections',
      'SNS email notifications for critical infrastructure events',
      'Multi-dashboard view with real-time metric visualization',
    ],
    dependencies: ['AWS CloudWatch', 'AWS SNS', 'Networking Module', 'Storage Module'],
    security: ['CloudWatch log retention policies', 'SNS topic policies', 'Metric data encryption'],
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
  {
    name: 'Workspace Monitoring',
    layer: 'Layer 3: Configuration',
    status: '📋 Planned (Foundation Setup)',
    purpose: 'Workspace-level monitoring with system tables and audit analytics',
    keyFeatures: [
      'Databricks system tables integration for SQL-based audit queries',
      'Cluster event monitoring and performance metrics',
      'Workspace-level activity dashboards (module scaffolding in place)',
      'Audit log analysis for compliance reporting',
      'User activity tracking and access auditing (ready for implementation)',
      'Job execution monitoring and error detection (pending)',
    ],
    dependencies: ['Workspace Creation Module', 'Unity Catalog Metastore'],
    security: ['Audit trail visibility', 'Compliance reporting', 'Activity tracking preparation'],
  },
  {
    name: 'Git Integration',
    layer: 'Layer 3: Configuration',
    status: '⚙️ Partial Automation',
    purpose: 'Workspace Git integration with URL restrictions and credential management',
    keyFeatures: [
      'Git versioning for Databricks Repos notebooks',
      'Allowed Git provider URL restrictions (GitHub, GitLab, Bitbucket, Azure DevOps)',
      'Clone restrictions to prevent unauthorized repositories',
      'Service account Git credentials management',
      'Repository permissions configuration',
      'Portfolio of environment-specific Git policies',
    ],
    dependencies: ['Workspace Creation Module'],
    security: ['URL-based access restrictions', 'Service account credential isolation', 'Git PAT support'],
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
    status: '✅ 95% Complete',
    purpose: 'Comprehensive infrastructure, cost, and workspace monitoring',
    keyFeatures: [
      'VPC Flow Logs to CloudWatch with lifecycle policies',
      'Audit log delivery to S3 with compliance retention',
      'Billable usage tracking for cost analysis',
      'CloudWatch dashboards for infrastructure, network, and cost metrics',
      'SNS-based alarm notifications for infrastructure anomalies',
      'Databricks monthly cost analysis job with trend reporting',
      'System tables integration ready for SQL-based auditing',
    ],
    dependencies: ['CloudWatch', 'S3', 'Databricks Workspace', 'SNS'],
    security: ['Log retention policies (90-365 day)', 'Audit log encryption', 'Compliance readiness', 'SNS topic policies'],
  },
  {
    name: 'Cost Alerting Module',
    layer: 'Layer 4: Operations',
    status: '✅ Production',
    purpose: 'Real-time cost monitoring with budget enforcement and anomaly detection',
    keyFeatures: [
      'SNS topic with configurable email recipients for ops/finance',
      'CloudWatch budget threshold alarm ($5,000/month default)',
      'CloudWatch anomaly detection (ANOMALY_DETECTION_BAND 2σ standard deviations)',
      'Weekly cost spike alerts (25% increase threshold)',
      'CloudWatch dashboard for real-time cost visualization',
      'Databricks monthly cost analysis job (runs 1st at 9am UTC)',
      'Optional Lambda-based auto-remediation framework',
      '13 configuration parameters (all with safe defaults)',
      'Integration with workspace_configuration module',
    ],
    dependencies: ['CloudWatch', 'SNS', 'Databricks Workspace', 'AWS Lambda (optional)'],
    security: ['SNS topic policies', 'IAM role for Databricks job', 'Optional Lambda remediation role', 'Email subscription validation'],
  },
]

// ============================================================================
// Architecture Assessment & Recommendations
// ============================================================================

export const architectureAssessment = {
  overallMaturity: 'L3.5 (Managed & Optimized)',
  implementationStatus: 93,
  lastUpdated: '2026-03-05',
  nextMilestonesLabel: [
    '📊 Data Quality Framework with SLOs (Mar 12-15)',
    '🔐 Secrets Rotation Automation (Mar 15-17)',
    '✅ SSO/SCIM Validation Gates (Mar 18-19)',
    '🚀 Production Launch (Mar 19)',
  ],
  strengths: [
    'Enterprise-grade security with minimal attack surface (94% AWS, 90% Databricks)',
    'Complete 4-layer modular architecture for scalability and maintainability',
    'Production-ready CI/CD with OIDC and approval gates across all workflows',
    'Comprehensive audit, cost, and infrastructure logging for compliance',
    'Real-time cost monitoring with budget enforcement and anomaly detection',
    'Disaster recovery runbooks with measurable RTO/RPO targets (1h/4h/8h)',
    'Multiple deployment patterns supporting diverse infrastructure requirements',
  ],
  gaps: [
    '✅ RESOLVED: Budget enforcement and anomaly alerts now automated via CloudWatch',
    'SSO/SCIM validation and account-level onboarding completion gates still manual',
    'Secrets rotation orchestration and long-lived credential management pending',
    'Data quality SLOs and lineage observability pending for production BI pipelines',
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