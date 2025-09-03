export const getDeficitRangeSelectLabels = (bmi: number) => {
  const labels = [
    { value: 10, text: '10%', description: 'Мягкий' },
    { value: 15, text: '15%', description: 'Норма' },
    { value: 20, text: '20%', description: 'Средний' },
    { value: 25, text: '25%', description: 'Жёсткий' },
  ];

  if (bmi >= 30) {
    labels.push({ value: 30, text: '30%', description: 'Экстрем' });
  }

  return labels;
};
