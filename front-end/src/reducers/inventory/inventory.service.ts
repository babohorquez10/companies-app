import { Inventory } from '../../models/interfaces/inventory.interface';

const getAll = async (token: string): Promise<Inventory[]> =>
  await fetch('/api/inventory', {
    headers: {
      'x-access-token': token,
    },
  }).then((response) => response.json());

export const InventoryService = {
  getAll,
};
