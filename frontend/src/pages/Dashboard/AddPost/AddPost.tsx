import React from 'react';
import { Dashboard } from '../Dashboard';
import { Button, TextField } from '@mui/material';
import { primaryBtn } from '../../../assets/ButtonStylesMui';
import { primaryText } from '../../../globalsStylesMui';
import { input } from '../../../assets/InputsStylesMui';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_URL } from '../../../auth/http';

export const AddPost: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/addPost`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dashboard>
      <p style={{ color: 'var(--black)' }}>addPost</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          sx={input}
          id='outlined-basic'
          label='Title'
          variant='outlined'
          {...register('title', {
            required: true
          })}
        />

        <TextField
          sx={input}
          id='outlined-basic'
          label='Text'
          variant='outlined'
          {...register('text', {
            required: true
          })}
        />

        <Button
          sx={[primaryBtn, primaryText]}
          style={{ marginTop: '15px' }}
          variant='outlined'
          type='submit'
        >
          Send Post
        </Button>
      </form>
    </Dashboard>
  );
};