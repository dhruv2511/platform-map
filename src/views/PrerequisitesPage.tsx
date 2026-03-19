export function PrerequisitesPage() {
  return (
    <section className="prereq-page">
      <h2 className="section-title">Databricks on AWS: Prerequisites & Setup Guide</h2>
      <p className="prereq-intro">
        Complete checklist for deploying Databricks on AWS. This guide is designed for teams completely new to Databricks and AWS.
      </p>

      {/* AWS Account Setup */}
      <div className="card">
        <h3>🏢 1. AWS Account Preparation</h3>
        <p><strong>Timeline: 1-2 days</strong></p>
        
        <h4>Essential Requirements:</h4>
        <ul>
          <li>
            <strong>AWS Account ID</strong>
            <p>You need an active AWS account. If you don&apos;t have one, <a href="https://aws.amazon.com/free/" target="_blank" rel="noopener noreferrer">create a free tier account</a></p>
          </li>
          <li>
            <strong>Root Account Email & MFA</strong>
            <p>Keep track of your root account credentials. Enable Multi-Factor Authentication on the root account for security.</p>
          </li>
          <li>
            <strong>AWS Region Selection</strong>
            <p>Choose your primary region (e.g., us-east-1, us-west-2, eu-west-1). Databricks supports most AWS regions. Consult with your team on latency and compliance needs.</p>
          </li>
        </ul>

        <h4>IAM Permissions Setup:</h4>
        <p>Your AWS user needs these permissions for initial setup:</p>
        <ul>
          <li><strong>S3</strong>: CreateBucket, PutBucketPolicy, PutBucketVersioning, PutBucketEncryption</li>
          <li><strong>DynamoDB</strong>: CreateTable, DescribeTable (for Terraform state locking)</li>
          <li><strong>IAM</strong>: CreateRole, CreatePolicy, AttachRolePolicy, CreateOpenIDConnectProvider</li>
          <li><strong>EC2</strong>: DescribeSecurityGroups, AuthorizeSecurityGroupIngress, CreateVpc, CreateSubnet</li>
          <li><strong>VPC</strong>: Full access for networking setup</li>
          <li><strong>KMS</strong>: CreateKey, CreateAlias (if using customer-managed encryption)</li>
          <li><strong>CloudWatch</strong>: CreateLogGroup, PutLogEvents</li>
        </ul>
        
        <p><strong>⚠️ For initial setup only:</strong> You can grant temporary AdminAccess during bootstrap, then restrict to specific roles for ongoing deployments.</p>

        <h4>Cost Estimation:</h4>
        <ul>
          <li>Development environment: $300-500/month</li>
          <li>Staging environment: $500-800/month</li>
          import { prerequisiteCategories, prerequisiteStats, prerequisitesData } from '../data/prerequisitesData'

          export function PrerequisitesPage() {
            const criticalOpen = prerequisitesData.filter((item) => item.priority === 'critical' && item.status !== 'complete')

            const byCategory = prerequisiteCategories.map((category) => {
              const items = prerequisitesData.filter((item) => item.category === category)
              const done = items.filter((item) => item.status === 'complete').length
              const pct = items.length ? Math.round((done / items.length) * 100) : 0
              return { category, total: items.length, done, pct }
            })

            return (
              <section>
                <h2 className="section-title">Prerequisites and Setup Readiness</h2>
                <p>
                  Live readiness view driven by tracked prerequisites for AWS account setup, Databricks account controls,
                  CI/CD, networking topology, monitoring, security, and documentation.
                </p>

                <div className="kpi-row" style={{ marginTop: 16 }}>
                  <div className="kpi kpi-success">
                    Completion
                    <strong>{prerequisiteStats.completionPercentage}%</strong>
                    <small>{prerequisiteStats.complete} of {prerequisiteStats.total} complete</small>
                  </div>
                  <div className="kpi kpi-warning">
                    In Progress
                    <strong>{prerequisiteStats.inProgress}</strong>
                    <small>active work items</small>
                  </div>
                  <div className="kpi">
                    Pending
                    <strong>{prerequisiteStats.pending}</strong>
                    <small>not yet started</small>
                  </div>
                  <div className="kpi kpi-info">
                    Critical Open
                    <strong>{criticalOpen.length}</strong>
                    <small>requires owner plan</small>
                  </div>
                </div>

                <div className="grid" style={{ marginTop: 16 }}>
                  <article className="card">
                    <h3>Category Progress</h3>
                    <ul>
                      {byCategory.map((row) => (
                        <li key={row.category}>
                          <strong>{row.category}</strong>: {row.done}/{row.total} complete ({row.pct}%)
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="card">
                    <h3>Current Network Topology Options</h3>
                    <ul>
                      <li><strong>single_vpc</strong>: fastest path for isolated environments.</li>
                      <li><strong>hub_spoke</strong>: shared services plus isolated spoke workspaces.</li>
                      <li><strong>spoke_only</strong>: attach new workspace VPC to existing hub/TGW.</li>
                      <li>Module split now uses dedicated <code>networking</code>, <code>network_hub</code>, and <code>network_spoke</code>.</li>
                    </ul>
                  </article>
                </div>

                <div className="card" style={{ marginTop: 16 }}>
                  <h3>Critical Items Not Complete</h3>
                  {criticalOpen.length === 0 ? (
                    <p>All critical prerequisites are marked complete.</p>
                  ) : (
                    <ul>
                      {criticalOpen.map((item) => (
                        <li key={item.id}>
                          <strong>{item.item}</strong> ({item.category}) - owner: {item.owner}, status: {item.status}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="card" style={{ marginTop: 16 }}>
                  <h3>Release Governance Prerequisites</h3>
                  <ul>
                    <li>Central module registry release workflow is active in <code>terraform-modules-central</code>.</li>
                    <li>Version pinning policy for consuming repositories is tracked as in-progress and should be enforced in CI checks.</li>
                    <li>Environment protection and approval rules remain required for destroy workflows.</li>
                  </ul>
                </div>
              </section>
            )
          }

# Verify AWS permissions
aws s3 ls                   # Can list buckets
aws ec2 describe-vpcs       # Can list VPCs`}
        </pre>
      </div>

      {/* Data & Storage */}
      <div className="card">
        <h3>💾 6. Data & Storage Preparation</h3>
        <p><strong>Timeline: 1-2 days</strong></p>

        <h4>S3 Buckets Needed:</h4>
        <ul>
          <li>
            <strong>Terraform State Bucket</strong> (created during backend setup)
            <p>Stores Terraform state files. Created automatically by bootstrap script.</p>
          </li>
          <li>
            <strong>Databricks Root Storage Bucket</strong>
            <p>Workspace data files. Created during workspace provisioning. Example: <code>my-project-dbx-root-dev</code></p>
          </li>
          <li>
            <strong>Unity Catalog Metastore Bucket</strong>
            <p>Data governance storage. Example: <code>my-project-dbx-metastore</code></p>
          </li>
          <li>
            <strong>Audit Logs Bucket</strong> (Optional but recommended)
            <p>Stores Databricks audit logs for compliance. Example: <code>my-project-dbx-audit-logs</code></p>
          </li>
        </ul>

        <h4>Data Migration Planning:</h4>
        <ul>
          <li>
            <strong>Identify Data Sources:</strong> Where is your data currently? (On-prem database, other cloud, S3, etc.)
          </li>
          <li>
            <strong>Volume Estimation:</strong> How much data needs to move? (Impacts network and timeline)
          </li>
          <li>
            <strong>Migration Strategy:</strong> Batch, streaming, or hybrid approach?
          </li>
          <li>
            <strong>Access Patterns:</strong> Who needs access? (Data lineage and governance)
          </li>
        </ul>
      </div>

      {/* Security & Compliance */}
      <div className="card">
        <h3>🔒 7. Security & Compliance Checklist</h3>
        <p><strong>Timeline: Day 1 (planning) + Ongoing</strong></p>

        <h4>Essential Security Steps:</h4>
        <ul>
          <li>
            <strong>Enable AWS CloudTrail</strong>
            <p>Audit all AWS API calls for compliance.</p>
          </li>
          <li>
            <strong>Enable VPC Flow Logs</strong>
            <p>Monitor network traffic to/from Databricks workspaces.</p>
          </li>
          <li>
            <strong>Encrypt Data in Transit</strong>
            <p>All communication uses TLS 1.2+. VPC endpoints keep traffic private.</p>
          </li>
          <li>
            <strong>Encrypt Data at Rest</strong>
            <p>S3 buckets encrypted with AWS KMS or S3-managed keys.</p>
          </li>
          <li>
            <strong>Implement Least Privilege IAM</strong>
            <p>Each role/user has minimum permissions needed.</p>
          </li>
          <li>
            <strong>Enable MFA on AWS Root Account</strong>
            <p>Protect root account from unauthorized access.</p>
          </li>
        </ul>

        <h4>Compliance Considerations:</h4>
        <ul>
          <li><strong>SOC2:</strong> Audit trails, encryption, access controls (✅ Supported)</li>
          <li><strong>HIPAA:</strong> Requires encryption, audit logs, PHI handling (✅ Supported with right config)</li>
          <li><strong>PCI-DSS:</strong> Network segmentation, encryption, access logs (✅ Supported)</li>
          <li><strong>GDPR:</strong> Data residency, right to delete, data classification (✅ Supported with proper setup)</li>
        </ul>

        <p><strong>📋 Action Items:</strong> Discuss compliance requirements with your security team during planning.</p>
      </div>

      {/* Personnel & Third-Party Dependencies */}
      <div className="card">
        <h3>🤝 8. Personnel & Third-Party Technology Dependencies</h3>
        <p><strong>Timeline: Confirm before deployment week (ideally Day 1-2)</strong></p>

        <h4>Required People / Teams:</h4>
        <ul>
          <li><strong>Cloud Platform Owner:</strong> Can approve IAM roles, networking, and account guardrails</li>
          <li><strong>Network Team:</strong> Owns routing, Transit Gateway, firewall rules, and private DNS behavior</li>
          <li><strong>Security Team:</strong> Approves encryption, audit logging, and least-privilege policies</li>
          <li><strong>Identity Team:</strong> Owns SSO/SCIM, enterprise app approval, and group sync</li>
          <li><strong>DNS/Domain Team (often third party):</strong> Owns CNAME/zone updates and TTL windows</li>
          <li><strong>Data Owners:</strong> Approve source access and data movement windows</li>
        </ul>

        <h4>Third-Party / External Dependencies:</h4>
        <ul>
          <li><strong>DNS Change Windows:</strong> Confirm who controls DNS and what lead time is required (24-72h typical)</li>
          <li><strong>Corporate PKI / Certificates:</strong> If custom domains or private endpoints use enterprise cert processes</li>
          <li><strong>Firewall Vendor / SOC:</strong> If egress rules are managed outside cloud platform team</li>
          <li><strong>ITSM Approval Flow:</strong> Change tickets required for production cutovers</li>
          <li><strong>SaaS Integrations:</strong> Downstream tools (BI, orchestration, observability) may require vendor-side setup</li>
        </ul>

        <h4>Example: DNS Cutover Dependency (Common Blocker)</h4>
        <ul>
          <li><strong>Dependency:</strong> Third-party DNS provider must create/update CNAME for workspace vanity URL</li>
          <li><strong>Owner:</strong> Network or domain team (not data platform team)</li>
          <li><strong>Lead Time:</strong> Often 1-3 business days + CAB approval</li>
          <li><strong>Technical Inputs Needed:</strong> Target hostname, record type, TTL, rollback value</li>
          <li><strong>Risk if missed:</strong> Workspace unreachable on go-live domain even if infrastructure is healthy</li>
        </ul>

        <h4>Dependency Readiness Checklist:</h4>
        <ul>
          <li>☐ Named owner for each external dependency</li>
          <li>☐ SLA/lead time documented for DNS, firewall, and identity changes</li>
          <li>☐ Change ticket IDs tracked for production go-live</li>
          <li>☐ Backout plan documented (old DNS target + rollback TTL)</li>
          <li>☐ Freeze period conflicts checked (e.g., end-of-month, holiday freeze)</li>
          <li>☐ Escalation contact list available for cutover day</li>
        </ul>

        <h4>RACI for External Dependencies (Kickoff Template)</h4>
        <table style={{ width: '100%', marginTop: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Activity</th>
              <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>R</th>
              <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>A</th>
              <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>C</th>
              <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>I</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>DNS cutover (CNAME/TTL/rollback)</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>DNS Team</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Infra Manager</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Platform + Network</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Business Stakeholders</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Firewall / egress approvals</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Network Team</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Security Lead</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Platform Team</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Ops Teams</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>SSO/SCIM onboarding</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Identity Team</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Security Lead</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Databricks Admin</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>End Users</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>CAB / production change approval</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Project Manager</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Change Advisory Board</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Security + Platform</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>All Delivery Teams</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Data source access approvals</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Data Owners</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Data Governance Lead</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Platform + Security</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>Analytics Teams</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: 10, fontSize: 14, color: '#666' }}>
          <strong>Legend:</strong> R = Responsible, A = Accountable, C = Consulted, I = Informed
        </p>
      </div>

      {/* Pre-Deployment Checklist */}
      <div className="card callout callout-warn">
        <h3>✅ Pre-Deployment Checklist</h3>
        <p>Complete all items before starting deployment:</p>

        <h4>AWS Setup</h4>
        <ul>
          <li>☐ AWS Account created and root account secured with MFA</li>
          <li>☐ AWS credentials configured locally (aws configure)</li>
          <li>☐ IAM user/role has required permissions (or temporary AdminAccess)</li>
          <li>☐ AWS region selected and documented</li>
          <li>☐ Billing alerts configured</li>
        </ul>

        <h4>Databricks Setup</h4>
        <ul>
          <li>☐ Databricks account created (accounts.cloud.databricks.com)</li>
          <li>☐ Databricks Account ID documented</li>
          <li>☐ Unity Catalog enabled on account</li>
          <li>☐ Bootstrap service principal created with Account Admin role</li>
          <li>☐ OAuth Client ID and Secret saved securely</li>
        </ul>

        <h4>GitHub/CI-CD Setup</h4>
        <ul>
          <li>☐ GitHub account with repository access</li>
          <li>☐ Repository secrets configured (see GitHub Secrets section above)</li>
          <li>☐ OIDC roles created (or credentials stored securely)</li>
          <li>☐ Branch protection rules enabled on main branch</li>
        </ul>

        <h4>Developer Environment</h4>
        <ul>
          <li>☐ Terraform installed (v1.13.3+)</li>
          <li>☐ AWS CLI installed and configured</li>
          <li>☐ Git installed and SSH keys setup (recommended)</li>
          <li>☐ Databricks CLI installed (optional)</li>
          <li>☐ All tools verified with version commands</li>
        </ul>

        <h4>Architecture Decision</h4>
        <ul>
          <li>☐ Network architecture chosen (Standalone/Firewall/Hub-Spoke)</li>
          <li>☐ If Hub-Spoke: hub VPC CIDR blocks planned</li>
          <li>☐ If Hub-Spoke: spoke CIDR blocks planned (dev, staging, prod)</li>
          <li>☐ PrivateLink requirements assessed</li>
          <li>☐ Data migration strategy defined</li>
        </ul>

        <h4>Documentation</h4>
        <ul>
          <li>☐ AWS Account ID documented</li>
          <li>☐ Databricks Account ID documented</li>
          <li>☐ Selected AWS region documented</li>
          <li>☐ Team email addresses collected</li>
          <li>☐ Security/compliance requirements documented</li>
          <li>☐ Dependency owners documented (DNS, Identity, Network, Security)</li>
          <li>☐ External change lead times documented (DNS/firewall/SSO)</li>
          <li>☐ DNS cutover runbook prepared with rollback steps</li>
        </ul>
      </div>

      {/* Cost Estimation */}
      <div className="card">
        <h3>💰 Cost Estimation Reference</h3>
        <p>Monthly costs for typical setups (US-East-1 pricing, with moderate usage)</p>

        <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Component</th>
              <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Dev</th>
              <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Staging</th>
              <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Production</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>Databricks (DBU)</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$100-200</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$200-400</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$800-2,000+</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>EC2 (Compute)</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$50-100</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$75-150</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$200-500</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>S3 Storage</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$10-20</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$20-40</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$50-200</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>NAT Gateway</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$32</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$32</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$32-64</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>Network Firewall</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$0</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$0</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$50+</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>VPC Endpoints</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$5-10</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$5-10</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$10-20</td>
            </tr>
            <tr style={{ backgroundColor: '#f0f7ff', fontWeight: 'bold' }}>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>Estimated Total</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$197-350</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$332-630</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$1,142-3,000+</td>
            </tr>
          </tbody>
        </table>

        <p style={{ marginTop: 16, fontSize: 14, color: '#666' }}>
          <strong>Notes:</strong><br/>
          • Prices vary by region (EU more expensive)<br/>
          • Production costs scale with data volume and compute usage<br/>
          • Hub-Spoke architecture adds $200-400/month for additional networking<br/>
          • PrivateLink adds minimal cost but improves security significantly<br/>
          • Setup a monthly budget alert at 50% of estimated spend
        </p>
      </div>

      {/* Next Steps */}
      <div className="card callout callout-success">
        <h3>🚀 Next Steps After Prerequisites</h3>
        <ol>
          <li>
            <strong>Bootstrap AWS Backend:</strong> Run backend provisioning to set up S3 state, DynamoDB locks, and IAM roles
          </li>
          <li>
            <strong>Create Databricks Service Principals:</strong> One per environment (dev, staging, prod)
          </li>
          <li>
            <strong>Deploy VPC & Networking:</strong> Choose your architecture and deploy network infrastructure
          </li>
          <li>
            <strong>Create Databricks Workspace:</strong> Deploy workspace in the VPC with proper credentials
          </li>
          <li>
            <strong>Configure Unity Catalog:</strong> Set up metastore and assign to workspace
          </li>
          <li>
            <strong>Add Users & Groups:</strong> Configure access control and user management
          </li>
          <li>
            <strong>Deploy Workloads:</strong> Move data and configure jobs/notebooks
          </li>
        </ol>
      </div>

      {/* Quick Reference Links */}
      <div className="card">
        <h3>📚 Quick Reference Links</h3>
        <ul>
          <li>
            <a href="https://docs.databricks.com/aws/en/" target="_blank" rel="noopener noreferrer">
              Databricks AWS Documentation
            </a>
          </li>
          <li>
            <a href="https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html" target="_blank" rel="noopener noreferrer">
              AWS VPC Getting Started
            </a>
          </li>
          <li>
            <a href="https://docs.aws.amazon.com/transit-gateway/latest/userguide/what-is-transit-gateway.html" target="_blank" rel="noopener noreferrer">
              AWS Transit Gateway Tutorial
            </a>
          </li>
          <li>
            <a href="https://docs.databricks.com/en/deploy-manage/cloud-environments/aws/network/" target="_blank" rel="noopener noreferrer">
              Databricks Networking Best Practices
            </a>
          </li>
          <li>
            <a href="https://docs.databricks.com/en/admin/unity-catalog/" target="_blank" rel="noopener noreferrer">
              Unity Catalog Setup Guide
            </a>
          </li>
        </ul>
      </div>

      <div className="prereq-spacer" />
    </section>
  )
}
