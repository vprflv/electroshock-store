# === Runner stage ===
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    # ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
    mkdir -p .next/cache .next/cache/fetch-cache .next/cache/images && \
    chown -R nextjs:nodejs .next && \
    chmod -R 755 .next
    # ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

# Копируем next.config.js (для картинок)
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