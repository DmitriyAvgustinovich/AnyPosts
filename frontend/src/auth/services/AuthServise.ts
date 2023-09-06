import { IAuthResponse } from '../../interfaces/IAuthResponse';
import { AxiosResponse } from 'axios';
import { $api } from '../http';

export default class AuthService {
  static async registration(username: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/registration', { username, password });
  }

  static async login(username: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/login', { username, password });
  }
}