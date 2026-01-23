import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '~/shared/router';

import { useCms2Folder } from '../api/useCms2Folder';
import type { Cms2ContentNode } from '../cms2Types';
import { CMS2_PLACE_TYPE, Cms2PlaceType } from '../constants';
import { hasPlaceStructure as checkPlaceStructure } from '../utils';

type UseCms2TrainingNavigationProps = {
  weeks: Cms2ContentNode[];
};

type UseCms2TrainingNavigationReturn = {
  selectedWeek: Cms2ContentNode;
  selectedPlace: Cms2PlaceType;
  lessons: Cms2ContentNode[];
  hasPlaceStructure: boolean;
  isLoading: boolean;
  setSelectedWeek: (week: Cms2ContentNode) => void;
  setSelectedPlace: (place: Cms2PlaceType) => void;
  handleLessonClick: (lesson: Cms2ContentNode) => void;
};

export function useCms2TrainingNavigation({
  weeks,
}: UseCms2TrainingNavigationProps): UseCms2TrainingNavigationReturn {
  const navigate = useNavigate();

  // Find first accessible week
  const firstAccessibleWeek = useMemo(
    () => weeks.find((w) => w.access.hasAccess) || weeks[0],
    [weeks],
  );

  const [selectedWeek, setSelectedWeek] =
    useState<Cms2ContentNode>(firstAccessibleWeek);
  const [selectedPlace, setSelectedPlace] = useState<Cms2PlaceType>(
    CMS2_PLACE_TYPE.GYM,
  );

  // Fetch children of selected week (should contain Зал/Дом folders)
  const { folder: weekFolder, isFolderPending: isWeekPending } = useCms2Folder(
    selectedWeek?.access.hasAccess ? selectedWeek.id : 0,
  );

  // Find Зал/Дом folder based on selection
  const placeFolder = useMemo(() => {
    if (!weekFolder?.children) return null;
    return weekFolder.children.find((c) => c.title === selectedPlace);
  }, [weekFolder, selectedPlace]);

  // Fetch lessons from the place folder
  const { folder: placeFolderData, isFolderPending: isPlacePending } =
    useCms2Folder(placeFolder?.access.hasAccess ? placeFolder.id : 0);

  // Check if week has Зал/Дом structure
  const hasPlaceStructure = useMemo(() => {
    if (!weekFolder?.children) return false;
    return checkPlaceStructure(weekFolder.children);
  }, [weekFolder]);

  // Get lessons to display
  const lessons = useMemo(() => {
    if (hasPlaceStructure) {
      return placeFolderData?.children || [];
    }
    // If no Зал/Дом structure, show week's direct children
    return weekFolder?.children || [];
  }, [hasPlaceStructure, placeFolderData, weekFolder]);

  // Reset place when switching weeks if needed
  useEffect(() => {
    if (weekFolder?.children) {
      const hasZal = weekFolder.children.some(
        (c) => c.title === CMS2_PLACE_TYPE.GYM,
      );
      const hasDom = weekFolder.children.some(
        (c) => c.title === CMS2_PLACE_TYPE.HOME,
      );

      if (selectedPlace === CMS2_PLACE_TYPE.GYM && !hasZal && hasDom) {
        setSelectedPlace(CMS2_PLACE_TYPE.HOME);
      } else if (selectedPlace === CMS2_PLACE_TYPE.HOME && !hasDom && hasZal) {
        setSelectedPlace(CMS2_PLACE_TYPE.GYM);
      }
    }
  }, [weekFolder, selectedPlace]);

  const handleLessonClick = (lesson: Cms2ContentNode) => {
    if (lesson.type === 'lesson') {
      navigate(
        AppRoute.LearningLesson.replace(':lessonId', String(lesson.id)),
      );
    } else {
      navigate(
        AppRoute.LearningFolder.replace(':folderId', String(lesson.id)),
      );
    }
  };

  const isLoading = isWeekPending || (hasPlaceStructure && isPlacePending);

  return {
    selectedWeek,
    selectedPlace,
    lessons,
    hasPlaceStructure,
    isLoading,
    setSelectedWeek,
    setSelectedPlace,
    handleLessonClick,
  };
}
