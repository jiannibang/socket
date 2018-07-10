import { Player } from "../models/player";

export class playerServiceClass {
  constructor() {
    this.players = [];
  }
  getPlayers() {
    return this.players;
  }
  newPlayer({ avatarUrl, nickName }) {
    if (this.players.find(player => player.avatarUrl == avatarUrl)) {
    } else {
      this.players.push(new Player(avatarUrl, nickName));
    }
  }
  movePlayer({ user: { avatarUrl }, direction }) {
    let player = this.players.find(player => player.avatarUrl == avatarUrl);
    switch (direction) {
      case "up":
        player.top -= 10;
        break;
      case "down":
        player.top += 10;
        break;
      case "left":
        player.left -= 10;
        break;
      case "right":
        player.left += 10;
        break;
      default:
        break;
    }
  }
}
