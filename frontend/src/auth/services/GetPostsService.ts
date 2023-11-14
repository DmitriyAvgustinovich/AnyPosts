import { IPost } from "../../interfaces/IPost";
import { IPostPage } from "../../interfaces/IPostPage";
import { $api } from "../http";
import { AxiosResponse } from "axios";

export default class GetPostsService {
  static getMyPosts(): Promise<AxiosResponse<IPost[]>> {
    return $api.get<IPost[]>("/myPosts");
  }

  static getAllPosts(): Promise<AxiosResponse<IPost[]>> {
    return $api.get<IPost[]>("/allPosts");
  }

  static getPostPage(id: IPostPage): Promise<AxiosResponse<IPost[]>> {
    return $api.get<IPost[]>(`/post/${id}`);
  }
}
