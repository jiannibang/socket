import { playerService } from "./players";
import { TICK_RATE } from "../config";

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

function handleMessage(message) {
  let { type, data } = JSON.parse(message);
  switch (type) {
    case "login":
      playerService.newPlayer(data);
      this.send(JSON.stringify(playerService.getPlayers()));
      break;
    case "move":
      playerService.movePlayer(data);
    default:
      break;
  }
}

const messagesService = {
  wss: null,
  tickRate: TICK_RATE,
  init(wss) {
    this.wss = wss;
    let tickPeriod = 1000 / this.tickRate;
    this.wss.on("connection", function(ws) {
      ws.isAlive = true;
      ws.on("pong", heartbeat);
      ws.on("message", handleMessage);
    });

    setInterval(function ping() {
      wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        let changedPlayers = JSON.stringify(playerService.getChangedPlayers());
        console.log(changedPlayers);
        ws.send(changedPlayers);
        playerService.clearChangedPlayer();
        ws.isAlive = false;
        ws.ping(noop);
      });
    }, tickPeriod);
  }
};

export { messagesService };
