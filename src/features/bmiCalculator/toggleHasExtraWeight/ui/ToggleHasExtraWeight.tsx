import styled from '@emotion/styled';
import { JSX } from 'react';

import { useBmiStore } from '~/entities/bmi/model/bmiStore';
import { ToggleCheckbox } from '~/shared/ui/molecules/checkboxes/ToggleCheckbox';

export function ToggleHasExtraWeight(): JSX.Element {
  const { form, setForm } = useBmiStore();
  const { hasExtraWeight } = form;

  return (
    <StyledCheckboxWrapper>
      <ToggleCheckbox
        label="Нет лишнего веса, хочу улучшать то, что есть"
        checked={hasExtraWeight}
        onChange={() => setForm({ ...form, hasExtraWeight: !hasExtraWeight })}
      />
      <StyledDescription>
        БЖУ будут рассчитаны от полной массы тела, а не от сухой массы
      </StyledDescription>
    </StyledCheckboxWrapper>
  );
}

const StyledCheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  padding: 12px;
  border-radius: 10px;

  background-color: #f2f1f7;
`;

const StyledDescription = styled.p`
  padding-left: 62px;

  color: #403c77;
  font-size: 12px;
  font-weight: 500;
  line-height: 130%;
`;
