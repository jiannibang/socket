import { Player } from "../models/player";

const playerService = {
  players: [],
  changedPlayers: [],
  getPlayers() {
    return this.players;
  },
  newPlayer({ avatarUrl, nickName }) {
    if (this.players.find(player => player.avatarUrl == avatarUrl)) {
    } else {
      let newPlayer = new Player(avatarUrl, nickName);
      this.players.push(newPlayer);
      this.changedPlayers.push(newPlayer);
    }
  },
  movePlayer({ user: { avatarUrl }, direction }) {
    let player = this.players.find(player => player.avatarUrl == avatarUrl);
    if (player) {
      switch (direction) {
        case "up":
          player.top -= 10;
          if (player.top < 0) {
            player.top = 0;
          }
          break;
        case "down":
          player.top += 10;
          if (player.top > 90) {
            player.top = 90;
          }
          break;
        case "left":
          player.left -= 10;
          if (player.left < 0) {
            player.left = 0;
          }
          break;
        case "right":
          player.left += 10;
          if (player.left > 90) {
            player.left = 90;
          }
          break;
        default:
          break;
      }
      if (!this.changedPlayers.find(player => player.avatarUrl == avatarUrl)) {
        this.changedPlayers.push(player);
      }
    }
  },
  clearChangedPlayer() {
    this.changedPlayers.length = 0;
  },
  getChangedPlayers() {
    return this.changedPlayers;
  }
};

export { playerService };
