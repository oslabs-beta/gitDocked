

FROM --platform=$BUILDPLATFORM node:19.6-alpine3.16 AS builder
WORKDIR /backend
COPY vm/package*.json .
RUN --mount=type=cache,target=/user/src/app/.npm \
    npm set cache /usr/src/app/.npm && \ 
    npm ci
COPY backend /backend

# build frontend service
FROM --platform=$BUILDPLATFORM node:19.6-alpine3.16 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json
RUN npm install
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY ui /ui
RUN npm run build

FROM --platform=$BUILDPLATFORM node:19.6-alpine3.16
LABEL org.opencontainers.image.title="GitDocked" \
    org.opencontainers.image.description="connecting Docker and Github" \
    org.opencontainers.image.vendor="GitDocked" \
    com.docker.desktop.extension.api.version="0.3.4" \
    com.docker.extension.screenshots="" \
    com.docker.desktop.extension.icon="" \
    com.docker.extension.detailed-description="" \
    com.docker.extension.publisher-url="" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.categories="" \
    com.docker.extension.changelog=""

COPY docker-compose.yaml .
COPY metadata.json .
COPY docker.svg .
COPY --from=builder /backend backend
COPY --from=client-builder /ui/build ui

# Copy user directory and static directory into the extension image
COPY vm/static static
COPY vm/user user

RUN chmod +x /backend
WORKDIR /backend
CMD ["npm", "start"]

# CMD /service -socket /run/guest-services/backend.sock
# COPY --from=builder /backend/bin/service /

# FROM golang:1.19-alpine AS builder
# ENV CGO_ENABLED=0
# WORKDIR /backend
# COPY backend/go.* .
# RUN --mount=type=cache,target=/go/pkg/mod \
#     --mount=type=cache,target=/root/.cache/go-build \
#     go mod download
# COPY backend/. .
# RUN --mount=type=cache,target=/go/pkg/mod \
#     --mount=type=cache,target=/root/.cache/go-build \
#     go build -trimpath -ldflags="-s -w" -o bin/service

# FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16 AS client-builder
# WORKDIR /ui
# # cache packages in layer
# COPY ui/package.json /ui/package.json
# COPY ui/package-lock.json /ui/package-lock.json
# RUN --mount=type=cache,target=/usr/src/app/.npm \
#     npm set cache /usr/src/app/.npm && \
#     npm ci
# # install
# COPY ui /ui
# RUN npm run build

# CMD /service -socket /run/guest-services/backend.sock
# COPY --from=builder /backend/bin/service /