import React from "react";
import { Dashboard } from "../Dashboard";
import { Box, Typography } from "@mui/material";
import { h1, h2, primaryText } from "../../../globalsStylesMui";
import CreateIcon from "@mui/icons-material/Create";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarIcon from "@mui/icons-material/Star";
import {
  statisticsCards,
  statisticsCard,
  statisticsCardContent,
} from "./StatisticsStylesMui";
import { dashboardText } from "../DashboardStylesMui";
import { useSelector } from "react-redux";
import { selectPosts } from "../../../redux/slices/postsSlice";
import { useGetMyPosts } from "../../../hooks/useGetPosts";

export const Statistics: React.FC = () => {
  const { myPosts } = useSelector(selectPosts);
  useGetMyPosts();

  const statisticsElements = [
    {
      label: "Total Posts",
      icon: <CreateIcon sx={h1} />,
      metric: myPosts.length,
    },
    {
      label: "Total Views",
      icon: <RemoveRedEyeIcon sx={h1} />,
      metric: myPosts.length,
    },
    {
      label: "Most Viewed Article",
      icon: <StarIcon sx={h1} />,
      metric: myPosts.length,
    },
  ];

  return (
    <Dashboard>
      <Typography sx={[h2, dashboardText]}>Statistics</Typography>

      <Box sx={[statisticsCards, dashboardText]}>
        {statisticsElements.map((card, index) => (
          <Box sx={statisticsCard} key={index}>
            <Typography sx={primaryText}>{card.label}</Typography>
            <Box sx={statisticsCardContent}>
              {card.icon}
              <Typography sx={h1}>{card.metric}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Dashboard>
  );
};
