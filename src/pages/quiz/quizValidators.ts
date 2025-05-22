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

export const validatePhone = (phone) => {
  const cleanedPhone = phone.replace(/[^\d+]/g, '');

  if (cleanedPhone.startsWith('7') || cleanedPhone.startsWith('8')) {
    if (cleanedPhone.length !== 11) {
      return 'Номер телефона должен содержать 11 цифр';
    }
    return '';
  }

  if (cleanedPhone.startsWith('+7')) {
    if (cleanedPhone.length !== 12) {
      return 'Номер телефона должен содержать 12 цифр';
    }
    return '';
  }

  if (cleanedPhone.startsWith('+')) {
    if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
      return 'Номер телефона должен содержать от 10 до 15 символов';
    }
    return '';
  }

  return 'Введите корректный номер телефона';
};

export const validateName = (name) => {
  if (!name.trim()) {
    return 'Введите ваше имя';
  }
  if (name.length < 2) {
    return 'Имя должно содержать минимум 2 символа';
  }
  if (name.length > 20) {
    return 'Имя не должно превышать 20 символов';
  }
  if (!/^[а-яА-Яa-zA-Z\s]+$/.test(name)) {
    return 'Имя может содержать только буквы';
  }
  return '';
};
