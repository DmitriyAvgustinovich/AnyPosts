import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Tags } from "./pages/Tags/Tags";
import { About } from "./pages/About/About";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { AddPost } from "./pages/Dashboard/AddPost/AddPost";
import { Profile } from "./pages/Dashboard/Profile/Profile";
import { Statistics } from "./pages/Dashboard/Statistics/Statistics";
import { PostPage } from "./pages/PostPage/PostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/tags" element={<Tags />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard/addPost" element={<AddPost />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      <Route path="/dashboard/statistics" element={<Statistics />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
