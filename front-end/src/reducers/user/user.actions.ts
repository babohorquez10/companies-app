import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from './user.service';

export const login = createAsyncThunk('user/login', UserService.login);
export const verifyToken = createAsyncThunk(
  'user/verifyToken',
  UserService.verifyToken
);

export const setLoading = createAction<boolean>('user/setLoading');
export const setError = createAction<string>('user/setError');
export const logOut = createAction('user/logOut');
