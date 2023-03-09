import { createAsyncThunk } from '@reduxjs/toolkit';
import { InventoryService } from './inventory.service';

export const fetchInventoryData = createAsyncThunk(
  'inventory/fetchinventoryData',
  InventoryService.getAll
);
