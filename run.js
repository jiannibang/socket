"use strict";

import { messagesService } from "./scripts/messages";
var fs = require("fs");

var cfg = {
  ssl: false,
  port: 8080,
  ssl_key: "2_archeryscorecalculator.com.key",
  ssl_cert: "1_archeryscorecalculator.com_bundle.crt"
};

var httpServ = cfg.ssl ? require("https") : require("http");

var WebSocketServer = require("ws").Server;

var app = null;

// dummy request processing
var processRequest = function(req, res) {
  res.writeHead(200);
  res.end("All glory to WebSockets!\n");
};

if (cfg.ssl) {
  app = httpServ
    .createServer(
      {
        // providing server with  SSL key/cert
        key: fs.readFileSync(cfg.ssl_key),
        cert: fs.readFileSync(cfg.ssl_cert)
      },
      processRequest
    )
    .listen(cfg.port);
} else {
  app = httpServ.createServer(processRequest).listen(cfg.port);
}

// passing or reference to web server so WS would knew port and SSL capabilities
var wss = new WebSocketServer({
  server: app
});
messagesService.init(wss);
