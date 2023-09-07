import React from 'react';
import { Header } from '../../components/Header/Header';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box, Link } from '@mui/material';
import { useAppDispatch } from '../../redux/store';
import { registration } from '../../redux/slices/authSlice';
import {
  registerWrapper,
  registerText,
  registerInputsWrapper,
  registerSignText,
} from './RegisterStylesMui';
import { h1, primaryText, signature } from '../../globalsStylesMui';
import { input } from '../../assets/InputsStylesMui';
import { primaryBtn } from '../../assets/ButtonStylesMui';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ username, password }: Record<string, string>) => {
    const res = await dispatch(registration({ username, password }));
    if (res.payload) navigate('/');
  };

  return (
    <>
      <Header />

      <Box sx={registerWrapper}>
        <Box sx={registerText}>
          <Typography sx={h1}>Welcome back!</Typography>
          <Typography sx={primaryText} style={{ marginTop: '15px' }}>
            Get the most out of nuntium.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={registerInputsWrapper}>
            <TextField
              sx={input}
              id='outlined-basic'
              label='Name'
              variant='outlined'
              {...register('username', {
                required: true
              })}
            />

            <TextField
              sx={input}
              type='password'
              id='outlined-basic'
              label='Password'
              variant='outlined'
              {...register('password', {
                required: true
              })}
            />
          </Box>

          <Typography sx={[registerSignText, signature]}>
            Have an account? <Link
              sx={[registerSignText, signature]}
              style={{ borderBottom: '1px solid var(--gray)' }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </Link>
          </Typography>

          <Button
            sx={[primaryBtn, primaryText]}
            style={{ marginTop: '15px' }}
            variant='outlined'
            type='submit'
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </>
  );
};