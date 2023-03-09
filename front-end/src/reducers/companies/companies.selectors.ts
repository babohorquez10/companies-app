import { RootState } from '../../app/store';

export const selectCompanies = (state: RootState) => state.companies.companies;
