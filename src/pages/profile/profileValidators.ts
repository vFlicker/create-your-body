export const isDateValid = (date) => {
  if (!/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/.test(date))
    return false;
  const [day, month, year] = date.split('.').map(Number);
  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() + 1 !== month ||
    birthDate.getDate() !== day
  )
    return false;
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 4,
    today.getMonth(),
    today.getDate(),
  );
  return birthDate < minDate;
};
