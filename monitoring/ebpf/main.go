package main

import (
	"log"
	"net/http"

	"github.com/cloudflare/ebpf_exporter/exporter"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
	config := &exporter.Config{
		Programs: []*exporter.Program{
			{
				Name:  "syscalls",
				Path:  "/usr/local/bin/bpf.o",
				Metrics: []*exporter.Metric{
					{
						Name:   "syscalls_total",
						Help:   "Number of syscalls",
						Labels: []string{"pid"},
						Type:   "counter",
					},
				},
			},
			{
				Name:  "tcp_connections",
				Path:  "/usr/local/bin/bpf.o",
				Metrics: []*exporter.Metric{
					{
						Name:   "tcp_connections_total",
						Help:   "Number of TCP connections",
						Labels: []string{"pid"},
						Type:   "counter",
					},
				},
			},
			{
				Name:  "page_cache",
				Path:  "/usr/local/bin/bpf.o",
				Metrics: []*exporter.Metric{
					{
						Name:   "page_cache_hits_total",
						Help:   "Number of page cache hits",
						Labels: []string{"pid"},
						Type:   "counter",
					},
					{
						Name:   "page_cache_misses_total",
						Help:   "Number of page cache misses",
						Labels: []string{"pid"},
						Type:   "counter",
					},
				},
			},
		},
	}

	e := exporter.New(config)
	prometheus.MustRegister(e)

	http.Handle("/metrics", promhttp.Handler())
	log.Printf("Starting eBPF exporter on :9435")
	log.Fatal(http.ListenAndServe(":9435", nil))
} 