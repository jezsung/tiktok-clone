export default class UserModel {
  name: string;
  avatar: string;

  constructor(name: string, avatar: string) {
    this.name = name;
    this.avatar = avatar;
  }

  static fromJson(json: any): UserModel {
    return new UserModel(json['name'], json['avatar']);
  }
}
