import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthService from "../../auth/services/AuthServise";
import { IAuthSliceState } from "../../interfaces/IAuthSliceState";
import { IUser } from "../../interfaces/IUser";
import { IAuthResponse } from '../../interfaces/IAuthResponse';
import { API_URL } from '../../auth/http';
import { RootState } from '../store';

const initialState: IAuthSliceState = {
  user: {} as IUser,
  isAuth: false,
  error: '',
};

export const registration = createAsyncThunk('auth/register', async ({ username, password }: Record<string, string>) => {
  const { data } = await AuthService.registration(username, password);
  const { token, user } = data;

  localStorage.setItem('token', token);
  return user;
});

export const login = createAsyncThunk('auth/login', async ({ username, password }: Record<string, string>) => {
  const res = await AuthService.login(username, password);
  const { token, user } = res.data;

  localStorage.setItem('token', token);
  return user;
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const { data } = await axios.get<IAuthResponse>(`${API_URL}/refreshJWT`, { withCredentials: true });
  const { token, user } = data;

  localStorage.setItem('token', token);
  return user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.error = '';
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.isAuth = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          localStorage.setItem('user', JSON.stringify(action.payload));
          state.isAuth = true;
        } else {
          localStorage.clear();
          state.error = 'Неверный логин или пароль';
          state.isAuth = false;
        }
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.isAuth = true;
      });
  },
});

export const { setIsAuth, setLogout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.authSlice;
export default authSlice.reducer;
