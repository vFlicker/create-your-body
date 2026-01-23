import styled from '@emotion/styled';
import { JSX } from 'react';

import type { Cms2ContentNode, Cms2PlaceType } from '~/entities/cms2';
import { useCms2TrainingNavigation } from '~/entities/cms2';
import { Color } from '~/shared/theme/colors';
import { Loader } from '~/shared/ui/atoms/Loader';
import { Cms2NodeCard } from '~/shared/ui/molecules/Cms2NodeCard';

import { Cms2TrainingHeader } from './Cms2TrainingHeader';

type Cms2TrainingNavigatorProps = {
  weeks: Cms2ContentNode[];
};

export function Cms2TrainingNavigator({
  weeks,
}: Cms2TrainingNavigatorProps): JSX.Element {
  const {
    selectedWeek,
    selectedPlace,
    lessons,
    hasPlaceStructure,
    isLoading,
    setSelectedWeek,
    setSelectedPlace,
    handleLessonClick,
  } = useCms2TrainingNavigation({ weeks });

  const handlePlaceChange = (place: string) => {
    setSelectedPlace(place as Cms2PlaceType);
  };

  return (
    <StyledWrapper>
      <Cms2TrainingHeader
        weeks={weeks}
        selectedWeek={selectedWeek}
        onSelectWeek={setSelectedWeek}
        showPlaceToggle={hasPlaceStructure}
        selectedPlace={selectedPlace}
        onSelectPlace={handlePlaceChange}
      />

      {isLoading ? (
        <StyledLoaderWrapper>
          <Loader />
        </StyledLoaderWrapper>
      ) : (
        <StyledLessonsList>
          {lessons.map((lesson) => (
            <Cms2NodeCard
              key={lesson.id}
              title={lesson.title}
              type="lesson"
              coverImage={lesson.coverImage}
              disabled={!lesson.access.hasAccess}
              badgeText={
                lesson.access.isTeaser ? lesson.access.teaserMessage : undefined
              }
              isCompleted={lesson.isCompleted}
              hasTypeBadge={lesson.hasTypeBadge !== false}
              onClick={() => handleLessonClick(lesson)}
            />
          ))}
        </StyledLessonsList>
      )}

      {!isLoading && lessons.length === 0 && (
        <StyledMessage>Контент пока недоступен</StyledMessage>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLessonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLoaderWrapper = styled.div`
  padding: 40px 0;
`;

const StyledMessage = styled.div`
  text-align: center;
  color: ${Color.Black_600};
  padding: 24px;
`;
