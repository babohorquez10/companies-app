import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { InventoryService } from './inventory.service';

export const fetchInventoryData = createAsyncThunk(
  'inventory/fetchinventoryData',
  InventoryService.getAll
);

export const postInventory = createAsyncThunk(
  'inventory/postInventory',
  InventoryService.post
);

export const updateInventory = createAsyncThunk(
  'inventory/updateInventory',
  InventoryService.put
);

export const deleteInventory = createAsyncThunk(
  'inventory/deleteInventory',
  InventoryService.deleteOne
);

export const setInventorySuccessMessage = createAction<string>(
  'inventory/setInventorySuccessMessage'
);

export const setInventoryError = createAction<string>('inventory/setError');
