export const formatDateForApi = (date: string): string => {
  const [day, month, year] = date.split('.');
  return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const formatDateForView = (date: string): string => {
  if (!date) return '';

  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatNumberWithThousands = (value: number): string => {
  return new Intl.NumberFormat('ru-RU').format(value);
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
