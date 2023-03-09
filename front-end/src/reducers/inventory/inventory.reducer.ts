import { createReducer } from '@reduxjs/toolkit';
import { Inventory } from '../../models/interfaces/inventory.interface';
import { fetchInventoryData } from './inventory.actions';

interface InventoryState {
  inventory: Inventory[];
  loadingInventory: boolean;
}

const initialState: InventoryState = {
  inventory: [],
  loadingInventory: false,
};

export const inventoryReducer = createReducer(initialState, (builder: any) => {
  builder.addCase(fetchInventoryData.pending, (state: any) => ({
    ...state,
    inventory: [],
    loadingInventory: true,
  }));

  builder.addCase(fetchInventoryData.rejected, (state: any) => ({
    ...state,
    inventory: [],
    loadingInventory: false,
  }));

  builder.addCase(fetchInventoryData.fulfilled, (state: any, action: any) => ({
    ...state,
    inventory: action.payload,
    loadingInventory: false,
  }));
});
