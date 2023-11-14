import { IUser } from "./IUser";

export interface IAuthSliceState {
  user: IUser;
  isAuth: boolean;
  error: string;
}
