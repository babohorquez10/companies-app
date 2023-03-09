import { Company } from '../../models/interfaces/company.interface';

const getAll = async (): Promise<Company[]> =>
  await fetch('/api/companies').then((response) => response.json());

export const CompanyService = {
  getAll,
};
