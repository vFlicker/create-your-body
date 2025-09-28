import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { JSX } from 'react';

import { BmiCardStatus } from './bmiCardConfig';
import { BMI_SCALE_CATEGORIES } from './bmiCardConfig';
import { calculateBmiProgress, getBmiCategory } from './bmiCardLib';

type BmiCardProps = {
  bmi: number;
};

export function BmiCard({ bmi }: BmiCardProps): JSX.Element {
  const { status, text } = getBmiCategory(bmi);
  const progress = calculateBmiProgress(bmi);

  return (
    <StyledBmiCardWrapper>
      <StyledCard type={status}>
        <StyledValue>{bmi.toFixed(1)}</StyledValue>
        <StyledText>{text}</StyledText>
      </StyledCard>

      <StyledScaleWrapper>
        <StyledScaleBar>
          <StyledMarker style={{ left: `calc(${progress}%)` }} />
        </StyledScaleBar>
        <StyledScaleLabels>
          {BMI_SCALE_CATEGORIES.map((label) => (
            <StyledScaleLabel key={label}>{label}</StyledScaleLabel>
          ))}
        </StyledScaleLabels>
      </StyledScaleWrapper>
    </StyledBmiCardWrapper>
  );
}

const BmiStatusToCss = {
  [BmiCardStatus.Underweight]: css`
    --color-background: #e5f1ff;
    --color-value: #4199fd;
  `,
  [BmiCardStatus.Normal]: css`
    --color-background: #d6f9d9;
    --color-value: #00b710;
  `,
  [BmiCardStatus.Overweight]: css`
    --color-background: #fdf1e1;
    --color-value: #eb7b42;
  `,
  [BmiCardStatus.Obese]: css`
    --color-background: #fee4e4;
    --color-value: #e74c4c;
  `,
};

const StyledBmiCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`;

const StyledCard = styled.div<{ type: BmiCardStatus }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;

  padding: 26px 12px;
  border-radius: 10px;

  color: var(--color-value);

  background-color: var(--color-background);

  ${({ type }) => BmiStatusToCss[type]}
`;

const StyledValue = styled.span`
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
`;

const StyledText = styled.span`
  font-size: 12px;
  font-weight: 600;
  line-height: 130%;
`;

const StyledScaleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledScaleBar = styled.div`
  position: relative;

  height: 8px;
  border-radius: 30px;

  background-image: linear-gradient(
    90deg,
    #4199fd 0%,
    #23e930 34%,
    #f2e129 64%,
    #e74b4b 100%
  );
`;

const StyledMarker = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  width: 2px;
  height: 10px;
  border-radius: 50px;
  box-shadow: 0 0 0px 3px #ffffff;

  background-color: #0d0d0d;
`;

const StyledScaleLabels = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledScaleLabel = styled.span`
  color: #8f8db2;
  font-size: 9px;
  font-weight: 500;
  line-height: 12px;
`;
