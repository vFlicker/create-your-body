import styled from '@emotion/styled';
import { JSX } from 'react';

import { useBmiStore } from '~/entities/bmi';
import { CardSelect } from '~/shared/ui/molecules/CardSelect';

import { chooseGoalRadios } from '../chooseGoalConfig';

export function ChooseGoalForm(): JSX.Element {
  const { form, setForm } = useBmiStore();

  return (
    <StyledChooseActivityFormWrapper>
      {chooseGoalRadios.map(({ value, badge, title }) => (
        <CardSelect
          key={badge}
          type="radio"
          name="goal"
          title={title}
          badge={badge}
          checked={value === form.goal}
          onChange={() => setForm({ ...form, goal: value })}
        />
      ))}
    </StyledChooseActivityFormWrapper>
  );
}

const StyledChooseActivityFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
