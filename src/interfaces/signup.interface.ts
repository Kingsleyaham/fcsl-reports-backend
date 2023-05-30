import { ILogin } from "./login.interface";
export interface ISignup extends ILogin {
  name?: string;
  username?: string;
  imgUrl?: string;
}
