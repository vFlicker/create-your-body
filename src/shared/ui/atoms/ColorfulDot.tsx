import styled from '@emotion/styled';

const StyledColorfulDot = styled.div<{ circleColor: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;

  background-color: ${({ circleColor }) => circleColor};
`;

export { StyledColorfulDot as ColorfulDot };
