export const formatTimeFromString = (time: string): string => {
  if (!time || typeof time !== 'string') return '0:00';

  const [minutes, seconds] = time.split(':').map(Number);
  if (isNaN(minutes) || isNaN(seconds)) return '0:00';

  const formattedMinutes = Math.floor(minutes);
  const formattedSeconds = Math.floor(seconds);
  return `${formattedMinutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
};
