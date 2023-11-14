import React from "react";
import {
  profileMainPostBlock,
  profileMainPostImg,
  profileMainPostText,
} from "./ProfileMainPostStylesMui";
import { Box, CardMedia, Typography, Button, Link } from "@mui/material";
import Img from "../../../public/img.png";
import { IPost } from "../../interfaces/IPost";
import { h1, navLink, primaryText } from "../../globalsStylesMui";
import {
  postItemCardAuthor,
  postItemCardTags,
  postItemCardText,
} from "../PostItem/PostItemStylesMui";
import { primaryBtn } from "../../assets/ButtonStylesMui";
import { useNavigate } from "react-router-dom";

export const ProfileMainPost: React.FC<IPost> = ({
  id,
  tags,
  title,
  author,
  createdAt,
  text,
}) => {
  const [showAll] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Box sx={profileMainPostBlock}>
      <CardMedia sx={profileMainPostImg} component="img" src={Img} alt="" />

      <Box sx={profileMainPostText}>
        {tags.map((tag) => (
          <Typography sx={[postItemCardTags, primaryText]} key={tag}>
            #{tag}&nbsp;
          </Typography>
        ))}
        <Typography sx={[h1, { margin: "10px 0" }]}>{title}</Typography>

        <Box sx={postItemCardAuthor}>
          <Typography>{author}</Typography> |
          <Typography>{new Date(createdAt).toDateString()}</Typography>
        </Box>

        <Typography
          sx={[
            postItemCardText,
            primaryText,
            {
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: showAll ? "unset" : "6",
              WebkitBoxOrient: "vertical",
            },
          ]}
        >
          {text}
        </Typography>

        <Button
          sx={[primaryBtn, primaryText]}
          style={{ marginTop: "40px", maxWidth: "150px" }}
          variant="outlined"
          type="submit"
        >
          <Link sx={navLink} onClick={() => navigate(`/post/${id}`)}>
            More
          </Link>
        </Button>
      </Box>
    </Box>
  );
};
