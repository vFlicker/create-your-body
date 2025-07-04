import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useTrainingWeeks } from '~/entities/training';
import { useStreamStore } from '~/entities/user';
import mockupImageSrc from '~/shared/assets/img/mockup.jpeg';
import musclesIconSrc from '~/shared/assets/svg/musclesBlack.svg';
import { AppRoute } from '~/shared/router';
import { TitleCard } from '~/shared/ui/molecules/TitleCard';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

import { pageTitle } from './trainingPlaceConfig';
import { TrainingPlace } from './trainingPlaceTypes';

export function TrainingPlaceWeeksPage(): JSX.Element {
  const navigate = useNavigate();
  const { type } = useParams<{ type: TrainingPlace }>();

  const { stream } = useStreamStore();
  const { trainingWeeks, isTrainingWeeksPending } = useTrainingWeeks(stream!);

  const handleWeekSelect = (week: number) => {
    navigate(`${AppRoute.TrainingPlace}/${type}/${week}`);
  };

  const filteredTrainingWeeks = trainingWeeks?.filter(
    (training) => training.type === type,
  );

  return (
    <CommonPageLayout
      title={pageTitle[type!]}
      iconSrc={musclesIconSrc}
      isLoading={isTrainingWeeksPending}
    >
      <StyledWeeksList>
        {filteredTrainingWeeks?.map(({ cover, week }) => (
          <TitleCard
            key={week}
            title={`Неделя ${week}`}
            subTitle={`Тренировок ${filteredTrainingWeeks.length}`}
            iconSrc={cover?.url || mockupImageSrc}
            isFullWidthImage={true}
            onClick={() => handleWeekSelect(week)}
          />
        ))}
      </StyledWeeksList>
    </CommonPageLayout>
  );
}

const StyledWeeksList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;
