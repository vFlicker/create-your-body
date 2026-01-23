import bookIconSrc from '~/shared/assets/svg/book.svg';
import foodIconSrc from '~/shared/assets/svg/food.svg';
import musculesIconSrc from '~/shared/assets/svg/musclesBlack.svg';
import recipesIconSrc from '~/shared/assets/svg/recipes.svg';

export const CMS2_PLACE_TYPE = {
  GYM: 'Зал',
  HOME: 'Дом',
} as const;

export type Cms2PlaceType =
  (typeof CMS2_PLACE_TYPE)[keyof typeof CMS2_PLACE_TYPE];

export const CMS2_PLACE_VALUES: [Cms2PlaceType, Cms2PlaceType] = [
  CMS2_PLACE_TYPE.GYM,
  CMS2_PLACE_TYPE.HOME,
];

export const CMS2_FOLDER_ICONS: Record<string, string> = {
  Тренировки: musculesIconSrc,
  Лекции: bookIconSrc,
  Рецепты: recipesIconSrc,
  Питание: foodIconSrc,
};

export const CMS2_DEFAULT_FOLDER_ICON = bookIconSrc;
