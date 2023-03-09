import { Table } from 'react-bootstrap';
import { Company } from '../../models/interfaces/company.interface';

type CompaniesListProps = {
  companies?: Company[];
};

const CompaniesList: React.FC<CompaniesListProps> = ({ companies }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>NIT</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {companies?.map((company, i) => (
          <tr key={company.nit}>
            <td>{i + 1}</td>
            <td>{company.nit}</td>
            <td>{company.name}</td>
            <td>{company.address}</td>
            <td>{company.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CompaniesList;
