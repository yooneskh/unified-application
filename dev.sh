(
  (
    cd frontend && \
      bun serve
  ) & (
    cd backend && \
      deno run --watch --unstable-kv -A ./bootstrap.ts
  )
)