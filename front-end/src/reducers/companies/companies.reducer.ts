import { createReducer } from '@reduxjs/toolkit';
import { Company } from '../../models/interfaces/company.interface';
import {
  deleteCompany,
  fetchCompaniesData,
  postCompany,
  setCompanyError,
  setSuccessMessage,
  updateCompany,
} from './companies.actions';

interface CompaniesState {
  companies: Company[];
  loadingCompanies: boolean;
  submittingCompany: boolean;
  error: string;
  successMessage: string;
}

const initialState: CompaniesState = {
  companies: [],
  loadingCompanies: false,
  submittingCompany: false,
  error: '',
  successMessage: '',
};

export const companiesReducer = createReducer(initialState, (builder: any) => {
  builder.addCase(fetchCompaniesData.pending, (state: any) => ({
    ...state,
    companies: [],
    loadingCompanies: true,
  }));

  builder.addCase(fetchCompaniesData.rejected, (state: any, action: any) => ({
    ...state,
    companies: [],
    error: action.payload,
    loadingCompanies: false,
  }));

  builder.addCase(fetchCompaniesData.fulfilled, (state: any, action: any) => ({
    ...state,
    companies: action.payload,
    loadingCompanies: false,
  }));

  builder.addCase(postCompany.pending, (state: any) => ({
    ...state,
    submittingCompany: true,
  }));

  builder.addCase(postCompany.rejected, (state: any, action: any) => ({
    ...state,
    submittingCompany: false,
    error: action.payload,
  }));

  builder.addCase(postCompany.fulfilled, (state: any, action: any) =>
    action.payload.error
      ? {
          ...state,
          submittingCompany: false,
          error: action.payload.error?.nativeError?.detail || 'Error.',
        }
      : {
          ...state,
          submittingCompany: false,
          successMessage: 'Company created.',
        }
  );

  builder.addCase(updateCompany.pending, (state: any) => ({
    ...state,
    submittingCompany: true,
  }));

  builder.addCase(updateCompany.rejected, (state: any, action: any) => ({
    ...state,
    submittingCompany: false,
    error: action.payload,
  }));

  builder.addCase(updateCompany.fulfilled, (state: any, action: any) => ({
    ...state,
    submittingCompany: false,
    successMessage: 'Company updated.',
  }));

  builder.addCase(deleteCompany.pending, (state: any) => ({
    ...state,
    submittingCompany: true,
  }));

  builder.addCase(deleteCompany.rejected, (state: any, action: any) => ({
    ...state,
    submittingCompany: false,
    error: action.payload,
  }));

  builder.addCase(deleteCompany.fulfilled, (state: any, action: any) => ({
    ...state,
    submittingCompany: false,
    successMessage: 'Company deleted.',
  }));

  builder.addCase(setSuccessMessage, (state: any, action: any) => ({
    ...state,
    successMessage: action.payload,
  }));

  builder.addCase(setCompanyError, (state: any, action: any) => ({
    ...state,
    error: action.payload,
  }));
});
