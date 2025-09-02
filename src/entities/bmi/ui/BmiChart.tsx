import styled from '@emotion/styled';
import { JSX } from 'react';

export function BmiChart(): JSX.Element {
  return <StyledChart />;
}

const StyledChart = styled.div`
  width: 92px;
  height: 92px;

  border-radius: 50%;

  background-color: blue;
`;
