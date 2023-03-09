import styled from '@emotion/styled';

export const SpinnerContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'marginTop',
})<{ marginTop?: string }>(({ marginTop }) => ({
  display: 'flex',
  marginTop: marginTop || '0',
  justifyContent: 'center',
  alignItems: 'center',
}));
