import { Toast, ToastContainer } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';

type AppToastProps = {
  show: boolean;
  message: string;
  variant: string;
  title?: string;
  onDismiss: () => void;
};

const AppToast: React.FC<AppToastProps> = ({
  show,
  message,
  variant,
  title,
  onDismiss,
}) => {
  const dispatch = useAppDispatch();

  return (
    <ToastContainer className="p-3" position={'bottom-end'}>
      <Toast show={show} onClose={onDismiss} bg={variant}>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AppToast;
