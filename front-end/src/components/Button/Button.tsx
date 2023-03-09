import { Button, Spinner, ButtonProps } from 'react-bootstrap';
import { PropsWithChildren } from 'react';

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
}

const AppButton: React.FC<AppButtonProps> = (
  props: PropsWithChildren<AppButtonProps>
) => {
  return (
    <Button {...props} disabled={props.loading || props.disabled}>
      {props.loading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        props.children
      )}
    </Button>
  );
};

export default AppButton;
