import React from 'react';
import { Header } from '../../components/Header/Header';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box, Link } from '@mui/material';
import { login } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../../redux/store';
import { h1, primaryText, signature } from '../../globalsStylesMui';
import {
  loginWrapper,
  loginText,
  loginInputsWrapper,
  loginSignText,
} from './loginStylesMui';
import { authInput } from '../../assets/AuthInputsStylesMui';
import { primaryBtn } from '../../assets/ButtonStylesMui';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ username, password }: Record<string, string>) => {
    const res = await dispatch(login({ username, password }));
    if (res.payload) navigate('/');
  };

  return (
    <>
      <Header />

      <Box sx={loginWrapper}>
        <Box sx={loginText}>
          <Typography sx={h1}>Welcome back!</Typography>
          <Typography sx={primaryText} style={{ marginTop: '15px' }}>
            Get the most out of nuntium.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={loginInputsWrapper}>
            <TextField
              sx={authInput}
              id='outlined-basic'
              label='Name'
              variant='outlined'
              {...register('username', {
                required: true
              })}
            />

            <TextField
              sx={authInput}
              type='password'
              id='outlined-basic'
              label='Password'
              variant='outlined'
              {...register('password', {
                required: true
              })}
            />
          </Box>

          <Typography sx={[loginSignText, signature]}>
            No account? <Link
              sx={[loginSignText, signature]}
              style={{ borderBottom: '1px solid var(--gray)' }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Link>
          </Typography>

          <Button
            sx={[primaryBtn, primaryText]}
            style={{ marginTop: '15px' }}
            variant='outlined'
            type='submit'
          >
            Sign In
          </Button>
        </form>
      </Box>
    </>
  );
};