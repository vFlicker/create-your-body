import styled from '@emotion/styled';
import { JSX } from 'react';

import { Color } from '../theme/colors';

type TitleCardProps = {
  title: string;
  iconSrc: string;
  highlighted?: boolean;
  disabled?: boolean;
  labelText?: string;
  labelIconSrc?: string;
  onClick: () => void;
};

type StyledTitleCardWrapperProps = Pick<
  TitleCardProps,
  'disabled' | 'highlighted'
>;

export function TitleCard({
  title,
  iconSrc,
  labelText,
  labelIconSrc,
  highlighted,
  disabled,
  onClick,
}: TitleCardProps): JSX.Element {
  return (
    <StyledTitleCardWrapper
      disabled={disabled}
      highlighted={highlighted}
      onClick={onClick}
    >
      <StyledHeader>
        <StyledImage src={iconSrc} alt={title} />
        <StyledTitle>{title}</StyledTitle>
      </StyledHeader>

      {labelText && (
        <StyledLabel>
          <StyledLabelIcon src={labelIconSrc} />
          {labelText}
        </StyledLabel>
      )}
    </StyledTitleCardWrapper>
  );
}

const StyledTitleCardWrapper = styled.div<StyledTitleCardWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 82px;
  padding: 16px;
  border: 1px solid;
  border-radius: 14px;
  border-color: ${({ highlighted }) =>
    highlighted ? Color.Violet_100 : Color.Black_100};

  background-color: ${({ highlighted }) =>
    highlighted ? Color.Violet_100 : '#fafafa'};

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTitle = styled.h2`
  font-weight: 700;
  font-size: 14px;
  color: ${Color.Black_950};
`;

const StyledLabel = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 24px;
  border-radius: 45px;

  color: #f2f2f2;
  font-weight: 600;
  font-size: 10px;

  background-color: #a799ff;
`;

const StyledLabelIcon = styled.img`
  height: 18px;
  width: 18px;
`;
