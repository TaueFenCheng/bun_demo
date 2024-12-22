import { serve } from "bun";

const Socket = serve({
    fetch(req, server) {
        // upgrade the request to a WebSocket
        if (server.upgrade(req)) {
            return; // do not return a Response
        }
        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        async message(ws: any, message) {
            const msg = `${ws.data.username} has entered the chat`;
            ws.subscribe("the-group-chat");
            Socket.publish("the-group-chat", msg);
        }, // a message is received
        open(ws) { }, // a socket is opened
        close(ws: any, code, message) {
            const msg = `${ws.data.username} has left the chat`;
            ws.unsubscribe("the-group-chat");
            Socket.publish("the-group-chat", msg);
        }, // a socket is closed
        drain(ws) {

        }, // the socket is ready to receive more data
    },
})