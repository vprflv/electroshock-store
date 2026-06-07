FROM node:22-alpine AS base

# === Dependencies stage ===
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# Важно: включаем pnpm и разрешаем build-скрипты
RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile --ignore-scripts

# === Builder stage ===
FROM base AS builder
WORKDIR /app

# Копируем node_modules из deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && \
    # Явно разрешаем build-скрипты (самый надёжный способ)
    echo 'allowBuilds:' >> pnpm-workspace.yaml && \
    echo '  "@prisma/client": true' >> pnpm-workspace.yaml && \
    echo '  prisma: true' >> pnpm-workspace.yaml && \
    echo '  "@prisma/engines": true' >> pnpm-workspace.yaml && \
    echo '  sharp: true' >> pnpm-workspace.yaml && \
    echo '  unrs-resolver: true' >> pnpm-workspace.yaml && \
    apk add --no-cache openssl && \
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

# Prisma Client (важно копировать сгенерированные файлы)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]