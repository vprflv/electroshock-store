FROM node:22-alpine

# === Dependencies ===
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile --ignore-scripts

# === Build ===
COPY . .

RUN corepack enable pnpm && \
    apk add --no-cache openssl && \
    echo "dangerously-allow-all-builds=true" > .npmrc && \
    pnpm prisma generate && \
    pnpm build

# === Runner ===
ENV NODE_ENV=production

RUN apk add --no-cache openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p .next/cache .next/cache/fetch-cache .next/cache/images && \
    chown -R nextjs:nodejs .next && \
    chmod -R 755 .next

# Копируем только нужное
COPY --from=0 /app/public ./public
COPY --from=0 /app/.next/standalone ./
COPY --from=0 /app/.next/static ./.next/static
COPY --from=0 /app/prisma ./prisma
COPY --from=0 /app/next.config.js ./

# Prisma Client
COPY --from=0 /app/node_modules/.pnpm/@prisma+client*/*/node_modules/.prisma ./node_modules/.prisma
COPY --from=0 /app/node_modules/.pnpm/@prisma+client*/*/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]