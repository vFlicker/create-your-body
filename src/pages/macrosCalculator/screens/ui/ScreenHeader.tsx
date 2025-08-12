import styled from '@emotion/styled';
import { JSX } from 'react';

type HeaderProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  element?: JSX.Element;
};

export function ScreenHeader({
  className,
  title,
  subtitle,
  element,
}: HeaderProps): JSX.Element {
  return (
    <StyledScreenHeader className={className}>
      {title && <StyledTitle>{title}</StyledTitle>}
      {subtitle && <StyledSubTitle>{subtitle}</StyledSubTitle>}
      {element}
    </StyledScreenHeader>
  );
}

const StyledScreenHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 14px 24px;
  gap: 8px;
`;

const StyledTitle = styled.div`
  color: #0d0d0d;
  font-size: 22px;
  font-weight: 700;
  line-height: 130%;
  letter-spacing: -0.11px;
`;

const StyledSubTitle = styled.div`
  display: inline-flex;

  padding: 6px 10px;
  border-radius: 50px;

  color: #7a66ff;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;

  background-color: rgba(122, 102, 255, 0.1);
  backdrop-filter: blur(10px);
`;
