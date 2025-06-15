import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLectureWeeks } from '~/entities/lecture';
import mockupImageSrc from '~/shared/assets/img/mockup.jpeg';
import lecturesIconSrc from '~/shared/assets/svg/book.svg';
import { AppRoute } from '~/shared/router';
import { TitleCard } from '~/shared/ui/TitleCard';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

export function LectureWeeksPage(): JSX.Element {
  const navigate = useNavigate();

  const { weeks, isWeeksPending } = useLectureWeeks();

  const handleWeekSelect = (week: number) => {
    navigate(`${AppRoute.LectureWeeks}/${week}`);
  };

  return (
    <CommonPageLayout
      title="Лекции"
      iconSrc={lecturesIconSrc}
      isLoading={isWeeksPending}
    >
      <StyledWeeksList>
        {weeks?.map(({ count, cover, week }) => (
          <TitleCard
            key={week}
            title={`Неделя ${week}`}
            subTitle={`Лекций ${count}`}
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
