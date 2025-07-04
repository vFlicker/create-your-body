import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useLecturesByWeek } from '~/entities/lecture';
import mockupImageSrc from '~/shared/assets/img/mockup.jpeg';
import lecturesIconSrc from '~/shared/assets/svg/book.svg';
import { AppRoute } from '~/shared/router';
import { TitleCard } from '~/shared/ui/molecules/TitleCard';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

export function LectureWeekPage(): JSX.Element {
  const navigate = useNavigate();
  const { week } = useParams<{ week: string }>();

  const { lecturesByWeek, isLecturesByWeekPending } = useLecturesByWeek(week!);

  const handleLectureSelect = (lectureId: string) => {
    navigate(`${AppRoute.LectureWeeks}/${week}/${lectureId}`);
  };

  if (!lecturesByWeek || isLecturesByWeekPending)
    return (
      <CommonPageLayout
        title="Лекции"
        iconSrc={lecturesIconSrc}
        isLoading={isLecturesByWeekPending}
      />
    );

  return (
    <CommonPageLayout
      title="Лекции"
      iconSrc={lecturesIconSrc}
      isLoading={isLecturesByWeekPending}
    >
      <StyledLectureWeekWrapper>
        <StyledTitle>Неделя {week}</StyledTitle>
        <StyledLecturesList>
          {lecturesByWeek.map(({ _id, title, duration, coverImage }) => (
            <TitleCard
              key={_id}
              title={title}
              subTitle={`${duration} мин`}
              iconSrc={coverImage.url || mockupImageSrc}
              isFullWidthImage={true}
              onClick={() => handleLectureSelect(_id)}
            />
          ))}
        </StyledLecturesList>
      </StyledLectureWeekWrapper>
    </CommonPageLayout>
  );
}

const StyledLectureWeekWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

const StyledTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

const StyledLecturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
