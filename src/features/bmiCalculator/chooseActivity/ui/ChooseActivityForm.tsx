import styled from '@emotion/styled';
import { JSX } from 'react';

import { useBmiStore } from '~/entities/bmi';
import { CardSelect } from '~/shared/ui/molecules/CardSelect';

import { chooseActivityRadios } from '../chooseActivityConfig';

export function ChooseActivityForm(): JSX.Element {
  const { form, setForm } = useBmiStore();

  return (
    <StyledChooseActivityFormWrapper>
      {chooseActivityRadios.map(({ badge, subtitle, title }) => (
        <CardSelect
          key={badge}
          type="radio"
          name="activity"
          title={title}
          subtitle={subtitle}
          badge={badge.toString()}
          checked={badge === form.activityCoefficient}
          onChange={() => setForm({ ...form, activityCoefficient: badge })}
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
