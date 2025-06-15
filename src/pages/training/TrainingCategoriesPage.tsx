import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { SelectStream } from '~/features/SelectStream';
import musclesIconSrc from '~/shared/assets/svg/musclesBlack.svg';
import backIconSrc from '~/shared/assets/train/back.svg';
import dumbbellsIconSrc from '~/shared/assets/train/dumbbells.svg';
import questionIconSrc from '~/shared/assets/train/question.svg';
import sportIconSrc from '~/shared/assets/train/sport.svg';
import { AppRoute } from '~/shared/router';
import { TitleCard } from '~/shared/ui/TitleCard';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

const trainingCategories = [
  {
    title: 'Разминка / МФР',
    iconSrc: backIconSrc,
    to: AppRoute.TrainingWarmup,
  },
  {
    title: 'Все о тренировках',
    iconSrc: questionIconSrc,
    to: AppRoute.TrainingAbout,
  },
  {
    title: 'Тренировка для дома',
    iconSrc: sportIconSrc,
    to: `${AppRoute.TrainingPlace}/home`,
  },
  {
    title: 'Тренировка для зала',
    iconSrc: dumbbellsIconSrc,
    to: `${AppRoute.TrainingPlace}/gym`,
  },
];

export function TrainingCategoriesPage(): JSX.Element {
  const navigate = useNavigate();

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  return (
    <CommonPageLayout
      title="Тренировки"
      hasStreamInfo={true}
      iconSrc={musclesIconSrc}
      action={<SelectStream />}
      isLoading={false}
    >
      <StyledTrainingList>
        {trainingCategories?.map(({ title, to, iconSrc }) => (
          <TitleCard
            key={title}
            title={title}
            iconSrc={iconSrc}
            onClick={() => handleCategoryClick(to)}
          />
        ))}
      </StyledTrainingList>
    </CommonPageLayout>
  );
}

const StyledTrainingList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;
