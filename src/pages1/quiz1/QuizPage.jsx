import './QuizPage.css';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '~/shared/api';

import Button from '../../Components/Button/Button';
import ButtonBack from '../../Components/Button/ButtonBack';
import Progress from '../../Components/Progress/Progress';

const slideVariants = {
  enter: (direction) => ({
    x: direction === 'forward' ? 1000 : -1000,
    scale: 0.8,
    rotate: direction === 'forward' ? -5 : 5,
  }),
  center: {
    x: 0,
    scale: 1,
    rotate: 0,
  },
  exit: (direction) => ({
    x: direction === 'forward' ? -1000 : 1000,
    scale: 0.8,
    rotate: direction === 'forward' ? 5 : -5,
  }),
};

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
  scale: {
    duration: 0.5,
    ease: 'easeOut',
  },
  rotate: {
    duration: 0.5,
    ease: 'easeInOut',
  },
};

const titleVariants = {
  enter: (direction) => ({
    x: direction === 'forward' ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction === 'forward' ? -100 : 100,
    opacity: 0,
  }),
};

const titleTransition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

export function QuizPage({ userId, data }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('forward');
  const [name, setName] = useState('');
  const [gen, setGen] = useState('');
  const [tel, setTel] = useState('');
  const [birthday, setBirthday] = useState('');
  const [telError, setTelError] = useState('');
  const [nameError, setNameError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef(null);

  const nameRef = useRef(null);
  const telRef = useRef(null);
  const birthdayRef = useRef(null);

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setTel(data.phone ? data.phone.replace(/\s/g, '') : '');
      setBirthday(
        data.born_date
          ? new Date(data.born_date)
              .toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
              .replace(/\//g, '.')
          : '',
      );
    }
  }, [data]);

  const quizData = [
    {
      question:
        'Обладаете ли вы достаточным уровнем знаний и пониманием выполнения базовых движений?',
      options: [
        { text: 'Да, знаю технику и выполняю уверенно', img: '✅', level: 1 },
        { text: 'Нет, не уверен(а) в технике', img: '❌', level: 2 },
      ],
    },
    {
      question: 'Как часто вы тренировались в последние 3 месяца?',
      options: [
        { text: 'Регулярно (3-5 раз в неделю)', img: '🏋️‍♀️', level: 1 },
        { text: 'Иногда (1-2 раза в неделю)', img: '🛋️', level: 2 },
      ],
    },
    {
      question: 'Как вы оцениваете свою силу?',
      options: [
        { text: 'Высокая', img: '💪', level: 1 },
        { text: 'Средняя', img: '🫠', level: 2 },
      ],
    },
    {
      question: 'Как оцениваете свою выносливость?',
      options: [
        { text: 'Высокая', img: '🚀', level: 1 },
        { text: 'Средняя', img: '😓', level: 2 },
      ],
    },
    {
      question:
        'Какой у вас уровень физической активности в повседневной жизни?',
      options: [
        { text: 'Высокий', img: '🚶‍♀️', level: 1 },
        { text: 'Средний', img: '🛋️', level: 2 },
      ],
    },
    {
      question: 'Как вы чувствуете себя после тренировки?',
      options: [
        { text: 'Энергичным', img: '😌', level: 1 },
        { text: 'Уставшим', img: '😰', level: 2 },
      ],
    },
    {
      question: 'Какой уровень сложности тренировок вам комфортен?',
      options: [
        { text: 'Высокий', img: '🚀', level: 1 },
        { text: 'Средний', img: '🥵', level: 2 },
      ],
    },
  ];

  const isDateValid = (date) => {
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

  const validatePhone = (phone) => {
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

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^\d+]/g, '');

    if (value.startsWith('+')) {
      if (value.length > 15) return;
      setTel(value);
      setTelError(validatePhone(value));
      return;
    }

    if (value.length === 1) {
      if (value === '7' || value === '+') value = '+7';
      else if (value === '8') value = '8';
      else value = `+7${value}`;
    }

    const maxLength = value.startsWith('+') ? 12 : 11;
    if (value.length > maxLength) return;

    setTel(value);
    setTelError(validatePhone(value));

    if (value.length === maxLength && telRef.current) {
      telRef.current.blur();
    }
  };

  const validateName = (name) => {
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

  const handleNameChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^а-яА-Яa-zA-Z\s]/g, '');
    setName(sanitizedValue);
    setNameError(validateName(sanitizedValue));
  };

  const handleBirthdayChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 3) return;
    let newValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i === 2 || i === 5) newValue += '.';
      newValue += value[i];
    }
    newValue = newValue.replace(/\.+/g, '.');
    if (newValue.length > 10) return;

    setBirthday(newValue);
    setBirthdayError(
      isDateValid(newValue) ? '' : 'Введите корректную дату рождения',
    );

    if (newValue.length === 10 && birthdayRef.current) {
      birthdayRef.current.blur();
    }
  };

  useEffect(() => {
    if (step === 1) {
      const isNameValid = !nameError && name.trim().length > 0;
      const isTelValid = !telError && tel.length > 0;
      const isDateValidValue = !birthdayError && birthday.length > 0;
      setIsValid(isNameValid && isTelValid && isDateValidValue);
    } else {
      setIsValid(selectedOption !== null);
    }
  }, [
    step,
    name,
    tel,
    birthday,
    selectedOption,
    telError,
    nameError,
    birthdayError,
  ]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.expand();
      tg.setBackgroundColor('#fff');
      const platform = tg.platform;
      setIsMobile(platform !== 'tdesktop' && platform !== 'macos');
    }
  }, []);

  const handleFocus = (e) => {
    if (!isMobile) return;
    setIsFocused(true);
    const input = e.target;
    const container = formRef.current;
    const containerRect = container.getBoundingClientRect();
    const inputRect = input.getBoundingClientRect();
    const relativeLeft = inputRect.left - containerRect.left;
    const relativeTop = inputRect.top - containerRect.top;
    const originX = (relativeLeft / containerRect.width) * 130;
    const originY = (relativeTop / containerRect.height) * 130;
    container.style.transformOrigin = `${originX}% ${originY}%`;
    container.style.transform = `scale(1.3)`;
    container.style.transition = 'transform 0.3s ease';
    const scrollOffset =
      inputRect.top - containerRect.top - containerRect.height * 0.3;
    container.scrollTo({
      top: container.scrollTop + scrollOffset,
      behavior: 'smooth',
    });
  };

  const handleBlur = () => {
    if (!isMobile) return;
    setIsFocused(false);
    const container = formRef.current;
    container.style.transform = 'none';
    container.style.transition = 'transform 0.3s ease';
  };

  const handleNext = () => {
    if (step < 8) {
      setDirection('forward');
      setAnswers([...answers, selectedOption]);
      setSelectedOption(null);
      setTimeout(() => {
        setStep(step + 1);
      }, 300);
    } else {
      const finalAnswers = [...answers, selectedOption];
      const countOnes = finalAnswers.filter((answer) => answer === 1).length;
      const countTwos = finalAnswers.filter((answer) => answer === 2).length;
      const userLevel = countOnes > countTwos ? 'Профи' : 'Новичок';

      const [day, month, year] = birthday.split('.');
      const formattedBirthday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      const sendData = async () => {
        try {
          const userData = {
            tg_id: String(userId),
            name: name || '',
            born_date: formattedBirthday,
            sex: gen === 'm' ? 'male' : 'female',
            user_level: userLevel || '',
            phone: tel || '',
          };

          console.log('Отправляемые данные:', userData);

          const requiredFields = [
            'tg_id',
            'name',
            'born_date',
            'sex',
            'user_level',
            'phone',
          ];
          const invalidFields = requiredFields.filter(
            (field) => !userData[field] || typeof userData[field] !== 'string',
          );
          if (invalidFields.length > 0) {
            throw new Error(`Некорректные поля: ${invalidFields.join(', ')}`);
          }

          const status = await apiService.updateUser(userData);
          console.log('Данные успешно обновлены:', status);
          navigate('/result');
        } catch (error) {
          console.error(
            'Ошибка при обновлении данных:',
            JSON.stringify(error.response.data, null, 2),
          );
        }
      };

      sendData();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection('backward');
      setTimeout(() => {
        setStep(step - 1);
        setSelectedOption(answers[step - 2]);
        setAnswers(answers.slice(0, -1));
      }, 300);
    }
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="quizStep1"
      // whileHover={{ scale: 1.02 }}
      // whileTap={{ scale: 0.98 }}
    >
      <div className="name">
        <p className="titleInput">Имя</p>
        <input
          type="text"
          placeholder="Введите ваше имя"
          value={name}
          onChange={handleNameChange}
          ref={nameRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={!name}
        />
        <div className="error-message" style={{ opacity: nameError ? 1 : 0 }}>
          {nameError}
        </div>
      </div>
      <div className="name">
        <p className="titleInput">Пол</p>
        <div className="selectGender">
          <button
            className={`genderBtn ${gen === 'm' ? 'active' : ''}`}
            onClick={() => setGen('m')}
          >
            М
          </button>
          <button
            className={`genderBtn ${gen === 'w' ? 'active' : ''}`}
            onClick={() => setGen('w')}
          >
            Ж
          </button>
        </div>
      </div>
      <div className="name">
        <p className="titleInput">Номер телефона</p>
        <input
          type="tel"
          placeholder="7 999 999 99 99"
          value={tel}
          onChange={handlePhoneChange}
          ref={telRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={!tel}
        />
        <div className="error-message" style={{ opacity: telError ? 1 : 0 }}>
          {telError}
        </div>
      </div>
      <div className="name">
        <p className="titleInput">Дата рождения</p>
        <input
          type="text"
          placeholder="дд.мм.гггг"
          value={birthday}
          onChange={handleBirthdayChange}
          ref={birthdayRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={!birthday}
        />
        <div
          className="error-message"
          style={{ opacity: birthdayError ? 1 : 0 }}
        >
          {birthdayError}
        </div>
      </div>
    </motion.div>
  );

  const renderQuizStep = () => (
    <motion.div
      key={`step${step}`}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="quizStep"
    >
      <div className="quizOptions">
        {quizData[step - 2].options.map((option, index) => (
          <button
            key={index}
            className={`quizAnswer ${selectedOption === option.level ? 'active' : ''}`}
            onClick={() => setSelectedOption(option.level)}
          >
            <p>{option.img}</p>
            <p>{option.text}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className={`quizPage ${isFocused ? 'focused' : ''}`} ref={formRef}>
      <div className="forBack">
        {step !== 1 && <ButtonBack onClick={handleBack} />}
      </div>
      <div className={`topPage ${step > 1 ? 'expanded' : ''}`}>
        <div className="titleContainer">
          <AnimatePresence initial={false} mode="sync">
            <motion.h1
              key={step}
              custom={direction}
              variants={titleVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={titleTransition}
              className="titleAnimate"
            >
              {step === 1
                ? 'Давайте знакомиться!'
                : quizData[step - 2].question}
            </motion.h1>
          </AnimatePresence>
        </div>
        <Progress title={'Шаг'} count_all={8} count_complited={step} />
      </div>
      <div className={`bottomPage ${step > 1 ? 'expanded' : ''}`}>
        <div
          className="quizContent"
          style={{
            minHeight: step > 1 ? 'auto' : '',
          }}
        >
          <AnimatePresence initial={false} mode="sync">
            {step === 1 ? renderStep1() : renderQuizStep()}
          </AnimatePresence>
          <Button
            text={step === 8 ? 'Завершить' : 'Далее'}
            onClick={handleNext}
            disabled={!isValid}
            width="calc(100% - 32px)"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
