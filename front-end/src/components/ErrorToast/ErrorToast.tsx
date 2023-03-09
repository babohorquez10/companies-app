import { Toast, ToastContainer } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { setError } from '../../reducers/user/user.actions';

type ErrorToastProps = {
  show: boolean;
  error: string;
};

const ErrorToast: React.FC<ErrorToastProps> = ({ show, error }) => {
  const dispatch = useAppDispatch();
  const dismiss = () => {
    dispatch(setError(''));
  };

  return (
    <ToastContainer className="p-3" position={'bottom-end'}>
      <Toast show={show} onClose={dismiss} bg={'danger'}>
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ErrorToast;
