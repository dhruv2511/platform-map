export interface ImplementationTask {
  id: string
  category: 'Security' | 'Operations' | 'Infrastructure' | 'Cost Optimization' | 'Compliance' | 'Data Platform Readiness'
  title: string
  description: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Completed' | 'In Progress' | 'Planned' | 'Blocked'
  completedDate?: string
  filesModified?: string[]
  impact: string
  relatedGap?: string
}

export const implementationTasks: ImplementationTask[] = [
  // Security Hardening
  {
    id: 'SEC-001',
    category: 'Security',
    title: 'Git PAT Removal from Terraform State',
    description: 'Remove GitHub Personal Access Token from Terraform state file to prevent credential exposure in production data platform pipeline',
    priority: 'Critical',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'git_integration/main.tf',
      'git_integration/variables.tf'
    ],
    impact: 'PAT never persisted in .tfstate; flows from GitHub Secrets → Actions → Terraform → Databricks only. Foundation for secure production data platform deployment.',
    relatedGap: 'Credential Management'
  },
  {
    id: 'SEC-002',
    category: 'Security',
    title: 'S3 Bucket Security Hardening',
    description: 'Implement versioning, bucket policy, lifecycle management, and KMS key policies for all S3 buckets to protect production data platform assets',
    priority: 'High',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'storage/main.tf',
      'storage/variables.tf'
    ],
    impact: 'Enterprise-grade bucket security: versioning enabled for data recovery, HTTPS enforced, Glacier lifecycle (90d) for cost optimization, KMS rotation enabled. Foundation for trustworthy data platform storage.',
    relatedGap: 'Data Protection'
  },
  {
    id: 'SEC-003',
    category: 'Security',
    title: 'Secret Scanning Pre-Commit Hook',
    description: 'Automated detection and blocking of hardcoded secrets before commits',
    priority: 'High',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'aws_dbx/.git-hooks/pre-commit',
      'scripts/install-pre-commit-hook.sh'
    ],
    impact: 'Prevents accidental secret commits (AWS keys, GitHub PATs, passwords); provides guidance for GitHub Secrets',
    relatedGap: 'Secret Management'
  },
  {
    id: 'SEC-004',
    category: 'Security',
    title: 'S3 Bucket Policy with Databricks Roles',
    description: 'Configure bucket policies with least-privilege Databricks role access including required actions',
    priority: 'High',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'storage/main.tf'
    ],
    impact: 'Added s3:PutWithBucketOwnerFullControl, s3:DeleteObject, s3:PutObjectWithTagging for workspace validation',
    relatedGap: 'Access Control'
  },
  {
    id: 'SEC-005',
    category: 'Security',
    title: 'Terraform Backend State Encryption',
    description: 'Verify S3 backend encryption and state security configuration',
    priority: 'Medium',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'databricks_deployment/backend.tf'
    ],
    impact: 'Confirmed encrypt=true sufficient for Terraform 1.6+; DynamoDB locking optional',
    relatedGap: 'State Management'
  },

  // Operational Improvements
  {
    id: 'OPS-001',
    category: 'Operations',
    title: 'Audit Log Delivery Deduplication',
    description: 'Prevent per-environment recreation of account-level audit log delivery resources',
    priority: 'Critical',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'databricks_deployment/main.tf',
      'databricks_deployment/variables.tf',
      'databricks_deployment/outputs.tf'
    ],
    impact: 'Single audit bucket shared across all workspaces; count-conditional prevents drift',
    relatedGap: 'Resource Lifecycle'
  },
  {
    id: 'OPS-002',
    category: 'Operations',
    title: 'Module Output List Access Fix',
    description: 'Fix outputs accessing count-conditional modules with proper list indexing',
    priority: 'High',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'databricks_deployment/outputs.tf'
    ],
    impact: 'Outputs handle module[0] list access with null checks when count=0',
    relatedGap: 'Configuration Management'
  },
  {
    id: 'OPS-003',
    category: 'Operations',
    title: 'CloudWatch Log Group Idempotency',
    description: 'Handle existing CloudWatch log groups without errors on re-run',
    priority: 'Medium',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'networking/vpc_flow_logs.tf'
    ],
    impact: 'Added lifecycle.ignore_changes to prevent ResourceAlreadyExistsException',
    relatedGap: 'Deployment Resilience'
  },

  // Infrastructure Fixes
  {
    id: 'INF-001',
    category: 'Infrastructure',
    title: 'Provider Type Mismatch Resolution',
    description: 'Resolve hashicorp/databricks vs databricks/databricks provider conflicts',
    priority: 'Critical',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'All terraform.lock.hcl files'
    ],
    impact: 'Cleared cached old provider; re-initialized with correct databricks/databricks provider',
    relatedGap: 'Provider Management'
  },
  {
    id: 'INF-002',
    category: 'Infrastructure',
    title: 'Duplicate Variable Removal',
    description: 'Remove duplicate region variable declaration in storage module',
    priority: 'Medium',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'storage/variables.tf'
    ],
    impact: 'Cleaned up duplicate region variable (line 13 vs line 49)',
    relatedGap: 'Code Quality'
  },
  {
    id: 'INF-003',
    category: 'Infrastructure',
    title: 'S3 Versioning Conflict Resolution',
    description: 'Remove conflicting versioning configuration from workspace creation module',
    priority: 'High',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'dbx_workspace_creation/storage_config.tf'
    ],
    impact: 'Storage module manages versioning (Enabled); workspace module applies bucket policy only',
    relatedGap: 'Module Separation'
  },
  {
    id: 'INF-004',
    category: 'Infrastructure',
    title: 'Lifecycle Filter Requirement',
    description: 'Add required filter block to S3 lifecycle configuration rules',
    priority: 'Medium',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'storage/main.tf'
    ],
    impact: 'Added empty filter {} to apply transition policy to all objects',
    relatedGap: 'AWS API Compliance'
  },
  {
    id: 'INF-005',
    category: 'Infrastructure',
    title: 'IAM Permission Handling',
    description: 'Skip lifecycle/KMS resources when GitHub Actions role lacks permissions',
    priority: 'High',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'storage/main.tf'
    ],
    impact: 'Conditional count prevents creation when role ARNs empty; allows deployment without extra permissions',
    relatedGap: 'Permission Management'
  },

  // Cost Optimization
  {
    id: 'COST-001',
    category: 'Cost Optimization',
    title: 'S3 Lifecycle Tiering Strategy',
    description: 'Implement Glacier transition and deletion policies for cost savings',
    priority: 'Medium',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'storage/main.tf'
    ],
    impact: 'Standard (0-90d) → Glacier (90-365d) → Delete (365d+); estimated 70% storage cost reduction',
    relatedGap: 'Cost Control'
  },

  // Compliance
  {
    id: 'COMP-001',
    category: 'Compliance',
    title: 'S3 Versioning for Audit Trail',
    description: 'Enable versioning on all S3 buckets for data recovery and compliance',
    priority: 'High',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'storage/main.tf'
    ],
    impact: 'Object history tracked; supports data recovery and forensic analysis',
    relatedGap: 'Audit Requirements'
  },
  {
    id: 'COMP-002',
    category: 'Compliance',
    title: 'KMS Key Annual Rotation',
    description: 'Enable automatic annual KMS key rotation for all encryption keys',
    priority: 'High',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'storage/main.tf'
    ],
    impact: 'Automatic key material rotation every 365 days; previous keys retained for decryption',
    relatedGap: 'Encryption Management'
  },

  // Architecture Review Backlog (AWS + Databricks Well-Architected)
  {
    id: 'ARCH-001',
    category: 'Data Platform Readiness',
    title: 'Automate Account-Level SSO/SCIM Validation Gates',
    description: 'Add post-apply checks and release gates to ensure account-console SSO/SCIM onboarding is completed consistently and validated end-to-end. Production data access depends on identity federation working reliably.',
    priority: 'High',
    status: 'Planned',
    filesModified: [
      '.github/workflows/workspace-configuration.yml',
      'databricks-workspace-configuration-aws/modules/sso_configuration'
    ],
    impact: 'Production readiness requirement: Enables automated validation that SSO and SCIM provisioning work end-to-end before teams use the platform. Prevents identity federation from silently breaking. Reduces onboarding drift and improves control evidence for identity federation.',
    relatedGap: 'Account SSO/SCIM Automation'
  },
  {
    id: 'ARCH-002',
    category: 'Data Platform Readiness',
    title: 'Implement Secrets Rotation Orchestration',
    description: 'Automate service principal and database credential rotation with alerting (80-day SP refresh, 30-day DB passwords, long-lived admin) to ensure production data pipeline security and prevent auth failures during critical operations',
    priority: 'High',
    status: 'Planned',
    filesModified: [
      'pipeline_workflows/',
      'aws_databricks_provisioning/modules/',
      'databricks-workspace-configuration-aws/modules/workspace_monitoring/'
    ],
    impact: 'Service principal credential freshness enforced via automated EventBridge trigger; production data pipelines cannot fail due to expired credentials; admin credentials long-lived (manual annual review). Prerequisite for data platform production readiness.',
    relatedGap: 'Secret Rotation Automation'
  },
  {
    id: 'ARCH-003',
    category: 'Operations',
    title: 'Remove Broad Drift Guard on Audit Log Delivery',
    description: 'Transition to import-first state onboarding and tighten ignore_changes scope for audit delivery resources to ensure production data platform audit trail integrity',
    priority: 'High',
    status: 'Completed',
    filesModified: [
      'aws_databricks_provisioning/modules/storage/main.tf'
    ],
    impact: 'Improves drift detection fidelity for audit logging configuration. Removed broad ignore_changes = [policy] from KMS key and ignore_changes = [rule] from S3 lifecycle, enabling terraform plan to detect real configuration changes. Critical audit telemetry now protected.',
    relatedGap: 'Audit Drift Detection'
  },
  {
    id: 'ARCH-004',
    category: 'Operations',
    title: 'Define and Test DR Runbooks with RTO/RPO',
    description: 'Create executable recovery playbooks with tiered RTO/RPO and recurring restore drills for production data platform',
    priority: 'Critical',
    status: 'Completed',
    filesModified: [
      'docs/DISASTER_RECOVERY_RUNBOOK.md',
      'docs/INCIDENT_LOG.md'
    ],
    impact: 'Foundation for production reliability: IaC-first approach enables 1-hour RTO for prod, 4-hour for staging, 8-hour for dev. Data platform recovery is predictable and testable. Measurable recovery objectives make production readiness assessments credible.',
    relatedGap: 'Disaster Recovery Readiness'
  },
  {
    id: 'ARCH-005',
    category: 'Data Platform Readiness',
    title: 'Enforce Budget and Cost Anomaly Controls',
    description: 'Add hard budget thresholds, daily cost anomaly detection, and auto-remediation to move from advisory tagging to enforced cost governance. Without these controls, production data platform costs will spiral out of control in Week 2.',
    priority: 'High',
    status: 'In Progress',
    filesModified: [
      'databricks-workspace-configuration-aws/modules/cost_tagging/',
      'aws_databricks_provisioning/modules/monitoring_observability/',
      'databricks-workspace-configuration-aws/modules/cluster_policies/'
    ],
    impact: 'CRITICAL BLOCKER: Prevents 2-3x budget overruns. Hard limits on cluster creation via policies, auto-termination of runaway clusters, daily cost anomaly alerts via CloudWatch. Cost tagging framework complete with team-based tracking; enforcement and anomaly detection pending. Without this, platform shuts down Week 2.',
    relatedGap: 'Cost Governance Enforcement'
  },
  {
    id: 'ARCH-006',
    category: 'Data Platform Readiness',
    title: 'Expand Observability to Lineage and Data Quality SLOs',
    description: 'Implement Delta Live Tables expectations, data freshness SLO tracking, and quality scorecards for all critical tables. Without this, production data quality issues propagate undetected until users report bad reports.',
    priority: 'High',
    status: 'In Progress',
    filesModified: [
      'aws_databricks_provisioning/modules/monitoring_observability/',
      'databricks-workspace-configuration-aws/modules/workspace_monitoring/',
      'docs/DISASTER_RECOVERY_RUNBOOK.md'
    ],
    impact: 'CRITICAL BLOCKER: Enables data-driven production readiness assessment. Delta Live Tables expectations prevent bad data propagation. Freshness SLO dashboard shows table health in real-time. CloudWatch infrastructure monitoring complete; data lineage, quality SLO observability, and freshness tracking pending. Production BI pipelines cannot launch without this.',
    relatedGap: 'Observability Depth'
  },
  {
    id: 'ARCH-007',
    category: 'Security',
    title: 'Automate User Deprovisioning Reconciliation',
    description: 'Introduce periodic entitlement reconciliation and stale principal deactivation workflow',
    priority: 'High',
    status: 'Planned',
    filesModified: [
      'databricks-workspace-configuration-aws/modules/scim_connector',
      'databricks-workspace-configuration-aws/modules/dbx_users_groups'
    ],
    impact: 'Reduces dormant identity exposure and improves joiner/mover/leaver control maturity',
    relatedGap: 'Identity Lifecycle Automation'
  },
  {
    id: 'ARCH-008',
    category: 'Compliance',
    title: 'Operationalize Git URL Restriction Compliance Checks',
    description: 'Document mandatory console controls and add pipeline compliance checks for repo restriction policy intent',
    priority: 'Medium',
    status: 'Planned',
    filesModified: [
      'docs/README_SSO_SCIM_CORRECTED.md',
      '.github/workflows/workspace-configuration.yml'
    ],
    impact: 'Compensates API limitation with enforceable governance and auditable controls',
    relatedGap: 'Git Source Governance'
  },

  // Data Platform Architect Tasks (Q2-Q4 2026)
  {
    id: 'DATA-001',
    category: 'Compliance',
    title: 'Build Data Catalog and Metadata Framework',
    description: 'Implement data dictionary, glossary, and lineage tracking for all tables in Unity Catalog',
    priority: 'High',
    status: 'Planned',
    filesModified: [
      'databricks-workspace-configuration-aws/modules/workspace_monitoring/',
      'docs/data_catalog_setup.md'
    ],
    impact: 'Enables self-service data discovery, reduces duplicate ETL, improves data quality compliance (L2.2 → L3.5)',
    relatedGap: 'Data Catalog & Glossary'
  },
  {
    id: 'DATA-002',
    category: 'Data Platform Readiness',
    title: 'Implement Data Quality Framework with SLOs',
    description: 'Deploy Delta Live Tables expectations, data quality rules, and SLO tracking for all critical tables. CRITICAL BLOCKER: Without this, bad data silently propagates to BI reports and breaks Week 3.',
    priority: 'Critical',
    status: 'Planned',
    filesModified: [
      'databricks-workspace-configuration-aws/modules/workspace_monitoring/',
      'docs/data_quality_standards.md'
    ],
    impact: 'CRITICAL FOR PRODUCTION LAUNCH: Prevents bad data propagation, enables data quality observability, enables first-week BI pipeline validation. Without DLT expectations and quality gates, Week 3 BI reports will show bad numbers and stakeholders lose trust.',
    relatedGap: 'Data Quality Governance'
  },
  {
    id: 'DATA-003',
    category: 'Security',
    title: 'Implement Row & Column-Level Security (RLS/CLS)',
    description: 'Deploy row-level filtering and column-level masking for sensitive data across Unity Catalog',
    priority: 'High',
    status: 'Planned',
    filesModified: [
      'databricks-workspace-configuration-aws/modules/dbx_users_groups/',
      'docs/security_masking_standards.md'
    ],
    impact: 'Enables role-based data access, prevents unauthorized PII exposure, achieves GDPR/CCPA compliance',
    relatedGap: 'Data Privacy & Masking'
  },
  {
    id: 'DATA-004',
    category: 'Operations',
    title: 'Establish Semantic Layer (dbt Transformation)',
    description: 'Build dbt project with conformed dimensions, business metrics, and lineage for BI/analytics',
    priority: 'High',
    status: 'Planned',
    filesModified: [
      'databricks-workspace-configuration-aws/dbt/',
      'data_platform_transformations/'
    ],
    impact: 'Enables consistent metrics, reduces BI building time, improves analytics maturity (L2.8 → L3.5)',
    relatedGap: 'Analytics Semantic Layer'
  },
  {
    id: 'DATA-005',
    category: 'Operations',
    title: 'Enable Real-Time Streaming Analytics',
    description: 'Implement Kafka/Kinesis ingestion, Auto-loader, and real-time SLA framework',
    priority: 'Medium',
    status: 'Planned',
    filesModified: [
      'databricks-workspace-configuration-aws/modules/workspace_monitoring/',
      'docs/streaming_architecture.md'
    ],
    impact: 'Enables real-time dashboards, ML feature stores, meets low-latency SLOs (L1.0 → L2.5)',
    relatedGap: 'Real-Time Data Pipeline'
  },
  {
    id: 'DATA-006',
    category: 'Operations',
    title: 'Implement ML/AI Governance with MLflow',
    description: 'Set up MLflow experiment tracking, model registry, and governance for ML workloads',
    priority: 'Medium',
    status: 'Planned',
    filesModified: [
      'databricks-workspace-configuration-aws/modules/workspace_monitoring/',
      'docs/ml_governance_framework.md'
    ],
    impact: 'Enables reproducible ML, audit trail for models, improves ML governance maturity (L2.0 → L3.0)',
    relatedGap: 'ML Model Governance'
  }
]

// Gap tracking based on architecture assessment
export interface IdentifiedGap {
  id: string
  category: 'Security' | 'Operations' | 'Cost' | 'Reliability' | 'Performance'
  title: string
  currentState: string
  targetState: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Open' | 'Addressed' | 'Mitigated' | 'Accepted'
  relatedTasks: string[]
  impact: string
}

export const identifiedGaps: IdentifiedGap[] = [
  {
    id: 'GAP-001',
    category: 'Security',
    title: 'Credential Management',
    currentState: 'Git PAT stored in Terraform state file, accessible to all state readers',
    targetState: 'PAT managed via GitHub Secrets, never persisted in state',
    priority: 'Critical',
    status: 'Addressed',
    relatedTasks: ['SEC-001'],
    impact: 'Eliminated credential exposure risk; PAT rotation no longer requires state updates'
  },
  {
    id: 'GAP-002',
    category: 'Security',
    title: 'Data Protection',
    currentState: 'S3 buckets lack versioning, lifecycle policies, and comprehensive bucket policies',
    targetState: 'Enterprise-grade bucket security with versioning, HTTPS enforcement, lifecycle tiers',
    priority: 'High',
    status: 'Addressed',
    relatedTasks: ['SEC-002', 'COST-001', 'COMP-001'],
    impact: 'Data recovery capability added; cost optimized with Glacier; compliance enforced'
  },
  {
    id: 'GAP-003',
    category: 'Security',
    title: 'Secret Management',
    currentState: 'No automated prevention of hardcoded secrets in commits',
    targetState: 'Pre-commit hook blocks secret patterns before push',
    priority: 'High',
    status: 'Addressed',
    relatedTasks: ['SEC-003'],
    impact: 'Prevents accidental credential leaks; educates developers on secure patterns'
  },
  {
    id: 'GAP-004',
    category: 'Operations',
    title: 'Resource Lifecycle',
    currentState: 'Audit log delivery recreated per environment, causing drift and conflicts',
    targetState: 'Account-level resources created once, reused by all environments',
    priority: 'Critical',
    status: 'Addressed',
    relatedTasks: ['OPS-001'],
    impact: 'Eliminated per-environment drift; single audit bucket shared across workspaces'
  },
  {
    id: 'GAP-005',
    category: 'Operations',
    title: 'Configuration Management',
    currentState: 'Module outputs fail when count-conditional modules not created',
    targetState: 'Outputs handle list access with null checks',
    priority: 'High',
    status: 'Addressed',
    relatedTasks: ['OPS-002'],
    impact: 'Terraform runs succeed regardless of module count; graceful degradation'
  },
  {
    id: 'GAP-006',
    category: 'Operations',
    title: 'Deployment Resilience',
    currentState: 'Re-deployments fail on existing CloudWatch log groups',
    targetState: 'Idempotent deployments with lifecycle ignore patterns',
    priority: 'Medium',
    status: 'Addressed',
    relatedTasks: ['OPS-003'],
    impact: 'Deployments can be re-run without cleanup; CI/CD retry-safe'
  },
  {
    id: 'GAP-007',
    category: 'Security',
    title: 'Access Control',
    currentState: 'S3 bucket policies missing required Databricks actions',
    targetState: 'Bucket policies include all required actions for workspace validation',
    priority: 'High',
    status: 'Addressed',
    relatedTasks: ['SEC-004'],
    impact: 'Workspace creation succeeds; Databricks can validate storage configuration'
  },
  {
    id: 'GAP-008',
    category: 'Operations',
    title: 'Permission Management',
    currentState: 'Lifecycle and KMS policies fail when GitHub Actions role lacks permissions',
    targetState: 'Conditional resource creation based on role capabilities',
    priority: 'High',
    status: 'Addressed',
    relatedTasks: ['INF-005'],
    impact: 'Deployments succeed without expanding IAM permissions; graceful feature degradation'
  },
  {
    id: 'GAP-009',
    category: 'Cost',
    title: 'Cost Control',
    currentState: 'S3 objects stored in Standard tier indefinitely',
    targetState: 'Lifecycle policies transition to Glacier and delete old objects',
    priority: 'Medium',
    status: 'Addressed',
    relatedTasks: ['COST-001'],
    impact: 'Estimated 70% storage cost reduction over 1 year; automatic cleanup at 365 days'
  },
  {
    id: 'GAP-010',
    category: 'Security',
    title: 'Encryption Management',
    currentState: 'KMS keys without automatic rotation policy',
    targetState: 'Annual automatic key rotation enabled for all KMS keys',
    priority: 'High',
    status: 'Addressed',
    relatedTasks: ['COMP-002'],
    impact: 'Enhanced security posture; automated compliance with key rotation requirements'
  },
  {
    id: 'GAP-011',
    category: 'Operations',
    title: 'Account SSO/SCIM Automation',
    currentState: 'Terraform prepares objects, but account-console SSO/SCIM completion is still operationally manual',
    targetState: 'Post-deployment validation and release gates enforce complete account-level onboarding',
    priority: 'High',
    status: 'Open',
    relatedTasks: ['ARCH-001'],
    impact: 'Manual identity onboarding steps increase variance and audit effort'
  },
  {
    id: 'GAP-012',
    category: 'Security',
    title: 'Secret Rotation Automation',
    currentState: 'Secrets are centrally stored, but periodic rotation workflow is not fully automated end-to-end',
    targetState: 'Automated rotation orchestration with expiry alerting and operational runbooks',
    priority: 'High',
    status: 'Open',
    relatedTasks: ['ARCH-002'],
    impact: 'Credential age can exceed policy and elevate access risk'
  },
  {
    id: 'GAP-013',
    category: 'Operations',
    title: 'Audit Drift Detection',
    currentState: 'Audit log delivery currently relies on broad drift guard behavior to avoid duplicate config failures',
    targetState: 'Import-first onboarding with narrow ignore scope and full drift visibility',
    priority: 'High',
    status: 'Mitigated',
    relatedTasks: ['ARCH-003'],
    impact: 'Critical audit telemetry settings may drift without strong detection'
  },
  {
    id: 'GAP-014',
    category: 'Reliability',
    title: 'Disaster Recovery Readiness',
    currentState: 'Backups/versioning exist, but formal RTO/RPO and executable recovery drills are not codified',
    targetState: 'Tiered RTO/RPO targets with scheduled restore testing and owned runbooks',
    priority: 'Critical',
    status: 'Open',
    relatedTasks: ['ARCH-004'],
    impact: 'Recovery timelines are unpredictable under regional or account-level incidents'
  },
  {
    id: 'GAP-015',
    category: 'Cost',
    title: 'Cost Governance Enforcement',
    currentState: 'Cost tagging and usage logs are available, but budget and anomaly response remain mostly manual',
    targetState: 'Automated budget guardrails and anomaly response integrated into platform operations',
    priority: 'High',
    status: 'Open',
    relatedTasks: ['ARCH-005'],
    impact: 'Spend outliers are detected late and optimization actions are inconsistent'
  },
  {
    id: 'GAP-016',
    category: 'Performance',
    title: 'Observability Depth',
    currentState: 'Infrastructure telemetry is healthy, but lineage and data quality SLO coverage is partial',
    targetState: 'Unified observability including lineage, freshness, and data quality SLO signals',
    priority: 'Medium',
    status: 'Open',
    relatedTasks: ['ARCH-006'],
    impact: 'Data quality incidents are caught later and root cause analysis takes longer'
  },
  {
    id: 'GAP-017',
    category: 'Security',
    title: 'Identity Lifecycle Automation',
    currentState: 'SCIM path exists, but full leaver/deprovisioning enforcement is not consistently automated',
    targetState: 'Automated entitlement reconciliation and stale principal deactivation',
    priority: 'High',
    status: 'Open',
    relatedTasks: ['ARCH-007'],
    impact: 'Dormant identities may remain active beyond policy tolerance'
  },
  {
    id: 'GAP-018',
    category: 'Operations',
    title: 'Git Source Governance',
    currentState: 'Certain git restriction controls are not manageable through current workspace conf API coverage',
    targetState: 'Compensating controls documented and continuously validated in CI workflows',
    priority: 'Medium',
    status: 'Open',
    relatedTasks: ['ARCH-008'],
    impact: 'Repository governance assurance depends on manual admin checks'
  },

  // Data Platform Governance Gaps (Q2-Q4 2026)
  {
    id: 'GAP-019',
    category: 'Operations',
    title: 'Data Catalog & Glossary',
    currentState: 'Basic table definitions exist; no centralized glossary, metadata tags, or data dictionary available for self-service discovery',
    targetState: 'Unified data catalog with glossary, ownership tagging, PII classification, and lineage visualization',
    priority: 'High',
    status: 'Open',
    relatedTasks: ['DATA-001'],
    impact: 'Data professionals spending 10-20% time searching for datasets; duplicate ETL pipelines created from unknown sources'
  },
  {
    id: 'GAP-020',
    category: 'Operations',
    title: 'Data Quality Governance',
    currentState: 'No formal data quality expectations, thresholds, or monitoring of data freshness/completeness SLOs',
    targetState: 'Delta Live Tables expectations, quality scorecards, and SLO dashboard for all datasets',
    priority: 'High',
    status: 'Open',
    relatedTasks: ['DATA-002'],
    impact: 'Bad data propagates downstream to BI/ML; quality issues discovered late by end users'
  },
  {
    id: 'GAP-021',
    category: 'Security',
    title: 'Data Privacy & Masking',
    currentState: 'No row-level security or column-level masking; all users seeing unmasked PII and sensitive data',
    targetState: 'RLS and CLS policies enforced for sensitive columns; PII automatically detected and masked',
    priority: 'High',
    status: 'Open',
    relatedTasks: ['DATA-003'],
    impact: 'GDPR/CCPA compliance risk; unauthorized data exposure; audit trail incomplete for sensitive access'
  },
  {
    id: 'GAP-022',
    category: 'Operations',
    title: 'Analytics Semantic Layer',
    currentState: 'Ad-hoc SQL queries across raw/transformed tables; no conformed dimensions or metric definitions',
    targetState: 'dbt transformation layer with conformed dimensions, business metrics, and BI-ready views',
    priority: 'Medium',
    status: 'Open',
    relatedTasks: ['DATA-004'],
    impact: 'Duplicate metric definitions; inconsistent reporting; BI teams spending 30-40% time on ETL vs. analytics'
  },
  {
    id: 'GAP-023',
    category: 'Operations',
    title: 'Real-Time Data Pipeline',
    currentState: 'Batch-only ingestion; no streaming architecture, low-latency SLOs, or real-time feature store',
    targetState: 'Kafka/Kinesis → Auto-loader → Real-time transformation → Real-time BI and Feature Store',
    priority: 'Medium',
    status: 'Open',
    relatedTasks: ['DATA-005'],
    impact: 'Real-time analytics and ML use cases not enabled; batch latency 4-24 hours vs. sub-minute SLOs'
  },
  {
    id: 'GAP-024',
    category: 'Operations',
    title: 'ML Model Governance',
    currentState: 'No MLflow setup; model experiments and lineage tracking manual; approval gates not enforced',
    targetState: 'MLflow experiment tracking, model registry, and approval workflow for all production deployments',
    priority: 'Medium',
    status: 'Open',
    relatedTasks: ['DATA-006'],
    impact: 'ML reproducibility gaps; difficult to trace model changes; no audit trail for compliance'
  },
  {
    id: 'GAP-025',
    category: 'Cost',
    title: 'Per-Query Cost Tracking',
    currentState: 'Cost allocated at cluster/team level; fine-grain per-query cost attribution missing',
    targetState: 'Query-level cost tracking with BI attribution and team chargeback',
    priority: 'Medium',
    status: 'Open',
    relatedTasks: ['ARCH-005'],
    impact: 'Cannot optimize expensive queries; cost accountability at query level missing'
  },
  {
    id: 'GAP-026',
    category: 'Operations',
    title: 'Data Lineage Tracking',
    currentState: 'Table dependencies exist in code; no automated lineage visualization or impact analysis',
    targetState: 'Automated lineage capturing for table-to-table, column-level, and job dependencies',
    priority: 'Medium',
    status: 'Open',
    relatedTasks: ['DATA-001'],
    impact: 'Downstream impact analysis manual; difficult to trace data quality issues to root source'
  }
]
