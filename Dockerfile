FROM node:22-alpine AS base

# === Dependencies stage ===
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile --ignore-scripts

# === Builder stage ===
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && \
    apk add --no-cache openssl && \
    cat > pnpm-workspace.yaml << EOF
packages:
  - '.'

allowBuilds:
  "@prisma/client": true
  prisma: true
  "@prisma/engines": true
  sharp: true
  unrs-resolver: true
EOF && \
    pnpm prisma generate && \
    pnpm build

# === Runner stage ===
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Prisma Client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]