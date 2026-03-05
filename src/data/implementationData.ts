export interface ImplementationTask {
  id: string
  category: 'Security' | 'Operations' | 'Infrastructure' | 'Cost Optimization' | 'Compliance'
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
    description: 'Remove GitHub Personal Access Token from Terraform state file to prevent credential exposure',
    priority: 'Critical',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'git_integration/main.tf',
      'git_integration/variables.tf'
    ],
    impact: 'PAT never persisted in .tfstate; flows from GitHub Secrets → Actions → Terraform → Databricks only',
    relatedGap: 'Credential Management'
  },
  {
    id: 'SEC-002',
    category: 'Security',
    title: 'S3 Bucket Security Hardening',
    description: 'Implement versioning, bucket policy, lifecycle management, and KMS key policies for all S3 buckets',
    priority: 'High',
    status: 'Completed',
    completedDate: '2026-03-05',
    filesModified: [
      'storage/main.tf',
      'storage/variables.tf'
    ],
    impact: 'Enterprise-grade bucket security: versioning enabled, HTTPS enforced, Glacier lifecycle (90d), KMS rotation',
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
    category: 'Compliance',
    title: 'Automate Account-Level SSO/SCIM Validation Gates',
    description: 'Add post-apply checks and release gates to ensure account-console SSO/SCIM onboarding is completed consistently',
    priority: 'High',
    status: 'Planned',
    filesModified: [
      '.github/workflows/workspace-configuration.yml',
      'databricks-workspace-configuration-aws/modules/sso_configuration'
    ],
    impact: 'Reduces onboarding drift and improves control evidence for identity federation',
    relatedGap: 'Account SSO/SCIM Automation'
  },
  {
    id: 'ARCH-002',
    category: 'Security',
    title: 'Implement Secrets Rotation Orchestration',
    description: 'Automate SCIM/bootstrap secret rotation with alerting and expiry controls',
    priority: 'High',
    status: 'Planned',
    filesModified: [
      'pipeline_workflows/',
      'aws_databricks_provisioning/modules/'
    ],
    impact: 'Lowers credential-age risk and aligns with security rotation policy',
    relatedGap: 'Secret Rotation Automation'
  },
  {
    id: 'ARCH-003',
    category: 'Operations',
    title: 'Remove Broad Drift Guard on Audit Log Delivery',
    description: 'Transition to import-first state onboarding and tighten ignore_changes scope for audit delivery resources',
    priority: 'High',
    status: 'In Progress',
    filesModified: [
      'audit_log_delivery/',
      'databricks_deployment/main.tf'
    ],
    impact: 'Improves drift detection fidelity for audit logging configuration',
    relatedGap: 'Audit Drift Detection'
  },
  {
    id: 'ARCH-004',
    category: 'Operations',
    title: 'Define and Test DR Runbooks with RTO/RPO',
    description: 'Create executable recovery playbooks with tiered RTO/RPO and recurring restore drills',
    priority: 'Critical',
    status: 'Planned',
    filesModified: [
      'docs/DEPLOYMENT_CHECKLIST.md',
      'docs/ARCHITECTURE_ASSESSMENT.md'
    ],
    impact: 'Raises reliability posture by making recovery objectives measurable and testable',
    relatedGap: 'Disaster Recovery Readiness'
  },
  {
    id: 'ARCH-005',
    category: 'Cost Optimization',
    title: 'Enforce Budget and Cost Anomaly Controls',
    description: 'Add budget thresholds, anomaly alerts, and rightsizing controls to move from advisory to enforced cost governance',
    priority: 'High',
    status: 'Planned',
    filesModified: [
      'databricks-workspace-configuration-aws/modules/cost_tagging',
      'pipeline_workflows/'
    ],
    impact: 'Improves early spend anomaly detection and sustained cost control',
    relatedGap: 'Cost Governance Enforcement'
  },
  {
    id: 'ARCH-006',
    category: 'Operations',
    title: 'Expand Observability to Lineage and Data Quality SLOs',
    description: 'Extend monitoring dashboards and system table analytics for lineage, freshness, and data-quality objectives',
    priority: 'Medium',
    status: 'Planned',
    filesModified: [
      'databricks-workspace-configuration-aws/modules/workspace_monitoring',
      'docs/PLATFORM_PIPELINE_STRATEGY.md'
    ],
    impact: 'Shifts operations from reactive to proactive for data platform quality risks',
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
  }
]
