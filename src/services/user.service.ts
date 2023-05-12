import { passwordHash } from "./../utils/password.util";
import { ISignup } from "../interfaces/signup.interface";
import User from "./../models/user.model";

class UserService {
  async findById(id: number) {
    return User.findByPk(id);
  }
  async findByUsername(username = "") {
    return User.findOne({ where: { username } });
  }
  async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }
  async findAll() {
    return User.findAll();
  }

  async createUser(newUser: ISignup) {
    const { email, password, username } = newUser;
    const userExists = await this.findByEmail(email);

    if (userExists) throw new Error("user already exist");

    const hashedPwd = await passwordHash(password);

    return User.create({ email, password: hashedPwd, username });
  }

  async updateUser(id: number, newUser: ISignup) {
    const user = await this.findById(id);
    const { email, name, username } = newUser;

    if (Object.keys(newUser).length === 0) throw new Error("please provide field(s) to update");

    if (!user) throw new Error("user not found");

    return User.update({ email, name, username }, { where: { id } });
  }

  async updatePassword(id: number, password: string) {
    const userExist = await this.findById(id);

    if (!userExist) throw new Error("user not found");

    const hashedPwd = await passwordHash(password);

    return User.update({ password: hashedPwd }, { where: { id } });
  }

  async deleteUser(id: number) {
    const userExist = await this.findById(id);

    if (!userExist) throw new Error("user not found");

    return User.destroy({ where: { id } });
  }
}

export default new UserService();
