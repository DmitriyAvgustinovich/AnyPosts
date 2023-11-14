import React from "react";
import { useGetPostPage } from "../../hooks/useGetPosts";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/slices/postsSlice";
import { Header } from "../../components/Header/Header";
import { SkeletonPostPage } from "../../components/Skeleton/Skeleton";
import {
  postPageImg,
  postPageElements,
  postPageCenterText,
  postPageTitle,
  postPageAuthor,
  postPageTags,
  postPageText,
} from "./PostPageStylesMui";
import { CardMedia, Box, Typography, Button, Link } from "@mui/material";
import Img from "../../../public/img.png";
import { appWrapper, h1, navLink, primaryText } from "../../globalsStylesMui";
import { primaryBtn } from "../../assets/ButtonStylesMui";

export const PostPage: React.FC = () => {
  const { post, status } = useSelector(selectPosts);
  const navigate = useNavigate();

  const { id } = useParams();
  useGetPostPage(id);

  const postPageSkeleton = [...new Array(1)].map((_, index) => (
    <SkeletonPostPage key={index} />
  ));

  return (
    <>
      <Header />

      {status === "loading" ? (
        postPageSkeleton
      ) : (
        <Box sx={appWrapper}>
          <CardMedia sx={postPageImg} component="img" src={Img} alt="" />

          <Box sx={postPageElements}>
            <Typography sx={[postPageTitle, postPageCenterText, h1]}>
              {post.title}
            </Typography>

            <Box sx={postPageAuthor}>
              <Typography>{post.author}</Typography> |
              <Typography>{new Date(post.createdAt).toDateString()}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {post.tags?.map((tag) => (
                <Typography sx={[postPageTags, primaryText]} key={tag}>
                  #{tag}&nbsp;
                </Typography>
              ))}
            </Box>

            <Typography sx={[postPageText, primaryText]}>
              {post.text}
            </Typography>

            <Button
              sx={[primaryBtn, primaryText]}
              style={{ margin: "40px 0", maxWidth: "150px" }}
              variant="outlined"
              type="submit"
            >
              <Link sx={navLink} onClick={() => navigate("/")}>
                Home
              </Link>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
