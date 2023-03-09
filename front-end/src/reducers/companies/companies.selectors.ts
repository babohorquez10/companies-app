import { RootState } from '../../app/store';

export const selectCompanies = (state: RootState) => state.companies.companies;
export const selectLoadingCompanies = (state: RootState) =>
  state.companies.loadingCompanies;
