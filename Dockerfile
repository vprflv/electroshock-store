FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile --ignore-scripts

# ========================

FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && \
    apk add --no-cache openssl && \
    echo "dangerously-allow-all-builds=true" > .npmrc && \
    pnpm prisma generate && \
    pnpm build

# ========================

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p .next/cache .next/cache/fetch-cache .next/cache/images && \
    chown -R nextjs:nodejs .next && \
    chmod -R 755 .next

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Prisma Client
COPY --from=builder /app/node_modules/.pnpm/@prisma+client*/*/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/.pnpm/@prisma+client*/*/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]