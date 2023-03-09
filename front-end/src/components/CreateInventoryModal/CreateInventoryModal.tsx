import { Modal } from 'react-bootstrap';
import { Inventory } from '../../models/interfaces/inventory.interface';
import CreateInventoryForm from './CreateInventoryForm';

type CreateInventoryModalProps = {
  show: boolean;
  action: string;
  handleClose: () => void;
  inventory?: Inventory;
};

const CreateInventoryModal: React.FC<CreateInventoryModalProps> = ({
  show,
  action,
  handleClose,
  inventory,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateInventoryForm
          action={action}
          companyId={inventory?.companyId}
          articleName={inventory?.articleName}
          quantity={inventory?.quantity}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CreateInventoryModal;
