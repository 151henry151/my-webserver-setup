#include <linux/bpf.h>
#include <linux/ptrace.h>
#include <bpf/bpf_helpers.h>
#include <bpf/bpf_tracing.h>
#include <bpf/bpf_core_read.h>

#ifndef BPF_MAP_TYPE_HASH
#define BPF_MAP_TYPE_HASH 1
#endif

#ifndef BPF_ANY
#define BPF_ANY 0
#endif

char LICENSE[] SEC("license") = "GPL";

struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 10240);
    __type(key, __u32);
    __type(value, __u64);
} syscalls SEC(".maps");

struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 10240);
    __type(key, __u32);
    __type(value, __u64);
} tcp_connections SEC(".maps");

struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 10240);
    __type(key, __u32);
    __type(value, __u64);
} page_cache_hits SEC(".maps");

struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 10240);
    __type(key, __u32);
    __type(value, __u64);
} page_cache_misses SEC(".maps");

SEC("kprobe/sys_enter")
int syscall_entry(struct pt_regs *ctx) {
    __u32 pid = bpf_get_current_pid_tgid() >> 32;
    __u64 *count = bpf_map_lookup_elem(&syscalls, &pid);
    __u64 init_val = 1;

    if (count)
        __sync_fetch_and_add(count, 1);
    else
        bpf_map_update_elem(&syscalls, &pid, &init_val, BPF_ANY);
    return 0;
}

SEC("kprobe/tcp_connect")
int tcp_connect(struct pt_regs *ctx) {
    __u32 pid = bpf_get_current_pid_tgid() >> 32;
    __u64 ts = bpf_ktime_get_ns();
    bpf_map_update_elem(&tcp_connections, &pid, &ts, BPF_ANY);
    return 0;
}

SEC("kprobe/mark_page_accessed")
int page_cache_hit(struct pt_regs *ctx) {
    __u32 pid = bpf_get_current_pid_tgid() >> 32;
    __u64 *count = bpf_map_lookup_elem(&page_cache_hits, &pid);
    __u64 init_val = 1;

    if (count)
        __sync_fetch_and_add(count, 1);
    else
        bpf_map_update_elem(&page_cache_hits, &pid, &init_val, BPF_ANY);
    return 0;
}

SEC("kprobe/add_to_page_cache_lru")
int page_cache_miss(struct pt_regs *ctx) {
    __u32 pid = bpf_get_current_pid_tgid() >> 32;
    __u64 *count = bpf_map_lookup_elem(&page_cache_misses, &pid);
    __u64 init_val = 1;

    if (count)
        __sync_fetch_and_add(count, 1);
    else
        bpf_map_update_elem(&page_cache_misses, &pid, &init_val, BPF_ANY);
    return 0;
} 