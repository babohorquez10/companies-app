import { createReducer } from '@reduxjs/toolkit';
import { Company } from '../../models/interfaces/company.interface';
import { fetchCompaniesData } from './companies.actions';

interface CompaniesState {
  companies: Company[];
}

const initialState: CompaniesState = {
  companies: [],
};

export const companiesReducer = createReducer(initialState, (builder: any) => {
  builder.addCase(fetchCompaniesData.pending, (state: any) => ({
    ...state,
    companies: [],
  }));

  builder.addCase(fetchCompaniesData.rejected, (state: any) => ({
    ...state,
    companies: [],
  }));

  builder.addCase(fetchCompaniesData.fulfilled, (state: any, action: any) => ({
    ...state,
    companies: action.payload,
  }));
});
