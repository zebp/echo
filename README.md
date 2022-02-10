# echo

A Cloudflare worker that echos WebSocket messages back to you

## Try it out

[Websocat](https://github.com/vi/websocat) is a handy CLI tool for interacting with WebSockets and is a nice way to play with this.

```bash
websocat wss://echo.zeb.workers.dev/
```


### Note

The connection is terminated 1 second after being accepted to prevent too much CPU time, I'm not made of money.
