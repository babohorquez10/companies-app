import { Inventory } from '../../models/interfaces/inventory.interface';

const getAll = async (token: string): Promise<Inventory[]> =>
  await fetch('/api/inventory', {
    headers: {
      'x-access-token': token,
    },
  }).then((response) => response.json());

const post = async (body: any): Promise<any> =>
  await fetch('/api/inventory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());

const put = async (body: any): Promise<any> =>
  await fetch('/api/inventory', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());

const deleteOne = async (body: any): Promise<any> =>
  await fetch('/api/inventory', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());

export const InventoryService = {
  getAll,
  post,
  put,
  deleteOne,
};
