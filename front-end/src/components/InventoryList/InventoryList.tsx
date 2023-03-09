import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Inventory } from '../../models/interfaces/inventory.interface';
import { selectIsAdmin } from '../../reducers/user/user.selectors';
import AppButton from '../Button/Button';
import { ActionsTd } from '../CompaniesList/CompaniesList.styled';

type InventoryListProps = {
  articles?: Inventory[];
  handleUpdate: (company: Inventory) => void;
  handleDelete: (company: Inventory) => void;
};

const InventoryList: React.FC<InventoryListProps> = ({
  articles,
  handleUpdate,
  handleDelete,
}) => {
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Company NIT</th>
          <th>Name</th>
          <th>Quantity</th>
          {isAdmin && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {articles?.map((item, i) => (
          <tr key={`${item.companyId}-${item.articleName}`}>
            <td>{i + 1}</td>
            <td>{item.companyId}</td>
            <td>{item.articleName}</td>
            <td>{item.quantity}</td>
            {isAdmin && (
              <ActionsTd>
                <AppButton variant="info" onClick={() => handleUpdate(item)}>
                  Update
                </AppButton>
                <AppButton variant="danger" onClick={() => handleDelete(item)}>
                  Delete
                </AppButton>
              </ActionsTd>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InventoryList;
