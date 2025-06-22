import styled from '@emotion/styled';
import { JSX } from 'react';

import { Color } from '../theme/colors';

type TitleCardProps = {
  className?: string;
  title: string;
  subTitle?: string;
  iconSrc: string;
  isHighlight?: boolean;
  isFullWidthImage?: boolean;
  disabled?: boolean;
  labelText?: string;
  labelIconSrc?: string;
  onClick: () => void;
};

type StyledTitleCardWrapperProps = Pick<
  TitleCardProps,
  'disabled' | 'isHighlight'
>;

export function TitleCard({
  className,
  title,
  subTitle,
  iconSrc,
  labelText,
  labelIconSrc,
  isHighlight,
  isFullWidthImage = false,
  disabled,
  onClick,
}: TitleCardProps): JSX.Element {
  return (
    <StyledTitleCardWrapper
      className={className}
      disabled={disabled}
      isHighlight={isHighlight}
      onClick={onClick}
    >
      <StyledHeader>
        <StyledImage src={iconSrc} alt={title} isFullWith={isFullWidthImage} />
        <StyledTitle>{title}</StyledTitle>
        {subTitle && <StyledSubTitle>{subTitle}</StyledSubTitle>}
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
  border-color: ${({ isHighlight }) =>
    isHighlight ? Color.Violet_100 : Color.Black_100};

  background-color: ${({ isHighlight }) =>
    isHighlight ? Color.Violet_100 : '#fafafa'};

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  cursor: pointer;
`;

const StyledImage = styled.img<{ isFullWith: boolean }>`
  width: ${({ isFullWith }) => (isFullWith ? '100%;' : '24px;')};
  height: ${({ isFullWith }) => (isFullWith ? '100%;' : '24px;')};
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

const StyledSubTitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #999999;
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
