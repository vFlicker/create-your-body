import styled from '@emotion/styled';
import { ComponentProps, JSX } from 'react';

type CardSelectProps = ComponentProps<typeof StyledInput> & {
  type: 'radio' | 'checkbox';
  title: string;
  badge: string;
  checked: boolean;
  subtitle?: string;
};

export function CardSelect({
  title,
  badge,
  checked,
  subtitle,
  type,
  ...props
}: CardSelectProps): JSX.Element {
  return (
    <StyledLabel checked={checked}>
      <StyledInput type={type} {...props} />
      <StyledSelectMark />
      <StyledContent>
        <StyledTextWrapper>
          <StyledTitle>{title}</StyledTitle>
          {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
        </StyledTextWrapper>
        {badge && <StyledBadge>{badge}</StyledBadge>}
      </StyledContent>
    </StyledLabel>
  );
}

const StyledInput = styled.input`
  position: absolute;

  width: 0;
  height: 0;

  opacity: 0;
`;

const StyledSelectMark = styled.span`
  position: relative;

  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  border-radius: 50%;

  background-color: #d0cfd9;
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTitle = styled.h3`
  color: #403c77;
  font-size: 14px;
  font-weight: 700;
  line-height: 130%;
`;

const StyledSubtitle = styled.p`
  color: #403c77;
  font-size: 11px;
  font-weight: 500;
  line-height: 140%;
`;

const StyledBadge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 6px 10px;
  border-radius: 50px;

  color: #7a66ff;
  font-size: 13px;
  font-weight: 700;
  line-height: 14px;

  background-color: #e6e3f8;
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-grow: 1;
`;

const StyledLabel = styled.label<{ checked: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  padding: 12px 12px 14px 12px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ checked }) => (checked ? '#7A66FF' : '#E6E6E6')};
  border-radius: 10px;

  background-color: ${(checked) => (checked ? '#F2F1F7' : 'red')};

  ${StyledSelectMark} {
    border: ${({ checked }) => (checked ? '6px solid #7a66ff' : 'none')};
    background-color: ${({ checked }) => (checked ? '#ffffff' : '#d0cfd9')};
  }

  ${StyledBadge} {
    color: ${({ checked }) => (checked ? '#ffffff' : '#7A66FF')};
    background-color: ${({ checked }) => (checked ? '#7A66FF' : '#E6E3F8')};
  }
`;
