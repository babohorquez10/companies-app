import { RootState } from '../../app/store';

export const selectInventory = (state: RootState) => state.inventory.inventory;
export const selectLoadingInventory = (state: RootState) =>
  state.inventory.loadingInventory;
