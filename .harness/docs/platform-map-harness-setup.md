Harness CI/CD setup for platform-map

Outcome
- Build platform-map on Harness CI.
- Push image to Google Artifact Registry.
- Deploy to Kubernetes from Harness.
- Deploy static export to GitHub Pages from Harness.
- Keep pipelines Git-backed so Harness picks updates from this repo.

Pipeline files in this repo
- platform-map/.harness/pipelines/platform-map-ci.yaml
- platform-map/.harness/pipelines/platform-map-cd.yaml
- platform-map/.harness/pipelines/platform-map-pages.yaml

Step 1: Create GCP service account for Artifact Registry
1. Create a service account dedicated to CI pushes (example: harness-artifact-pusher).
2. Grant roles:
- roles/artifactregistry.writer (push)
- roles/artifactregistry.reader (pull, optional but recommended)
3. Create a JSON key for this service account and store it securely.

Step 2: Create Harness secrets
Create these secrets in Harness at account or project scope:
1. gar_username
- Value: _json_key
2. gar_json_key
- Value: complete service account JSON key content.
3. github_pat
- Value: GitHub PAT with repo scope (used to push gh-pages branch).

Alternative: Source Harness secrets from Kubernetes secrets
Use this if you want secrets managed in your cluster instead of typing raw values into Harness.

1. Create Kubernetes secret in the delegate/build namespace (example harness-delegate)
- Add keys:
  - gar_username
  - gar_json_key
  - github_pat

2. In Harness, add a Kubernetes Secret Manager
- Type: Kubernetes
- Connector: same cluster (or another trusted cluster) where secret is stored
- Namespace: namespace containing the secret

3. In Harness, create secret references from that Secret Manager
- Create Harness secret gar_username mapped to Kubernetes secret key gar_username
- Create Harness secret gar_json_key mapped to Kubernetes secret key gar_json_key
- Create Harness secret github_pat mapped to Kubernetes secret key github_pat

4. Keep pipeline expressions unchanged
- Existing expressions already work:
  - <+secrets.getValue("gar_username")>
  - <+secrets.getValue("gar_json_key")>
  - <+secrets.getValue("github_pat")>

5. Rotate secrets by updating only Kubernetes secret values
- Pipelines and connectors do not need YAML changes when keys remain the same.

Step 3: Create required Harness connectors
1. Git connector
- Identifier in YAML: account.github
- Type: GitHub
- Target: this repository.

2. Kubernetes connector
- Identifier in YAML: account.harness_k8s
- Type: Kubernetes Cluster
- Must be able to run CI builds and apply manifests.

3. Artifact Registry Docker connector
- Identifier in YAML: account.artifact_registry_docker
- Type: Docker Registry
- Docker Registry URL: https://us-docker.pkg.dev (adjust region prefix if needed)
- Authentication:
  username -> <+secrets.getValue("gar_username")>
  password -> <+secrets.getValue("gar_json_key")>

4. Harness image connector
- Identifier in YAML: account.harnessImage
- Usually exists already for pulling public step images.

Step 4: Update pipeline YAML placeholders
1. In platform-map/.harness/pipelines/platform-map-ci.yaml:
- Set repo under BuildAndPushDockerRegistry to your real path, for example:
  us-docker.pkg.dev/<gcp-project>/<artifact-repo>/platform-map

2. In platform-map/.harness/pipelines/platform-map-cd.yaml:
- Ensure image_repo variable matches the same Artifact Registry repository.
- Keep runtime variable image_tag for controlled deployments.

3. In platform-map/.harness/pipelines/platform-map-pages.yaml:
- Set github_owner and github_repo runtime variables.
- Keep pages_base_path as /platform-map unless your Pages route differs.

Step 5: Import pipelines from Git Experience
1. In Harness, enable Git Experience in your project.
2. Create pipeline from remote store for each file.
3. Point to these exact paths:
- platform-map/.harness/pipelines/platform-map-ci.yaml
- platform-map/.harness/pipelines/platform-map-cd.yaml
- platform-map/.harness/pipelines/platform-map-pages.yaml
4. Save all three pipelines.

Step 6: Run your first build (manual test)
1. Run pipeline platform_map_ci.
2. For runtime input build, select your branch (for example main).
3. Confirm CI passes and image is pushed.
4. Verify in Artifact Registry that tags exist:
- <commit-sha>
- latest

Step 7: Run your first deployment (manual test)
1. Run pipeline platform_map_cd.
2. Set image_tag to the commit SHA produced by CI.
3. Confirm rollout passes for deployment platform-map in namespace platform-map.

Step 8: Add automation triggers
1. CI trigger
- Event: Pull Request create/update and Push to main
- Pipeline: platform_map_ci

2. CD trigger
- Event: Push to main (or manual only for production)
- Pipeline: platform_map_cd
- Set image_tag from commit SHA payload when possible.

3. GitHub Pages trigger
- Event: Push to main
- Pipeline: platform_map_pages
- Use branch filter main/master as needed.

Troubleshooting Artifact Registry integration
1. 401/403 on push
- Verify connector points to the correct registry host and service account has Artifact Registry writer role.

2. Push works locally but fails in Harness
- Verify connector uses the right secret scope and values.
- If using Kubernetes Secret Manager, verify namespace, secret name, key names, and delegate access to that namespace.

3. Permission denied for repository path
- Confirm repository exists in Artifact Registry and image path format is:
  us-docker.pkg.dev/<gcp-project>/<artifact-repo>/platform-map

4. Image pushed but deploy uses wrong tag
- Confirm image_tag runtime input and sed replacement path match the same repository.

5. Pages pipeline fails to push
- Verify github_pat secret has repo scope and target repo allows branch updates to gh-pages.

Security recommendations
- Use a dedicated service account for Artifact Registry pushes.
- Prefer immutable deploy tags (commit SHA) over latest.
- Add approval before CD in production.
