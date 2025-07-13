import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useTrainingsByWeek } from '~/entities/training';
import { useStreamStore, useUser } from '~/entities/user';
import mockupImageSrc from '~/shared/assets/img/mockup.jpeg';
import checkImageSrc from '~/shared/assets/svg/check.svg';
import musclesIconSrc from '~/shared/assets/svg/musclesBlack.svg';
import { AppRoute } from '~/shared/router';
import { TitleCard } from '~/shared/ui/molecules/TitleCard';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

import { pageTitle } from './trainingPlaceConfig';
import { TrainingPlace } from './trainingPlaceTypes';

export function TrainingPlaceWeekPage(): JSX.Element {
  const navigate = useNavigate();
  const { type, week } = useParams<{ type: TrainingPlace; week: string }>();

  const { user } = useUser();
  const { stream } = useStreamStore();

  const { trainingsByWeek, isTrainingsByWeekPending } = useTrainingsByWeek({
    // TODO: fix the payload
    level: user?.level === 'Новичок' ? 'noob' : 'pro',
    stream: stream!,
    type: type!,
    week: +week!,
  });

  const handleLessonSelect = (id: string) => {
    navigate(`${AppRoute.TrainingPlace}/${type}/${week}/${id}`);
  };

  return (
    <CommonPageLayout
      title={pageTitle[type!]}
      iconSrc={musclesIconSrc}
      isLoading={isTrainingsByWeekPending}
    >
      <StyledWeeksList>
        {trainingsByWeek?.map(
          ({ _id, title, coverImage, exerciseCount, done }) => (
            <StyledTitleCard
              isComplied={done}
              key={_id}
              title={title}
              // TODO: add at the backend
              subTitle={`Упражнений ${exerciseCount}`}
              iconSrc={coverImage.url || mockupImageSrc}
              isFullWidthImage={true}
              onClick={() => handleLessonSelect(_id)}
            />
          ),
        )}
      </StyledWeeksList>
    </CommonPageLayout>
  );
}

const StyledWeeksList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const backgroundImage = `url("${checkImageSrc}")`;
const StyledTitleCard = styled(TitleCard)<{ isComplied: boolean }>`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 16px;
    right: 16px;

    display: ${({ isComplied }) => (isComplied ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;

    width: 24px;
    height: 24px;
    border-radius: 50%;

    background-color: #cbff52;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: center;

    background-image: ${backgroundImage};
  }
`;
