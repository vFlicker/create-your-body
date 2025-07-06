import styled from '@emotion/styled';
import { JSX } from 'react';

import exampleImageSrc from '~/shared/assets/img/example.jpeg';

const DIMENSION_LIST = ['Груди', 'Талии', 'Живота', 'Бедер', 'Ноги'];

export function MeasurementOverview(): JSX.Element {
  return (
    <StyledHeaderContent>
      <StyledPhoto src={exampleImageSrc} />
      <StyledHeaderTextWrapper>
        <div>Измеряем по самым выпирающим точкам обхват:</div>
        <StyledDimensionList>
          {DIMENSION_LIST.map((dimensionItem) => (
            <StyledDimensionItem key={dimensionItem}>
              {dimensionItem}
            </StyledDimensionItem>
          ))}
        </StyledDimensionList>
      </StyledHeaderTextWrapper>
    </StyledHeaderContent>
  );
}

const StyledHeaderContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px;
  gap: 16px;

  align-items: center;
`;

const StyledPhoto = styled.img`
  width: 100%;
  border-radius: 14px;
`;

const StyledHeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  font-size: 14px;
  color: #0d0d0d;
`;

const StyledDimensionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledDimensionItem = styled.li`
  position: relative;
  padding-left: 16px;

  &::before {
    content: '';

    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: #a799ff;
  }
`;
