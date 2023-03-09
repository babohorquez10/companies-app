import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import {
  postCompany,
  updateCompany,
} from '../../reducers/companies/companies.actions';
import { selectSubmittingCompany } from '../../reducers/companies/companies.selectors';
import { selectToken } from '../../reducers/user/user.selectors';
import AppButton from '../Button/Button';

type CreateCompanyFormProps = {
  action: string;
  nit?: string;
  name?: string;
  address?: string;
  phone?: string;
};

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = (props) => {
  const dispatch = useAppDispatch();

  const { action } = props;
  const token = useSelector(selectToken);
  const submittingCompany = useSelector(selectSubmittingCompany);

  const [validated, setValidated] = useState(false);
  const [nit, setNit] = useState(props.nit || '');
  const [name, setName] = useState(props.name || '');
  const [address, setAddress] = useState(props.address || '');
  const [phone, setPhone] = useState(props.phone || '');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      if (action === 'CREATE') {
        dispatch(
          postCompany({
            nit,
            name,
            address,
            phone,
            token,
          })
        );
      } else if (action === 'UPDATE') {
        dispatch(
          updateCompany({
            nit,
            token,
            update: {
              nit,
              name,
              address,
              phone,
            },
          })
        );
      }
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>NIT</Form.Label>
        <Form.Control
          type="text"
          placeholder="NIT"
          disabled={action === 'UPDATE'}
          value={nit}
          onChange={(ev) => setNit(ev.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
          required
        />
      </Form.Group>
      <AppButton type="submit" loading={submittingCompany}>
        {`${action.charAt(0).toUpperCase()}${action
          .slice(1)
          .toLocaleLowerCase()}`}
      </AppButton>
    </Form>
  );
};

export default CreateCompanyForm;
