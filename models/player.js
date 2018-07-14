export class Player {
  constructor(avatarUrl, nickName) {
    this.left = (Math.ceil(Math.random() * 10) - 1) * 10;
    this.top = (Math.ceil(Math.random() * 10) - 1) * 10;
    this.avatarUrl = avatarUrl;
    this.nickName = nickName;
    this.HP = 100;
    this.ATK = 1;
    this.DEF = 0;
    this.combatMessage = "";
  }
  changeAttributes(dHP, dATK, dDEF) {
    this.HP = this.HP + dHP > 0 ? this.HP + dHP : 1;
    this.ATK = this.ATK + dATK > 0 ? this.ATK + dATK : 1;
    this.DEF = this.DEF + dDEF >= 0 ? this.DEF + dDEF : 0;
  }
  setCombatMessage(msg) {
    this.combatMessage = msg;
  }
  clearCombatMessage() {
    this.combatMessage = "";
  }
}
