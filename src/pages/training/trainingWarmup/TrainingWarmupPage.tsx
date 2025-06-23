import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import { useUser } from '~/entities/user';
import musclesIconSrc from '~/shared/assets/svg/musclesBlack.svg';
import { Toggler } from '~/shared/ui/Toggler';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

import { mft, warmup } from './trainingWarmupConfig';
import { TrainingWarmupScreen } from './TrainingWarmupScreen.js';

const section = {
  Разминка: (
    <TrainingWarmupScreen buttonText="Завершить разминку" videos={warmup} />
  ),
  МФР: <TrainingWarmupScreen buttonText="Завершить МФР" videos={mft} />,
};

export function TrainingWarmupPage(): JSX.Element {
  const [activeValue, setActiveValue] = useState('Разминка');

  const { user, isUserPending } = useUser();

  if (!user || isUserPending) {
    return (
      <CommonPageLayout
        title="Разминка / МФР"
        iconSrc={musclesIconSrc}
        isLoading
      />
    );
  }

  const hasProPlan = user.subscriptions.some(
    ({ plan }) => plan.toLowerCase() === 'pro',
  );

  return (
    <CommonPageLayout title="Разминка / МФР" iconSrc={musclesIconSrc}>
      <StyledTrainingWarmupPageWrapper>
        {hasProPlan && (
          <Toggler
            values={['Разминка', 'МФР']}
            activeValue={activeValue}
            onClick={setActiveValue}
          />
        )}

        {section[activeValue as keyof typeof section]}
      </StyledTrainingWarmupPageWrapper>
    </CommonPageLayout>
  );
}

const StyledTrainingWarmupPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
