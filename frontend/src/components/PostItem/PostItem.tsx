import React from "react";
import {
  postItemCard,
  postItemCardElements,
  postItemCardImg,
  postItemCardTags,
  postItemCardAuthor,
  postItemCardText,
} from "./PostItemStylesMui";
import { Box, Typography, CardMedia, Button, Link } from "@mui/material";
import { dashboardText } from "../../pages/Dashboard/DashboardStylesMui";
import { h1, navLink, primaryText } from "../../globalsStylesMui";
import Img from "../../../public/img.png";
import { IPost } from "../../interfaces/IPost";
import { primaryBtn } from "../../assets/ButtonStylesMui";
import { useNavigate } from "react-router-dom";

export const PostItem: React.FC<IPost> = ({
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
    <Box sx={[postItemCard, dashboardText]}>
      <CardMedia sx={postItemCardImg} component="img" src={Img} alt="" />

      <Box sx={postItemCardElements}>
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
              WebkitLineClamp: showAll ? "unset" : "5",
              WebkitBoxOrient: "vertical",
            },
          ]}
        >
          {text}
        </Typography>

        <Button
          sx={[primaryBtn, primaryText]}
          style={{ marginTop: "20px", maxWidth: "150px" }}
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
