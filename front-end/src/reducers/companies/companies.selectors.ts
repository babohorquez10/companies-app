import { RootState } from '../../app/store';

export const selectCompanies = (state: RootState) => state.companies.companies;
export const selectLoadingCompanies = (state: RootState) =>
  state.companies.loadingCompanies;
export const selectSubmittingCompany = (state: RootState) =>
  state.companies.submittingCompany;

export const selectSubmitMessage = (state: RootState) =>
  state.companies.successMessage;

export const selectCompanyError = (state: RootState) => state.companies.error;
