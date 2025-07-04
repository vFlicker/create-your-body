import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { JSX } from 'react';

import { Color } from '../../theme/colors';

type TitleCardProps = {
  className?: string;
  title: string;
  iconSrc: string;
  subTitle?: string;
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
  iconSrc,
  subTitle,
  labelText,
  labelIconSrc,
  isHighlight = false,
  isFullWidthImage = false,
  disabled = false,
  onClick,
}: TitleCardProps): JSX.Element {
  const handleClick = () => {
    if (!disabled) onClick();
  };

  return (
    <StyledTitleCardWrapper
      className={className}
      disabled={disabled}
      isHighlight={isHighlight}
      onClick={handleClick}
    >
      <StyledHeader>
        <StyledImage src={iconSrc} alt={title} isFullWith={isFullWidthImage} />
        <StyledTitle>{title}</StyledTitle>
        {subTitle && <StyledSubTitle>{subTitle}</StyledSubTitle>}
      </StyledHeader>

      {labelText && (
        <StyledLabel>
          {labelIconSrc && <StyledLabelIcon src={labelIconSrc} />}
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

  min-height: 110px;
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

const ImageCss = {
  'full-width': css`
    width: 100%;
    height: 100%;
    aspect-ratio: 4 / 3;
    object-fit: 'contain';
    background-color: ${Color.Black_50};
  `,
  default: css`
    width: 24px;
    height: 24px;
  `,
};

const StyledImage = styled.img<{ isFullWith: boolean }>`
  ${({ isFullWith }) =>
    isFullWith ? ImageCss['full-width'] : ImageCss.default};
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
