import { createReducer } from '@reduxjs/toolkit';
import { Inventory } from '../../models/interfaces/inventory.interface';
import {
  deleteInventory,
  fetchInventoryData,
  postInventory,
  setInventoryError,
  setInventorySuccessMessage,
  updateInventory,
} from './inventory.actions';

interface InventoryState {
  inventory: Inventory[];
  loadingInventory: boolean;
  submittingInventory: boolean;
  error: string;
  successMessage: string;
}

const initialState: InventoryState = {
  inventory: [],
  loadingInventory: false,
  submittingInventory: false,
  error: '',
  successMessage: '',
};

export const inventoryReducer = createReducer(initialState, (builder: any) => {
  builder.addCase(fetchInventoryData.pending, (state: any) => ({
    ...state,
    inventory: [],
    loadingInventory: true,
  }));

  builder.addCase(fetchInventoryData.rejected, (state: any, action: any) => ({
    ...state,
    inventory: [],
    loadingInventory: false,
    error: action.payload,
  }));

  builder.addCase(fetchInventoryData.fulfilled, (state: any, action: any) => ({
    ...state,
    inventory: action.payload,
    loadingInventory: false,
  }));

  builder.addCase(postInventory.pending, (state: any) => ({
    ...state,
    submittingInventory: true,
  }));

  builder.addCase(postInventory.rejected, (state: any, action: any) => ({
    ...state,
    submittingInventory: false,
    error: action.payload,
  }));

  builder.addCase(postInventory.fulfilled, (state: any, action: any) =>
    action.payload.error
      ? {
          ...state,
          submittingInventory: false,
          error: action.payload.error?.nativeError?.detail || 'Error.',
        }
      : {
          ...state,
          submittingInventory: false,
          successMessage: 'Inventory created.',
        }
  );

  builder.addCase(updateInventory.pending, (state: any) => ({
    ...state,
    submittingInventory: true,
  }));

  builder.addCase(updateInventory.rejected, (state: any, action: any) => ({
    ...state,
    submittingInventory: false,
    error: action.payload,
  }));

  builder.addCase(updateInventory.fulfilled, (state: any, action: any) => ({
    ...state,
    submittingInventory: false,
    successMessage: 'Inventory updated.',
  }));

  builder.addCase(deleteInventory.pending, (state: any) => ({
    ...state,
    submittingInventory: true,
  }));

  builder.addCase(deleteInventory.rejected, (state: any, action: any) => ({
    ...state,
    submittingInventory: false,
    error: action.payload,
  }));

  builder.addCase(deleteInventory.fulfilled, (state: any, action: any) => ({
    ...state,
    submittingInventory: false,
    successMessage: 'Article deleted.',
  }));

  builder.addCase(setInventorySuccessMessage, (state: any, action: any) => ({
    ...state,
    successMessage: action.payload,
  }));

  builder.addCase(setInventoryError, (state: any, action: any) => ({
    ...state,
    error: action.payload,
  }));
});
