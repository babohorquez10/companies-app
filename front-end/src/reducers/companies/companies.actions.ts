import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CompanyService } from './companies.service';

export const fetchCompaniesData = createAsyncThunk(
  'companies/fetchCompaniesData',
  CompanyService.getAll
);

export const postCompany = createAsyncThunk(
  'companies/postCompany',
  CompanyService.post
);

export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  CompanyService.put
);

export const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  CompanyService.deleteOne
);

export const setSuccessMessage = createAction<string>(
  'company/setSuccessMessage'
);
