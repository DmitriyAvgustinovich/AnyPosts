import React from "react";
import { Dashboard } from "../Dashboard";
import { dashboardText } from "../DashboardStylesMui";
import { h2, primaryText } from "../../../globalsStylesMui";
import { Typography, Box, CardMedia, TextField, Button } from "@mui/material";
import { useGetUser } from "../../../hooks/useGetUser";
import userAvatar from "../../../../public/user.png";
import { profileUserBlock } from "./ProfileStylesMui";
import { useForm, Controller } from "react-hook-form";
import { input } from "../../../assets/InputsStylesMui";
import { primaryBtn } from "../../../assets/ButtonStylesMui";
import { PostItem } from "../../../components/PostItem/PostItem";
import {
  SkeletonPostItem,
  SkeletonProfileMainPost,
} from "../../../components/Skeleton/Skeleton";
import { useGetMyPosts } from "../../../hooks/useGetPosts";
import { useSelector } from "react-redux";
import { selectPosts } from "../../../redux/slices/postsSlice";
import { ProfileMainPost } from "../../../components/ProfileMainPost/ProfileMainPost";

export const Profile: React.FC = () => {
  const user = useGetUser();
  const { handleSubmit, control } = useForm();

  const { myPosts, status } = useSelector(selectPosts);
  useGetMyPosts();

  const posts = myPosts.map((post) => <PostItem {...post} key={post.id} />);
  const skeletons = [...new Array(5)].map((_, index) => (
    <SkeletonPostItem key={index} />
  ));

  const profileMainPost = myPosts.map((post) => (
    <ProfileMainPost {...post} key={post.id} />
  ))[0];

  const profileMainPostSkeleton = [...new Array(1)].map((_, index) => (
    <SkeletonProfileMainPost key={index} />
  ));

  const onSubmit = (fields) => {
    console.log(fields);
  };

  return (
    <Dashboard>
      <Typography sx={[h2, dashboardText]}>Profile</Typography>

      <Box sx={profileUserBlock}>
        <Box>
          <CardMedia component="img" src={userAvatar} alt="" />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue={user.username}
            render={({ field }) => (
              <TextField
                {...field}
                sx={input}
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
            )}
          />

          <Controller
            name="about"
            control={control}
            defaultValue={user.username}
            render={({ field }) => (
              <TextField
                {...field}
                sx={input}
                id="outlined-basic"
                label="About"
                variant="outlined"
                style={{ whiteSpace: "pre-wrap" }}
                multiline
                rows={5}
                maxRows={Infinity}
              />
            )}
          />

          <Button
            sx={[primaryBtn, primaryText]}
            style={{ maxWidth: "250px", marginTop: "15px" }}
            variant="outlined"
            type="submit"
          >
            Edit Profile
          </Button>
        </form>
      </Box>

      <Box sx={dashboardText}>
        {status === "loading" ? profileMainPostSkeleton : profileMainPost}
        {status === "loading" ? skeletons : posts}
      </Box>
    </Dashboard>
  );
};
