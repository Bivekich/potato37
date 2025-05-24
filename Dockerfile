FROM node:20-alpine AS base

# Установка зависимостей только при изменении package.json
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
# Установка зависимостей для sanity
COPY sanity/package.json sanity/package-lock.json* ./sanity/
WORKDIR /app/sanity
RUN npm install --legacy-peer-deps
# Установка зависимостей для sanity/potato37
COPY sanity/potato37/package.json sanity/potato37/package-lock.json* ./potato37/
WORKDIR /app/sanity/potato37
RUN npm install --legacy-peer-deps
WORKDIR /app

# Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/sanity/node_modules ./sanity/node_modules
COPY --from=deps /app/sanity/potato37/node_modules ./sanity/potato37/node_modules
COPY . .
RUN npm run build

# Запуск приложения
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Создание пользователя nextjs
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копирование необходимых файлов
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"] 