#!/bin/sh
set -e # Exit immediately if a command exits with a non-zero status. 'x' can be added for debugging (set -ex)

# Production Best Practice:
# Database migrations (prisma migrate deploy) should ideally be run as a separate step
# in your CI/CD pipeline (e.g., an init container in Kubernetes or a dedicated deployment job)
# BEFORE this application container starts. This keeps the app image lean and focused.

# If you MUST run migrations on startup (e.g., for development or simple review apps),
# you would uncomment the following lines and ensure Prisma CLI is available.
# However, this means `DATABASE_URL` must be correctly set, and the Prisma CLI
# would need to be in this image (increasing its size if installed globally,
# or requiring npx if not).
#
# echo "Applying database migrations..."
# npx prisma migrate deploy # Or `prisma migrate deploy` if CLI is globally installed
# echo "Migrations applied."

echo "Starting Next.js server..."
exec node server.js