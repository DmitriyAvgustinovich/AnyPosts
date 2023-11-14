import React from "react";
import { Header } from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/slices/postsSlice";
import { useGetAllPosts } from "../../hooks/useGetPosts";
import { PostItem } from "../../components/PostItem/PostItem";
import {
  SkeletonMainPost,
  SkeletonPostItem,
} from "../../components/Skeleton/Skeleton";
import { Box, Typography } from "@mui/material";
import { appWrapper, h1 } from "../../globalsStylesMui";
import { HomeMainPost } from "../../components/HomeMainPost/HomeMainPost";
import { homeHeading, homeHeader } from "./HomeStylesMui";

export const Home: React.FC = () => {
  const { allPosts, status } = useSelector(selectPosts);
  useGetAllPosts();

  const posts = allPosts.map((post) => <PostItem {...post} key={post.id} />);
  const allPostsSkeletons = [...new Array(allPosts.length)].map((_, index) => (
    <SkeletonPostItem key={index} />
  ));

  const homeMainPost = allPosts.map((post) => (
    <HomeMainPost {...post} key={post.id} />
  ))[0];

  const mainPostSkeleton = [...new Array(1)].map((_, index) => (
    <SkeletonMainPost key={index} />
  ));

  return (
    <>
      <Header />

      <Box sx={appWrapper}>
        {status === "loading" ? mainPostSkeleton : homeMainPost}
        <Box sx={homeHeading}>
          <Typography sx={[homeHeader, h1]}>Editor’s Picks</Typography>
        </Box>
        {status === "loading" ? allPostsSkeletons : posts}
      </Box>
    </>
  );
};
