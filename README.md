# Platform Map (React + TypeScript)

Framework-aligned AWS Databricks platform map with route-based navigation and container hosting.

## Localhost Run

### Dev mode (hot reload)

```bash
npm install
npm run dev -- --host --port 5173
```

Open: http://localhost:5173

### Local production preview

```bash
npm run build
npm run preview -- --host --port 4173
```

Open: http://localhost:4173

## Docker (single container)

```bash
docker build -t platform-map:local .
docker run --rm -p 8080:80 platform-map:local
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

## Routing

The app uses React Router and is SPA-safe in container hosting via nginx `try_files` fallback to `index.html`.

## Container CI/CD

Workflow file: `.github/workflows/container-image.yml`

- Pull requests to `main`: build and validate image (no push)
- Push to `main`: build and publish image to GHCR
- Tag push `v*`: build and publish versioned image to GHCR

Published image format:

`ghcr.io/<owner>/<repo>/platform-map:<tag>`
