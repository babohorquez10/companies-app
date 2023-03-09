import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../../models/interfaces/company.interface';
import { CompanyService } from './companies.service';

export const fetchCompaniesData = createAsyncThunk<Company[]>(
  'companies/fetchCompaniesData',
  CompanyService.getAll
);
