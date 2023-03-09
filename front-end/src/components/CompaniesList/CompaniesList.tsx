import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Company } from '../../models/interfaces/company.interface';
import { selectIsAdmin } from '../../reducers/user/user.selectors';
import AppButton from '../Button/Button';
import { ActionsTd } from './CompaniesList.styled';

type CompaniesListProps = {
  companies?: Company[];
  handleUpdate: (company: Company) => void;
  handleDelete: (company: Company) => void;
};

const CompaniesList: React.FC<CompaniesListProps> = ({
  companies,
  handleUpdate,
  handleDelete,
}) => {
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>NIT</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            {isAdmin && <th>Actions</th>}
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
              {isAdmin && (
                <ActionsTd>
                  <AppButton
                    variant="info"
                    onClick={() => handleUpdate(company)}
                  >
                    Update
                  </AppButton>
                  <AppButton
                    variant="danger"
                    onClick={() => handleDelete(company)}
                  >
                    Delete
                  </AppButton>
                </ActionsTd>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CompaniesList;
