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
          <li>Production environment: $1,000-3,000+/month (depends on usage)</li>
          <li>Set up AWS billing alerts for your expected spend</li>
        </ul>
      </div>

      {/* Databricks Account */}
      <div className="card">
        <h3>🔐 2. Databricks Account Setup</h3>
        <p><strong>Timeline: 1 day</strong></p>

        <h4>Databricks Account Requirements:</h4>
        <ul>
          <li>
            <strong>Databricks Account</strong>
            <p>Sign up at <a href="https://accounts.cloud.databricks.com" target="_blank" rel="noopener noreferrer">accounts.cloud.databricks.com</a>. Choose AWS as your cloud provider.</p>
          </li>
          <li>
            <strong>Account Tier</strong>
            <p>
              • <strong>Standard:</strong> Perfect for learning, development, single team (most cost-effective)<br/>
              • <strong>Premium:</strong> For multiple teams, advanced security, essential for production<br/>
              • <strong>Enterprise:</strong> For large organizations with compliance needs (HIPAA, SOC2)
            </p>
          </li>
          <li>
            <strong>Unity Catalog Enabled</strong>
            <p>Unity Catalog is Databricks&apos; centralized governance engine. It&apos;s required in this setup. Ensure your account tier supports it (Premium/Enterprise).</p>
          </li>
          <li>
            <strong>Account ID</strong>
            <p>Find your Databricks Account ID in the Account Console (top-left corner). You&apos;ll need this for every deployment.</p>
          </li>
        </ul>

        <h4>Create OAuth Application (for CI/CD):</h4>
        <ol>
          <li>Log in to Databricks Account Console</li>
          <li>Go to <strong>Admin Settings → OAuth Applications</strong></li>
          <li>Click <strong>Create Service Principal</strong></li>
          <li>Name it: <code>bootstrap-cicd</code></li>
          <li>Select <strong>Account Admin</strong> permissions</li>
          <li>Generate OAuth Secret and save it securely</li>
        </ol>

        <h4>Resources Created in Databricks:</h4>
        <ul>
          <li>Account-level service principals (dev, staging, prod)</li>
          <li>Workspaces (one per environment)</li>
          <li>Unity Catalog metastores (shared or per-workspace)</li>
        </ul>
      </div>

      {/* GitHub/CI-CD */}
      <div className="card">
        <h3>🔄 3. GitHub & CI/CD Setup</h3>
        <p><strong>Timeline: 1 day</strong></p>

        <h4>Git Repository:</h4>
        <ul>
          <li>
            <strong>Repository Access</strong>
            <p>You need access to GitHub repositories containing the infrastructure code (fork or clone the aws_dbx repositories)</p>
          </li>
          <li>
            <strong>Branch Protection</strong>
            <p>
              Set up branch protection on <code>main</code> to prevent direct commits.<br/>
              • Require pull request reviews before merge<br/>
              • Require status checks to pass (Terraform plan)
            </p>
          </li>
        </ul>

        <h4>GitHub Secrets (for automated deployments):</h4>
        <p>Add these to your GitHub repository settings:</p>
        <ul>
          <li><code>AWS_ACCOUNT_ID</code>: Your AWS account ID</li>
          <li><code>DATABRICKS_ACCOUNT_ID</code>: Your Databricks account ID</li>
          <li><code>DATABRICKS_CLIENT_ID</code>: OAuth client ID from step 2</li>
          <li><code>DATABRICKS_CLIENT_SECRET</code>: OAuth secret (marked as secret)</li>
          <li><code>AWS_REGION</code>: Your target AWS region (e.g., us-east-1)</li>
        </ul>

        <h4>OIDC Configuration (Recommended):</h4>
        <p>Instead of storing AWS credentials, use OpenID Connect (OIDC) federation:</p>
        <ul>
          <li>GitHub Actions can assume AWS roles without storing long-term credentials</li>
          <li>Setup happens during the backend bootstrap stage</li>
          <li>More secure and compliant with best practices</li>
        </ul>
      </div>

      {/* Networking Understanding */}
      <div className="card">
        <h3>🌐 4. Understanding Your Network Architecture</h3>
        <p><strong>Timeline: 1-2 days (planning only)</strong></p>

        <p>Choose your networking architecture before deployment. This determines how Databricks connects to your systems.</p>

        <div className="subcard">
          <h4>Pattern 1: Standalone VPC (Default for Dev/Test)</h4>
          <p><strong>Best for:</strong> Small teams, development, proof-of-concepts</p>
          <p><strong>Architecture:</strong> Single VPC with Databricks workspace + managed connections to external systems</p>
          <ul>
            <li>✅ Simplest to deploy and understand</li>
            <li>✅ Cost-effective ($300-500/month for dev)</li>
            <li>✅ Good for learning and testing</li>
            <li>❌ Not ideal for production with existing infrastructure</li>
          </ul>
          <p><strong>Typical Setup:</strong></p>
          <pre className="prereq-code">VPC (10.0.0.0/16)
├── Public Subnet (for NAT Gateway)
└── Private Subnet (Databricks clusters)</pre>
        </div>

        <div className="subcard">
          <h4>Pattern 2: With Network Firewall (Production)</h4>
          <p><strong>Best for:</strong> Production environments with compliance needs</p>
          <p><strong>Architecture:</strong> Standalone + AWS Network Firewall for traffic inspection</p>
          <ul>
            <li>✅ Enhanced security and traffic monitoring</li>
            <li>✅ Meets compliance requirements (SOC2, HIPAA placeholders)</li>
            <li>✅ Detailed logging and threat detection</li>
            <li>❌ Slightly higher cost (~$100/month additional)</li>
          </ul>
          <p><strong>Typical Setup:</strong></p>
          <pre className="prereq-code">VPC (10.0.0.0/16)
├── NAT Gateway (egress)
├── Network Firewall (inspection point)
└── Databricks Subnets</pre>
        </div>

        <div className="subcard subcard-focus">
          <h4>Pattern 3: Hub-Spoke Architecture (Enterprise/Multi-Environment)</h4>
          <p><strong>Best for:</strong> Organizations with multiple workspaces, shared services, or complex networks</p>
          <p><strong>Why Hub-Spoke?</strong></p>
          <ul>
            <li>
              <strong>Centralized Management:</strong> One hub VPC for shared services (databases, data lakes, monitoring)
            </li>
            <li>
              <strong>Environment Isolation:</strong> Each environment (dev/staging/prod) gets its own spoke VPC
            </li>
            <li>
              <strong>Cost Efficiency:</strong> Shared infrastructure reduces redundancy
            </li>
            <li>
              <strong>Security:</strong> Network segmentation and controlled inter-VPC communication
            </li>
          </ul>

          <h5>🔑 Key Concepts for Hub-Spoke:</h5>
          <ul>
            <li><strong>Hub VPC:</strong> Shared services, data warehouses, authentication services, monitoring</li>
            <li><strong>Spoke VPCs:</strong> Individual Databricks workspaces (dev, staging, prod)</li>
            <li><strong>Transit Gateway:</strong> Connects hub to all spokes automatically</li>
            <li><strong>Private Link:</strong> Secure connectivity between Databricks and AWS services</li>
          </ul>

          <h5>Architecture Diagram:</h5>
          <pre className="prereq-code">
{`Hub VPC (10.0.0.0/16) - Shared Services
├── Shared Databases
├── Central Data Lake  
├── Monitoring & Logging
└── Network Firewall (optional central)
       ↓
Transit Gateway (TGW) - Central Routing
       ↓
   ┌───┴───────┬───────────┐
   ↓           ↓           ↓
Dev Spoke    Staging      Prod Spoke
(10.1.0/16)  Spoke       (10.3.0/16)
             (10.2.0/16)
    ↓         ↓            ↓
  DBX Dev   DBX Stg      DBX Prod
  Cluster   Cluster      Cluster`}
          </pre>

          <h5>Hub-Spoke Benefits:</h5>
          <table style={{ width: '100%', marginTop: 12, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Feature</th>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Benefit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>Centralized Monitoring</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>All logs flow to hub, single pane of glass</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>Shared Data Lake</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>All workspaces access same data sources</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>Security Groups</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>Centralized firewall rules, consistent policies</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>Cost Optimization</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>Shared infrastructure, less redundancy</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>Environment Flow</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>Data moves from dev→staging→prod safely</td>
              </tr>
            </tbody>
          </table>

          <h5>When to Use Hub-Spoke?</h5>
          <ul>
            <li>✅ Multiple Databricks workspaces (dev, staging, prod)</li>
            <li>✅ Shared data lake or data warehouse</li>
            <li>✅ Centralized monitoring/logging requirements</li>
            <li>✅ Complex security policies across environments</li>
            <li>✅ Enterprise architecture with existing infrastructure</li>
            <li>❌ Not needed: Simple single environment, small team</li>
          </ul>

          <h5>Implementation Steps (Simplified):</h5>
          <ol>
            <li>Create Hub VPC (10.0.0.0/16) with shared services</li>
            <li>Create Transit Gateway</li>
            <li>Attach hub VPC to Transit Gateway</li>
            <li>Create Dev Spoke VPC (10.1.0.0/16) + Databricks workspace</li>
            <li>Attach Dev Spoke to Transit Gateway</li>
            <li>Repeat for Staging & Prod spokes</li>
            <li>Configure Transit Gateway route tables for inter-VPC communication</li>
          </ol>
        </div>

        <div className="subcard">
          <h4>Pattern 4: Spoke-Only (Existing Hub)</h4>
          <p><strong>Best for:</strong> Adding Databricks to existing hub-spoke network</p>
          <ul>
            <li>✅ Uses existing Transit Gateway</li>
            <li>✅ Connects to existing hub services</li>
            <li>❌ Requires existing hub infrastructure</li>
          </ul>
        </div>

        <h4>Decision Matrix:</h4>
        <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Architecture</th>
              <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Complexity</th>
              <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Monthly Cost</th>
              <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>Standalone</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>Low</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$300-500</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>Dev/Test</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>With Firewall</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>Medium</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>$400-600</td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}>Production</td>
            </tr>
            <tr style={{ backgroundColor: '#f0f7ff' }}>
              <td style={{ border: '1px solid #ddd', padding: 12 }}><strong>Hub-Spoke</strong></td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}><strong>High</strong></td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}><strong>$1,200-2,000+</strong></td>
              <td style={{ border: '1px solid #ddd', padding: 12 }}><strong>Enterprise (Multiple Envs)</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Technical Tools */}
      <div className="card">
        <h3>🛠️ 5. Developer Tools & Environment</h3>
        <p><strong>Timeline: Half day to install and configure</strong></p>

        <h4>Required Tools:</h4>
        <ul>
          <li>
            <strong>Terraform v1.13.3 or later</strong>
            <p>
              Infrastructure-as-Code tool used for AWS and Databricks deployment.<br/>
              <a href="https://www.terraform.io/downloads" target="_blank" rel="noopener noreferrer">Download Terraform</a> | 
              <a href="https://learn.hashicorp.com/tutorials/terraform/install-cli" target="_blank" rel="noopener noreferrer"> Installation Guide</a>
            </p>
          </li>
          <li>
            <strong>AWS CLI v2+</strong>
            <p>
              Command-line tool to interact with AWS services.<br/>
              <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank" rel="noopener noreferrer">Installation Guide</a><br/>
              <code>aws configure</code> - Setup your AWS credentials
            </p>
          </li>
          <li>
            <strong>Git (Version Control)</strong>
            <p>
              For managing infrastructure code and CI/CD workflows.<br/>
              <a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" target="_blank" rel="noopener noreferrer">Installation Guide</a>
            </p>
          </li>
          <li>
            <strong>Databricks CLI (Optional but Recommended)</strong>
            <p>
              Interact with Databricks from command line.<br/>
              <code>pip install databricks-cli</code>
            </p>
          </li>
        </ul>

        <h4>Verification Checklist:</h4>
        <pre className="prereq-code">
{`# Verify installations:
terraform --version          # Should be 1.13.3+
aws --version               # Should be 2.0+
git --version              # Should be 2.30+

# Verify AWS credentials configured
aws sts get-caller-identity  # Should return your user/role

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
