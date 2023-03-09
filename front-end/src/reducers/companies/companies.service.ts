import { Company } from '../../models/interfaces/company.interface';

const getAll = async (token: string): Promise<Company[]> =>
  await fetch('/api/companies', {
    headers: {
      'x-access-token': token,
    },
  }).then((response) => response.json());

export const CompanyService = {
  getAll,
};
