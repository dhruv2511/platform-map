export function WorkflowsSection() {
  const workflows = [
    {
      name: 'databricks-provisioning-orchestrator.yml',
      trigger: 'Manual Dispatch | PR | Push to main',
      details: 'Main coordinator calling setup, plan, and apply reusable workflows with environment gates.',
    },
    {
      name: 'terraform-setup.yml',
      trigger: 'Called by orchestrator',
      details: 'Configures OIDC auth, backend validation, and provider credentials.',
    },
    {
      name: 'terraform-plan.yml',
      trigger: 'Pull Request | Called by orchestrator',
      details: 'Init, validate, plan, destructive-change detection, and PR comment output.',
    },
    {
      name: 'terraform-apply.yml',
      trigger: 'Push to main | Approval Gate',
      details: 'Deploys resources, updates state, captures outputs, and preserves lock safety.',
    },
    {
      name: 'terraform-destroy.yml',
      trigger: 'Manual Dispatch Only',
      details: 'Controlled teardown path with approvals, dependency handling, and auditability.',
    },
    {
      name: 'azure-pipelines.yaml',
      trigger: 'Manual Run | Variable-driven',
      details: 'Azure DevOps parity with init/plan/apply behavior and shared env parameterization.',
    },
  ]

  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">CI/CD Workflows</h3>
      <div className="feature-grid">
        {workflows.map((workflow) => (
          <article key={workflow.name} className="workflow-cardx">
            <h4>{workflow.name}</h4>
            <div className="trigger-chip">Trigger: {workflow.trigger}</div>
            <p>{workflow.details}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
