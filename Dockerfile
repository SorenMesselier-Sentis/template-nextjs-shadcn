#/---- BASE STEP ---------------------------------------------------
#   Base image for development and production ENV
#-------------------------------------------------------------------/
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies only once
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=false

COPY . .

#/---- DEVELOPMENT STEP --------------------------------------------
#   Development image
#-------------------------------------------------------------------/
FROM base AS development

EXPOSE 3000

ENV NODE_ENV=development

# Use anonymous volumes to persist dependencies across builds
CMD ["yarn", "dev"]

#/---- PRODUCTION STEP ---------------------------------------------
#   Production image
#-------------------------------------------------------------------/
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=base /app/package.json /app/yarn.lock ./

RUN yarn install --frozen-lockfile --production=true

COPY --from=base /app/.next .next
COPY --from=base /app/public public

EXPOSE 3000

CMD ["yarn", "start"]
