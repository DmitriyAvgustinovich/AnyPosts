import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../redux/slices/authSlice';
import { IUser } from '../interfaces/IUser';

export const useSetAuthUser = (user: IUser) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user) dispatch(setIsAuth(true));
  }, [user, dispatch]);
};