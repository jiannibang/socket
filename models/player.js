export class Player {
  constructor(avatarUrl, nickName) {
    this.left = Math.random() * 100;
    this.top = Math.random() * 100;
    this.avatarUrl = avatarUrl;
    this.nickName = nickName;
  }
}
