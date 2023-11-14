import { IPost } from "./IPost";

export interface IPostsSliceState {
  addedPost: IPost[];
  myPosts: IPost[];
  allPosts: IPost[];
  post: IPost;
  error: string;
  status: string;
}
