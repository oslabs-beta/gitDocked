
# FROM ubuntu
# ARG UID
# ARG GID

# # Update the package list, install sudo, create a non-root user, and grant password-less sudo permissions
# RUN apt update && \
#     apt install -y sudo && \
#     addgroup --gid $GID nonroot && \
#     adduser --uid $UID --gid $GID --disabled-password --gecos "" nonroot && \
#     echo 'nonroot ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

# # Set the non-root user as the default user
# USER nonroot
# # Set the working directory
# WORKDIR /home/nonroot/app

# # Get your host's UID and GID
# export HOST_UID=$(id -u)
# export HOST_GID=$(id -g)

# # Build the Docker image
# docker build --build-arg UID=$HOST_UID --build-arg GID=$HOST_GID -t your-image-name .

# # Run the Docker container
# docker run -it --rm --name your-container-name your-image-name id

# Copy files into the container and set the appropriate permissions
# COPY --chown=nonroot:nonroot . /home/nonroot/app
# RUN chmod -R 755 /home/nonroot/app

# build backend service first
FROM --platform=$BUILDPLATFORM node:19.6-alpine3.16 AS builder
WORKDIR /backend
COPY backend/package*.json .
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
# COPY backend/static static
# COPY backend/user user

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