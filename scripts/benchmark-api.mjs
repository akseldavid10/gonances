const baseUrl = (process.env.API_BASE_URL ?? "http://localhost:3000/api/v1").replace(/\/$/, "");
const token = process.env.ACCESS_TOKEN;
const count = Number(process.env.BENCHMARK_REQUESTS ?? 50);
const targetP95 = Number(process.env.TARGET_P95_MS ?? 300);

if (!token) {
  console.error("Define ACCESS_TOKEN con un access token válido para ejecutar la prueba.");
  process.exit(1);
}
if (!Number.isInteger(count) || count < 1 || count > 1000) {
  console.error("BENCHMARK_REQUESTS debe estar entre 1 y 1000.");
  process.exit(1);
}

const samples = [];
for (let index = 0; index < count; index += 1) {
  const start = performance.now();
  const response = await fetch(`${baseUrl}/transactions?page=1&limit=10`, {
    headers: { Cookie: `accesstoken=${token}` },
    cache: "no-store",
  });
  const duration = performance.now() - start;
  if (!response.ok) {
    console.error(`GET /transactions falló con HTTP ${response.status}; se aborta el benchmark.`);
    process.exit(1);
  }
  await response.arrayBuffer();
  samples.push(duration);
}

samples.sort((a, b) => a - b);
const percentile = (p) => samples[Math.min(samples.length - 1, Math.ceil(samples.length * p) - 1)];
const average = samples.reduce((sum, value) => sum + value, 0) / samples.length;
console.log(`GET /transactions (${samples.length} requests): p50 ${percentile(0.5).toFixed(1)} ms, p95 ${percentile(0.95).toFixed(1)} ms, avg ${average.toFixed(1)} ms`);
if (percentile(0.95) > targetP95) {
  console.error(`No alcanza el objetivo de p95 < ${targetP95} ms.`);
  process.exitCode = 1;
}
