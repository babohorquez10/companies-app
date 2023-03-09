import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import {
  postInventory,
  updateInventory,
} from '../../reducers/inventory/inventory.actions';
import { selectSubmittingInventory } from '../../reducers/inventory/inventory.selectors';
import { selectToken } from '../../reducers/user/user.selectors';
import AppButton from '../Button/Button';

type CreateInventoryFormProps = {
  action: string;
  companyId?: string;
  articleName?: string;
  quantity?: number;
};

const CreateInventoryForm: React.FC<CreateInventoryFormProps> = (props) => {
  const dispatch = useAppDispatch();

  const { action } = props;
  const token = useSelector(selectToken);
  const submittingInventory = useSelector(selectSubmittingInventory);

  const [validated, setValidated] = useState(false);
  const [companyId, setCompanyId] = useState(props.companyId || '');
  const oldArticleName = props.articleName || '';
  const [articleName, setArticleName] = useState(props.articleName || '');
  const [quantity, setQuantity] = useState(props.quantity || '');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      if (action === 'CREATE') {
        dispatch(
          postInventory({
            companyId,
            articleName,
            quantity,
            token,
          })
        );
      } else if (action === 'UPDATE') {
        dispatch(
          updateInventory({
            companyId,
            articleName: oldArticleName,
            token,
            update: {
              companyId,
              articleName,
              quantity,
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
        <Form.Label>Company NIT</Form.Label>
        <Form.Control
          type="text"
          placeholder="NIT"
          disabled={action === 'UPDATE'}
          value={companyId}
          onChange={(ev) => setCompanyId(ev.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Article Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={articleName}
          onChange={(ev) => setArticleName(ev.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(ev) => setQuantity(ev.target.value)}
          required
        />
      </Form.Group>
      <AppButton type="submit" loading={submittingInventory}>
        {`${action.charAt(0).toUpperCase()}${action
          .slice(1)
          .toLocaleLowerCase()}`}
      </AppButton>
    </Form>
  );
};

export default CreateInventoryForm;
