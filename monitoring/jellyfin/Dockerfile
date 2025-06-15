FROM golang:1.21-alpine AS builder

RUN apk add --no-cache git
WORKDIR /src
RUN git clone https://github.com/jjlrjjlr/jellyfin-exporter.git .
RUN go build -o jellyfin-exporter

FROM alpine:latest
COPY --from=builder /src/jellyfin-exporter /usr/local/bin/

ENTRYPOINT ["/usr/local/bin/jellyfin-exporter"] 