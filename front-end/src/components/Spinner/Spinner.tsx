import { Spinner } from 'react-bootstrap';
import { SpinnerContainer } from './Spinner.styled';

type AppSpinnerProps = {
  marginTop?: string;
};

const AppSpinner: React.FC<AppSpinnerProps> = ({ marginTop }) => {
  return (
    <SpinnerContainer marginTop={marginTop}>
      <Spinner variant="primary" animation="border" />
    </SpinnerContainer>
  );
};

export default AppSpinner;
