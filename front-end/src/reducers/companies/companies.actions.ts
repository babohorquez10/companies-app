import { createAsyncThunk } from '@reduxjs/toolkit';
import { CompanyService } from './companies.service';

export const fetchCompaniesData = createAsyncThunk(
  'companies/fetchCompaniesData',
  CompanyService.getAll
);
