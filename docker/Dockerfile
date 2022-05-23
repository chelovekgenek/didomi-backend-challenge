#
# Base environment
#
FROM node:16.13.1-alpine as base

RUN apk update --no-cache && \
    apk upgrade --no-cache

#
# Builder
#
FROM base as builder

WORKDIR /build

COPY env ./env
COPY src ./src
COPY *.json *.lock *.js .npmrc ./

# yarn depends on bash and git
RUN apk add --no-cache bash git

# nest build
RUN mkdir .yarncache && \
    yarn install --network-timeout 1000000 --cache-folder .yarncache && \
    yarn build && \
    rm -rf node_modules && \
    yarn install --production=true --network-timeout 1000000 --cache-folder .yarncache && \
    rm -rf .yarncache

#
# Runtime
#
FROM base

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /build/env env
COPY --from=builder /build/dist dist
COPY --from=builder /build/node_modules node_modules
COPY --from=builder /build/package.json package.json

# Create a non-root user
RUN adduser -D app && \
    chown -R app: /app

USER system0

EXPOSE 8080

ENTRYPOINT [ "yarn", "start:prod" ]
