export default {
  async fetch(req: Request): Promise<Response> {
    if (req.headers.get("Upgrade") !== "websocket") {
      return new Response("missing websocket upgrade header", { status: 400 });
    }

    const { 0: client, 1: server } = new WebSocketPair();

    server.accept();

    const messageListener = ({ data }: MessageEvent) => server.send(data);
    const closeListener = () => clearTimeout(closeTimeout);

    // Give the user 1s to echo messages before we terminate the websocket.
    const closeTimeout = setTimeout(() => {
      server.close(1000, "your time is up!");
      server.removeEventListener("close", closeListener);
      server.removeEventListener("message", messageListener);
    }, 1000);

    // If we close the timeout before it has resolved then we should remove the callback.
    server.addEventListener("close", closeListener);
    server.addEventListener("message", messageListener);

    return new Response(null, { webSocket: client, status: 101 });
  },
};
