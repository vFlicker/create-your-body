export const calculateAge = (bornDate: string): number => {
  const birthDate = new Date(bornDate);
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
