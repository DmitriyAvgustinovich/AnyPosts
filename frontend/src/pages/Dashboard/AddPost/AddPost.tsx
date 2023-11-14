import React from "react";
import { Dashboard } from "../Dashboard";
import {
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { primaryBtn } from "../../../assets/ButtonStylesMui";
import { h2, primaryText } from "../../../globalsStylesMui";
import { input } from "../../../assets/InputsStylesMui";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../../redux/store";
import { addPost } from "../../../redux/slices/postsSlice";
import { IPost } from "../../../interfaces/IPost";
import { dashboardText } from "../DashboardStylesMui";
import { addPostForm, addPostBtn } from "./AddPostStylesMui";
import { select } from "../../../assets/SelectStylesMui";

const tags = ["technology", "tech", "career"];

export const AddPost: React.FC = () => {
  const { handleSubmit, control, register } = useForm<IPost>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IPost> = (post) => {
    dispatch(addPost(post));
  };

  return (
    <Dashboard>
      <Typography sx={[h2, dashboardText]}>Write a Post</Typography>

      <Box sx={addPostForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel>Tags</InputLabel>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  sx={select}
                  multiple
                  {...field}
                  inputProps={{ name: "tags" }}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      <Checkbox checked={field.value.includes(tag)} />
                      <ListItemText primary={tag} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <TextField
            sx={input}
            label="Title"
            variant="outlined"
            {...register("title", {
              required: true,
            })}
          />

          <TextField
            sx={input}
            style={{ whiteSpace: "pre-wrap" }}
            multiline
            rows={5}
            maxRows={Infinity}
            label="Text"
            variant="outlined"
            {...register("text", {
              required: true,
            })}
          />

          <Box sx={addPostBtn}>
            <Button
              sx={[primaryBtn, primaryText]}
              style={{ maxWidth: "300px" }}
              variant="outlined"
              type="submit"
            >
              Send Post
            </Button>
          </Box>
        </form>
      </Box>
    </Dashboard>
  );
};
