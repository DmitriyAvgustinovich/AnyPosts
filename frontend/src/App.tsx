import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Tags } from './pages/Tags/Tags';
import { About } from './pages/About/About';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { AddPost } from './pages/Dashboard/AddPost/AddPost';
import { Statistics } from './pages/Dashboard/Statistics/Statistics';
import { Posts } from './pages/Dashboard/Posts/Posts';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tags' element={<Tags />} />
      <Route path='/about' element={<About />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/addPost' element={<AddPost />} />
      <Route path='/dashboard/statistics' element={<Statistics />} />
      <Route path='/dashboard/posts' element={<Posts />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;