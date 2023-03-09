import styled from '@emotion/styled';

export const LoginContainer = styled.div(() => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const LoginForm = styled.div(() => ({
  padding: '20px',
  width: '40vw',
  maxWidth: '500px',
  minWidth: '250px',
  borderRadius: '10px',
  boxShadow: '-2px 3px 10px rgba(0, 0, 0, 0.25)',
}));
