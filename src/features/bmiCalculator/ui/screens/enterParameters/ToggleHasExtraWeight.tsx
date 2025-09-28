import styled from '@emotion/styled';
import { JSX } from 'react';

import { ToggleCheckbox } from '~/shared/ui/molecules/checkboxes/ToggleCheckbox';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';

export function ToggleHasExtraWeight(): JSX.Element {
  const { form, setForm } = useBmiCalculatorStore();
  const { hasExtraWeight } = form;

  return (
    <StyledCheckboxWrapper active={hasExtraWeight}>
      <ToggleCheckbox
        label="Нет лишнего веса, хочу улучшать то, что есть"
        checked={!hasExtraWeight}
        onChange={() => setForm({ ...form, hasExtraWeight: !hasExtraWeight })}
      />
      <StyledDescription>
        БЖУ будут рассчитаны от полной массы тела, а не от сухой массы
      </StyledDescription>
    </StyledCheckboxWrapper>
  );
}

const StyledCheckboxWrapper = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  padding: 12px;
  border-radius: 10px;

  color: ${({ active }) => (active ? '#403c77' : 'rgba(64, 60, 119, 0.6)')};

  background-color: ${({ active }) => (active ? '#f2f1f7' : '#F2F2F2')};
`;

const StyledDescription = styled.p`
  padding-left: 62px;

  font-size: 12px;
  font-weight: 500;
  line-height: 130%;
`;
