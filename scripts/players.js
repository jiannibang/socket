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
      // pseudo-random change attributes  
      this.setCombatMessage(player,"");
      if(player.left + player.top == 50) {
        this.changePlayerAttributes(player,10,1,0)
        this.setCombatMessage(player, "You find a rusty sword!")
      } else if(player.left + player.top == 100) {
        this.changePlayerAttributes(player,10,0,1)
        this.setCombatMessage(player, "You find a broken shield!")
      } else if(player.left + player.top == 150) {
        this.changePlayerAttributes(player,20,1,1)
        this.setCombatMessage(player, "Wow! What a shiny treasure!")
      } else {        
        switch(Math.ceil(Math.random() * 100) % 7) {
          case 0:
            this.changePlayerAttributes(player,-1,1,0);
            this.setCombatMessage(player, "You find a giant mouse.")
            break;
          case 1:
            this.changePlayerAttributes(player,-1,0,1);
            this.setCombatMessage(player, "You run into a goblin")
            break;
          case 2:
            this.changePlayerAttributes(player,-5,-1,-1);
            this.setCombatMessage(player, "You are facing a vampire!")
            break;
          case 3:
            this.changePlayerAttributes(player,-3,0,-1);
            this.setCombatMessage(player, "You are trapped!")
            break;
          case 4:
            this.changePlayerAttributes(player,-10,1,0);
            this.setCombatMessage(player, "You are engaged in a combat.")
            break;
          case 5:
            this.changePlayerAttributes(player,-1,0,0);
            this.setCombatMessage(player, "You are stolen while sleeping.")
            break;
          case 6:
            this.changePlayerAttributes(player,-1,-1,-1);
            this.setCombatMessage(player, "You fail ill.")
            break;            
        }

      }
      // End 
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
  },
  changePlayerAttributes(player, dHP, dATK, dDEF) {
    player.changeAttributes(dHP,dATK,dDEF);
  },
  setCombatMessage(player, msg) {
    if(msg) {
      player.setCombatMessage(msg);
    } else {
      player.clearCombatMessage();
    }
  }
};

export { playerService };
