import { Modal } from 'react-bootstrap';
import { Company } from '../../models/interfaces/company.interface';
import { Inventory } from '../../models/interfaces/inventory.interface';
import AppButton from '../Button/Button';

type DeleteModalProps = {
  show: boolean;
  handleClose: () => void;
  itemName?: string;
  handleDelete: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  handleClose,
  itemName,
  handleDelete,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete "{itemName}"?</p>
        <AppButton variant="danger" onClick={handleDelete}>
          Delete
        </AppButton>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
