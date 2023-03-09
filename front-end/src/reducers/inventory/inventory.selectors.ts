import { RootState } from '../../app/store';

export const selectInventory = (state: RootState) => state.inventory.inventory;
export const selectLoadingInventory = (state: RootState) =>
  state.inventory.loadingInventory;
export const selectSubmittingInventory = (state: RootState) =>
  state.inventory.submittingInventory;

export const selectInventorySubmitMessage = (state: RootState) =>
  state.inventory.successMessage;
