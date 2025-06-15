import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useTrainingsByWeek } from '~/entities/training';
import { useStreamStore, useUser } from '~/entities/user';
import mockupImageSrc from '~/shared/assets/img/mockup.jpeg';
import musclesIconSrc from '~/shared/assets/svg/musclesBlack.svg';
import { AppRoute } from '~/shared/router';
import { TitleCard } from '~/shared/ui/TitleCard';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

import { pageTitle } from './trainingPlaceConfig';
import { TrainingPlace } from './trainingPlaceTypes';

export function TrainingPlaceWeekPage(): JSX.Element {
  const navigate = useNavigate();
  const { type, week } = useParams<{ type: TrainingPlace; week: string }>();

  const { user } = useUser();
  const { stream } = useStreamStore();

  const { trainingsByWeek, isTrainingsByWeekPending } = useTrainingsByWeek({
    // TODO: fix the payload
    level: user.user_level === 'Новичок' ? 'noob' : 'pro',
    stream,
    type,
    week: +week,
  });

  const handleLessonSelect = (id: string) => {
    navigate(`${AppRoute.TrainingPlace}/${type}/${week}/${id}`);
  };

  return (
    <CommonPageLayout
      title={pageTitle[type]}
      iconSrc={musclesIconSrc}
      isLoading={isTrainingsByWeekPending}
    >
      <StyledWeeksList>
        {trainingsByWeek?.map(({ _id, week, title, coverImage }) => (
          <TitleCard
            key={_id}
            title={title}
            // TODO: add at the backend
            subTitle={`Упражнений НОМЕР`}
            iconSrc={coverImage.url || mockupImageSrc}
            isFullWidthImage={true}
            onClick={() => handleLessonSelect(_id)}
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
