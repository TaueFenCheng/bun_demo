import { sleep, serve } from "bun";
const server = serve({
    port: 3600,
    // hostname: "",
    // hostname: "mydomain.com", // defaults to "0.0.0.0"
    async fetch(req) {
        const start = performance.now();
        await sleep(10);
        const end = performance.now();
        return new Response(`Slept for ${end - start}ms`);
    },
});

console.log(`Listening on http://localhost:${server.port}`);
