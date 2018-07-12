export class Player {
  constructor(avatarUrl, nickName) {
    this.left = (Math.ceil(Math.random() * 10) - 1) * 10;
    this.top = (Math.ceil(Math.random() * 10) - 1) * 10;
    this.avatarUrl = avatarUrl;
    this.nickName = nickName;
  }
}
