# ---- Base Stage ----
# Use a specific LTS or versioned Alpine tag for Node.js
ARG NODE_VERSION=22-alpine
FROM node:${NODE_VERSION} AS base

# Install OS-level dependencies if needed (e.g., for Prisma engines on Alpine)
# openssl might be needed for Prisma database connections.
# libc6-compat for glibc dependent native modules on Alpine.
RUN apk add --no-cache tini libc6-compat openssl

WORKDIR /app

# ---- Dependencies Stage ----
FROM base AS deps
WORKDIR /app

# Copy package manager files and Prisma schema
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies for build and Prisma client generation)
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile --production=false; \
  elif [ -f package-lock.json ]; then npm install --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile --prod=false; \
  else echo "Lockfile not found. Please commit a lockfile." && exit 1; \
  fi

# ---- Prisma Client Generation Stage ----
FROM deps AS prisma_generate
WORKDIR /app
# Generate Prisma Client. This uses the Prisma CLI installed in node_modules.
# The "prebuild" script in package.json: "prisma generate" could also handle this.
RUN npx prisma generate

# ---- Builder Stage ----
FROM base AS builder
WORKDIR /app

# Copy dependencies (with generated Prisma client) from previous stage
COPY --from=prisma_generate /app/node_modules ./node_modules
COPY --from=prisma_generate /app/prisma ./prisma/
COPY --from=deps /app/package.json ./

# Copy application source code and necessary configuration files
# Ensure .dockerignore is properly configured to exclude unnecessary files
COPY public ./public/
# Assuming 'src' directory structure
COPY src ./src/
COPY next.config.ts tsconfig.json ./
# Copy postcss config
COPY postcss.config.mjs ./

# Set build-time ENV for Next.js telemetry (optional)
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application with proper asset optimization
# Using build arguments to ensure proper asset paths in production
ARG NEXT_PUBLIC_ASSET_PREFIX=""
ENV NEXT_PUBLIC_ASSET_PREFIX=${NEXT_PUBLIC_ASSET_PREFIX}

# Build the Next.js application
RUN npm install -g npm@latest && npm run build

# Create a clean production environment with just what's needed
# This helps ensure CSS and other assets are properly processed and included
RUN npm prune --production --legacy-peer-deps

# ---- Production Runner Stage ----
# Use the same base for consistency, though a distroless or slimmer base could be considered
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
# Disable telemetry at runtime
ENV NEXT_TELEMETRY_DISABLED=1
# Prisma telemetry ENV vars (from blog)
ENV CHECKPOINT_DISABLE=1
ENV DISABLE_PRISMA_TELEMETRY=true
# DATABASE_URL should be provided at runtime

# Create a non-root user and group
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nextjs -u 1001 -G nodejs

# Set production environment variable first (helps with asset paths)
ENV NODE_ENV=production

# Copy the standalone server - this is the main application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Ensure the complete Next.js structure is maintained
# First, copy the entire .next directory with all its subdirectories
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Then copy the public directory which might contain other static assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy the static directory from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma schema if needed for runtime (e.g., if migrations are run by this image, though not recommended for CMD)
# For a lean image where migrations are external, this COPY might be omitted.
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Copy and set permissions for the startup script
COPY --chown=nextjs:nodejs docker/start.sh /app/start.sh
RUN chmod +x /app/start.sh

USER nextjs
EXPOSE 3000

# ENTRYPOINT uses tini for proper signal handling
# CMD executes the start script
ENTRYPOINT [ "/sbin/tini", "--" ]
CMD [ "/app/start.sh" ]
