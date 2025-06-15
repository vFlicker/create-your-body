import styled from '@emotion/styled';
import { JSX } from 'react';

type RadioButtonProps = {
  className?: string;
  label: string;
  names: [string, string];
  activeOption?: string;
  options: [string, string];
  onClick: (option: string) => void;
};

export function RadioButton({
  className,
  label,
  names,
  activeOption,
  options,
  onClick,
}: RadioButtonProps): JSX.Element {
  return (
    <StyledRadioButtonWrapper className={className}>
      <StyledLabel>{label}</StyledLabel>

      <StyledButtonWrapper>
        {options.map((option, index) => (
          <StyledButton
            isActive={activeOption === option}
            onClick={() => onClick(option)}
          >
            {names[index]}
          </StyledButton>
        ))}
      </StyledButtonWrapper>
    </StyledRadioButtonWrapper>
  );
}

const StyledRadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledLabel = styled.div`
  color: #0d0d0d;
  font-size: 12px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 74px;
  height: 46px;
  border-radius: 50px;

  color: ${({ isActive }) => (isActive ? '#f2f2f2' : '#0d0d0d')};
  font-size: 16px;

  background-color: ${({ isActive }) => (isActive ? '#A799FF' : '#f2f2f2')};
`;
