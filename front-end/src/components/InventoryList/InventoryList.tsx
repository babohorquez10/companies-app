import { Table } from 'react-bootstrap';
import { Inventory } from '../../models/interfaces/inventory.interface';

type InventoryListProps = {
  articles?: Inventory[];
};

const InventoryList: React.FC<InventoryListProps> = ({ articles }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Company NIT</th>
          <th>Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {articles?.map((item, i) => (
          <tr key={`${item.companyId}-${item.articleName}`}>
            <td>{i + 1}</td>
            <td>{item.companyId}</td>
            <td>{item.articleName}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InventoryList;
