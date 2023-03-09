import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { companiesReducer } from '../reducers/companies/companies.reducer';
import { userReducer } from '../reducers/user/user.reducer';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
