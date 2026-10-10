FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS builder
COPY . .
ARG NEXT_PUBLIC_BASE_URL=http://localhost:3000
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/gonances"
ENV DATABASE_ADAPTER="pg"
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
RUN pnpm exec prisma generate
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
COPY --from=builder /app/.next/standalone ./
EXPOSE 3000
CMD ["node", "server.js"]
