export const formatDate = (rawData: string): string => {
  const date = new Date(rawData);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const calculateDifference = (
  current: number,
  previous: number,
): string => {
  if (!previous) return null;

  const diff = current - previous;
  return diff > 0 ? `+${diff}` : diff.toString();
};
