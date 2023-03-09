import { Modal } from 'react-bootstrap';
import { Company } from '../../models/interfaces/company.interface';
import CreateCompanyForm from './CreateCompanyForm';

type CreateCompanyModalProps = {
  show: boolean;
  action: string;
  handleClose: () => void;
  company?: Company;
};

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  show,
  action,
  handleClose,
  company,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateCompanyForm
          action={action}
          nit={company?.nit}
          address={company?.address}
          phone={company?.phone}
          name={company?.name}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CreateCompanyModal;
