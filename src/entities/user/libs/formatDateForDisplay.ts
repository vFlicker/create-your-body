export const formatDateForDisplay = (date: string): string => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
