import { IPost } from '../../interfaces/IPost';
import { $api } from '../http';
import { AxiosResponse } from 'axios';

export default class AddPostService {
  static addPost(postFields: IPost): Promise<AxiosResponse<IPost[]>> {
    return $api.post<IPost[]>('/addPost', postFields, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}