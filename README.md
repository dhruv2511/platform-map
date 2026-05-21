# Platform Map (Next.js + TypeScript)

Framework-aligned AWS Databricks platform map with route-based navigation and container hosting.

## Localhost Run

### Dev mode (hot reload)

```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 5173
```

Open: http://localhost:5173

### Local production preview

```bash
npm run build
npm run start -- --hostname 0.0.0.0 --port 4173
```

Open: http://localhost:4173

## Docker (single container)

```bash
docker build -t platform-map:local .
docker run --rm -p 8080:3000 platform-map:local
```

Open: http://localhost:8080

## Docker Compose

```bash
docker compose up --build -d
```

Open: http://localhost:8080

Stop:

```bash
docker compose down
```

## Kubernetes

Kubernetes manifests are under `k8s/` and can be applied with Kustomize.

1. Build and push an image:

```bash
docker build -t us-docker.pkg.dev/<gcp-project>/<artifact-repo>/platform-map:<tag> .
docker push us-docker.pkg.dev/<gcp-project>/<artifact-repo>/platform-map:<tag>
```

2. Set the image in the Kustomization and deploy:

```bash
cd k8s
kustomize edit set image platform-map=us-docker.pkg.dev/<gcp-project>/<artifact-repo>/platform-map:<tag>
kubectl apply -k .
```

3. Verify rollout:

```bash
kubectl -n platform-map rollout status deploy/platform-map
kubectl -n platform-map get svc,ingress,pods
```

Notes:
- The ingress host defaults to `platform-map.local` in `k8s/ingress.yaml`.
- The ingress assumes an NGINX ingress controller (`ingressClassName: nginx`).

## Routing

The app uses Next.js App Router.

## Container CI/CD

Workflow file: `.github/workflows/container-image.yml`

- Pull requests to `main`: build and validate image (no push)
- Push to `main`: build and publish image to Artifact Registry
- Tag push `v*`: build and publish versioned image to Artifact Registry

Published image format:

`us-docker.pkg.dev/<gcp-project>/<artifact-repo>/platform-map:<tag>`
