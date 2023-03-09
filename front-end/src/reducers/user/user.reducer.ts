import { createReducer } from '@reduxjs/toolkit';
import { login, setLoading, verifyToken } from './user.actions';

interface UserState {
  email: string;
  userType: string;
  token: string;
  authenticated: boolean;
  error: '';
  loadingLogin: boolean;
  loading: boolean;
}

const initialState: UserState = {
  email: '',
  userType: 'USER',
  token: '',
  authenticated: false,
  error: '',
  loadingLogin: false,
  loading: true,
};

export const userReducer = createReducer(initialState, (builder: any) => {
  builder.addCase(login.pending, (state: any) => ({
    ...state,
    email: '',
    userType: 'USER',
    token: '',
    authenticated: false,
    error: '',
    loadingLogin: true,
  }));

  builder.addCase(login.rejected, (state: any, action: any) => ({
    ...state,
    email: '',
    userType: 'USER',
    token: '',
    authenticated: false,
    error: action.payload,
    loadingLogin: false,
  }));

  builder.addCase(login.fulfilled, (state: any, action: any) =>
    !action.payload.error
      ? {
          ...state,
          email: action.payload.email,
          userType: action.payload.userType,
          token: action.payload.token,
          authenticated: true,
          loadingLogin: false,
          error: '',
        }
      : {
          ...state,
          email: '',
          userType: 'USER',
          token: '',
          authenticated: false,
          loadingLogin: false,
          error: action.payload.error,
        }
  );

  builder.addCase(verifyToken.pending, (state: any) => ({
    ...state,
    email: '',
    userType: 'USER',
    token: '',
    authenticated: false,
    error: '',
    loadingLogin: true,
    loading: true,
  }));

  builder.addCase(verifyToken.rejected, (state: any, action: any) => ({
    ...state,
    email: '',
    userType: 'USER',
    token: '',
    authenticated: false,
    error: action.payload,
    loadingLogin: false,
    loading: false,
  }));

  builder.addCase(verifyToken.fulfilled, (state: any, action: any) =>
    !action.payload.error
      ? {
          ...state,
          email: action.payload.email,
          userType: action.payload.userType,
          token: action.payload.token,
          authenticated: true,
          loadingLogin: false,
          error: '',
          loading: false,
        }
      : {
          ...state,
          email: '',
          userType: 'USER',
          token: '',
          authenticated: false,
          loadingLogin: false,
          error: '',
          loading: false,
        }
  );

  builder.addCase(setLoading, (state: any, action: any) => ({
    ...state,
    loading: action.payload,
  }));
});
