import { CMS2_PLACE_TYPE } from '../constants';

/**
 * Проверяет, содержит ли папка недельную структуру (Неделя 1, Неделя 2, ...)
 */
export const hasWeekStructure = (children: { title: string }[]): boolean => {
  return children.some((child) => /^Неделя\s+\d+$/i.test(child.title));
};

/**
 * Проверяет, содержит ли папка структуру Зал/Дом
 */
export const hasPlaceStructure = (children: { title: string }[]): boolean => {
  const titles = children.map((c) => c.title);
  return (
    titles.includes(CMS2_PLACE_TYPE.GYM) ||
    titles.includes(CMS2_PLACE_TYPE.HOME)
  );
};

/**
 * Извлекает номер недели из заголовка "Неделя 1" -> "1"
 */
export const getWeekNumber = (title: string): string => {
  const match = title.match(/\d+/);
  return match ? match[0] : title;
};
