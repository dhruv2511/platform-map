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
  }
]
