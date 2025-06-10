import styled from '@emotion/styled';
import { JSX } from 'react';

type NutritionItemProps = {
  label: string;
  value?: string | number;
};

export function NutritionItem({
  label,
  value,
}: NutritionItemProps): JSX.Element {
  if (!value) return null;

  return (
    <StyledNutritionItem>
      <div>{label}</div>
      <StyledValue>{value.toString()}</StyledValue>
    </StyledNutritionItem>
  );
}

const StyledNutritionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #f2f2f2;

  &:last-child {
    border-bottom: none;
  }
`;

const StyledValue = styled.div`
  font-weight: 500;
`;
