// console.log("Hello via Bun!");
import figlet from "figlet";
console.log(process.env.USERNAME);
const server = Bun.serve({
    port: 3000,
    fetch(req) {
        const text = figlet.textSync('bun')
        return new Response(text);
        // return new Response("Hello from Bun!");
    },
})

console.log(`Listening on http://localhost:${server.port}`);