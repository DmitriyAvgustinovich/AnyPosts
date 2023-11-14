import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import GetPostsService from "../../auth/services/GetPostsService";
import { IPost } from "../../interfaces/IPost";
import AddPostService from "../../auth/services/AddPostService";
import { IPostPage } from "../../interfaces/IPostPage";
import { IPostsSliceState } from "../../interfaces/IPostsSliceState";

const initialState: IPostsSliceState = {
  addedPost: [],
  myPosts: [],
  allPosts: [],
  post: {} as IPost,
  error: "",
  status: "loading",
};

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post: IPost) => {
    const { data } = await AddPostService.addPost(post);
    return data;
  }
);

export const getMyPosts = createAsyncThunk("posts/myPosts", async () => {
  const { data } = await GetPostsService.getMyPosts();
  return data;
});

export const getAllPosts = createAsyncThunk("posts/allPosts", async () => {
  const { data } = await GetPostsService.getAllPosts();
  return data;
});

export const getPostPage = createAsyncThunk(
  "posts/getPostPage",
  async (id: IPostPage) => {
    const { data } = await GetPostsService.getPostPage(id);
    return data;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.fulfilled, (state, action) => {
        state.addedPost = action.payload;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.myPosts = action.payload;
        state.status = "success";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.allPosts = action.payload;
        state.status = "success";
      })
      .addCase(getPostPage.fulfilled, (state, action) => {
        state.post = action.payload;
        state.status = "success";
      });
  },
});

export const selectPosts = (state: RootState) => state.postsSlice;
export default postsSlice.reducer;
