import { parse } from 'date-fns';

/**
 * input: 31.12.2025 or new Date('2025-12-31')
 *
 * output: 2025-12-31T00:00:00.000Z
 */
export const formatDateForApi = (date: string | Date): string => {
  let parsedDate: Date;

  if (typeof date === 'string') {
    parsedDate = parse(date, 'dd.MM.yyyy', new Date());
  } else {
    parsedDate = date;
  }

  return parsedDate.toISOString();
};

export const formatDateToLocaleRu = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return parsedDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatDateToLocalIso = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const convertRuDateToIso = (date: string): string => {
  const [day, month, year] = date.split('.');
  return `${year}-${month}-${day}`;
};

export const formatNumberWithThousands = (value: number): string => {
  return new Intl.NumberFormat('ru-RU').format(value);
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
