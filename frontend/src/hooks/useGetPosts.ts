import React from "react";
import { useAppDispatch } from "../redux/store";
import {
  getMyPosts,
  getAllPosts,
  getPostPage,
} from "../redux/slices/postsSlice";
import { IPostPage } from "../interfaces/IPostPage";

export const useGetMyPosts = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
};

export const useGetAllPosts = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
};

export const useGetPostPage = (id: IPostPage) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getPostPage(id));
  }, [dispatch, id]);
};
