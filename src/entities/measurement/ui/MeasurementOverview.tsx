import styled from '@emotion/styled';
import { JSX } from 'react';

import exampleImageSrc from '~/shared/assets/img/example.jpeg';

const DIMENSION_LIST = ['Груди', 'Талии', 'Живота', 'Бёдер', 'Ноги'];

export function MeasurementOverview(): JSX.Element {
  return (
    <StyledMeasurementOverviewWrapper>
      <StyledTitle>Как правильно измерить параметры?</StyledTitle>
      <StyledHeaderContent>
        <StyledPhoto src={exampleImageSrc} />
        <StyledHeaderTextWrapper>
          <StyledText>
            Измеряем <span> по самым выпирающим точкам </span>обхват:
          </StyledText>
          <StyledDimensionList>
            {DIMENSION_LIST.map((dimensionItem) => (
              <StyledDimensionItem key={dimensionItem}>
                {dimensionItem}
              </StyledDimensionItem>
            ))}
          </StyledDimensionList>
        </StyledHeaderTextWrapper>
      </StyledHeaderContent>
    </StyledMeasurementOverviewWrapper>
  );
}

const StyledMeasurementOverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledTitle = styled.h2`
  color: #0d0d0d;

  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledHeaderContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 130px;
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

const StyledText = styled.p`
  color: #0d0d0d;
  font-size: 14px;
  line-height: 120%;

  span {
    font-weight: 600;
  }
`;

const StyledDimensionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledDimensionItem = styled.li`
  position: relative;
  padding-left: 16px;

  color: #0d0d0d;
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;

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
