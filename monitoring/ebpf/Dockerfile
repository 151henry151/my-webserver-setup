FROM golang:1.21 as builder

ENV DEBIAN_FRONTEND=noninteractive
ENV GO111MODULE=on
ENV CGO_ENABLED=1

RUN apt-get update && apt-get install -y \
    git \
    make \
    gcc \
    libc-dev \
    clang \
    llvm \
    libelf-dev \
    linux-headers-generic \
    libbpf-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src

# Initialize Go module and get dependencies
COPY go.mod ./
RUN go mod download && go mod verify

# Copy BPF source and compile it
COPY bpf.c ./
RUN clang -O2 -target bpf -c bpf.c -o bpf.o \
    -I/usr/include \
    -I/usr/include/x86_64-linux-gnu \
    -I/usr/src/linux-headers-$(uname -r)/include \
    -I/usr/src/linux-headers-$(uname -r)/arch/x86/include \
    -D__KERNEL__ \
    -D__BPF_TRACING__

# Copy and build Go code
COPY main.go ./
RUN go mod tidy && go build -o ebpf_exporter .

FROM ubuntu:22.04
RUN apt-get update && apt-get install -y \
    libelf1 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /src/ebpf_exporter /usr/local/bin/
COPY --from=builder /src/bpf.o /usr/local/bin/

EXPOSE 9435
ENTRYPOINT ["/usr/local/bin/ebpf_exporter"] 