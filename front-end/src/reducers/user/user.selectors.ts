import { RootState } from '../../app/store';

export const selectUser = (state: RootState) => state.user;
export const selectToken = (state: RootState) => state.user.token;
export const selectIsAdmin = (state: RootState) =>
  state.user.userType === 'ADMIN';
