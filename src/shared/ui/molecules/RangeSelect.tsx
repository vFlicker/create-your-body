import styled from '@emotion/styled';
import { ChangeEvent, JSX } from 'react';

import { Color } from '~/shared/theme/colors';

type Label = {
  value: number;
  text: string;
  description?: string;
};

type RangeSelectProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  labels: Label[];
  onChange: (value: number) => void;
};

export function RangeSelect({
  min,
  max,
  step,
  value,
  labels,
  onChange,
}: RangeSelectProps): JSX.Element {
  const handleValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onChange(+evt.target.value);
  };

  return (
    <StyledRangeWrapper>
      <StyledInputWrapper>
        <StyledInput
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleValueChange}
        />
      </StyledInputWrapper>
      <StyledLabelsWrapper>
        {labels.map(({ text, value: labelValue, description }) => {
          const position = ((labelValue - min) / (max - min)) * 100;

          return (
            <StyledLabel key={labelValue} style={{ left: `${position}%` }}>
              <StyledLabelValue>{text}</StyledLabelValue>
              <StyledLabelDescription>{description}</StyledLabelDescription>
            </StyledLabel>
          );
        })}
      </StyledLabelsWrapper>
    </StyledRangeWrapper>
  );
}

const StyledRangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledInputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 8px;

  margin: 0;
  padding: 0;
  border-radius: 5px;

  outline: none;
  background-color: #e9e9f0;

  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    position: relative;

    width: 24px;
    height: 24px;

    background-color: #7a66ff;
    border: 3px solid ${Color.White};
    border-radius: 50%;
    box-shadow: 0 0 0px 4px rgba(255, 255, 255, 1);

    -webkit-appearance: none;
    appearance: none;

    z-index: 2;
  }

  &::-moz-range-thumb {
    position: relative;

    width: 24px;
    height: 24px;

    background-color: #7a66ff;
    border: 3px solid ${Color.White};
    border-radius: 50%;
    box-shadow: 0 0 0px 4px rgba(255, 255, 255, 1);

    -webkit-appearance: none;
    appearance: none;

    z-index: 2;
  }
`;

const StyledLabelsWrapper = styled.div`
  position: relative;
  height: 26px;
`;

const StyledLabel = styled.div`
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  transform: translateX(-50%);

  &:before {
    content: '';

    position: absolute;
    top: -23px;

    width: 2px;
    height: 10px;
    border-radius: 50px;
    box-shadow: 0 0 0px 3px rgba(255, 255, 255, 1);

    background-color: #c7c7cc;

    z-index: 2;
  }

  &:first-child {
    transform: translateX(0);

    &:before {
      left: 0;
    }
  }

  &:last-child {
    transform: translateX(-100%);

    &:before {
      right: 0;
    }
  }
`;

const StyledLabelValue = styled.span`
  color: #8f8db2;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
`;

const StyledLabelDescription = styled.span`
  color: #8f8db2;
  font-size: 9px;
  font-weight: 500;
  line-height: 12px;
`;
