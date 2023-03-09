import { Company } from '../../models/interfaces/company.interface';

const getAll = async (token: string): Promise<Company[]> =>
  await fetch('/api/companies', {
    headers: {
      'x-access-token': token,
    },
  }).then((response) => response.json());

const post = async (body: any): Promise<any> =>
  await fetch('/api/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());

const put = async (body: any): Promise<any> =>
  await fetch('/api/companies', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());

const deleteOne = async (body: any): Promise<any> =>
  await fetch('/api/companies', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());

export const CompanyService = {
  getAll,
  post,
  put,
  deleteOne,
};
