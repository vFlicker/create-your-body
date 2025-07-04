import styled from '@emotion/styled';
import { ChangeEvent, JSX, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  convertDateToBackendFormat,
  formatDateForDisplay,
  useUpdateUser,
  useUser,
} from '~/entities/user';
import { BackButton } from '~/features/BackButton';
import { AppRoute } from '~/shared/router';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { Progress } from '~/shared/ui/atoms/Progress';

import { quizData } from './quizData';
import { isDateValid, validateName, validatePhone } from './quizValidators';

export function QuizPage(): JSX.Element {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef(null);

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [gen, setGen] = useState('');
  const [tel, setTel] = useState('');
  const [birthday, setBirthday] = useState('');
  const [telError, setTelError] = useState('');
  const [nameError, setNameError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isValid, setIsValid] = useState(false);

  const { user } = useUser();
  const { updateUser, isUpdateUserLoading } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setTel(user.phone ? user.phone.replace(/\s/g, '') : '');
      setBirthday(user.bornDate ? formatDateForDisplay(user.bornDate) : '');
    }
  }, [user]);

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

  const handlePhoneChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let value = evt.target.value.replace(/[^\d+]/g, '');

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

  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const sanitizedValue = value.replace(/[^а-яА-Яa-zA-Z\s]/g, '');
    setName(sanitizedValue);
    setNameError(validateName(sanitizedValue));
  };

  const handleBirthdayChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.replace(/[^0-9.]/g, '');
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
  };
  const handleNext = async () => {
    if (step < 8) {
      setAnswers([...answers, selectedOption!]);
      setSelectedOption(null);
      setTimeout(() => {
        setStep(step + 1);
      }, 300);
    } else {
      const finalAnswers = [...answers, selectedOption];
      const countOnes = finalAnswers.filter((answer) => answer === 1).length;
      const countTwos = finalAnswers.filter((answer) => answer === 2).length;
      const userLevel = countOnes > countTwos ? 'Профи' : 'Новичок';

      const userData = {
        name: name || '',
        bornDate: convertDateToBackendFormat(birthday),
        sex: gen === 'm' ? 'male' : 'female',
        level: userLevel || '',
        phone: tel || '',
      };

      const requiredFields = [
        'name',
        'bornDate',
        'sex',
        'level',
        'phone',
      ] as const;

      const invalidFields = requiredFields.filter(
        (field) => !userData[field] || typeof userData[field] !== 'string',
      );

      if (invalidFields.length > 0) {
        console.error(`Некорректные поля: ${invalidFields.join(', ')}`);
        return;
      }

      try {
        await updateUser({ dto: userData });
        navigate(AppRoute.QuizResult);
      } catch (error) {
        console.error('Ошибка обновления пользователя:', error);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setTimeout(() => {
        setStep(step - 1);
        setSelectedOption(answers[step - 2]);
        setAnswers(answers.slice(0, -1));
      }, 300);
    }
  };

  const renderStep1 = () => (
    <StyledQuizStep1>
      <StyledNameInputContainer>
        <StyledTitleInput>Имя</StyledTitleInput>
        <StyledInput
          type="text"
          placeholder="Введите ваше имя"
          value={name}
          onChange={handleNameChange}
          ref={nameRef}
          autoFocus={!name}
        />
        <StyledErrorMessage style={{ opacity: nameError ? 1 : 0 }}>
          {nameError}
        </StyledErrorMessage>
      </StyledNameInputContainer>
      <StyledNameInputContainer>
        <StyledTitleInput>Пол</StyledTitleInput>
        <StyledSelectGender>
          <StyledGenderButton
            isActive={gen === 'm'}
            onClick={() => setGen('m')}
          >
            М
          </StyledGenderButton>
          <StyledGenderButton
            isActive={gen === 'w'}
            onClick={() => setGen('w')}
          >
            Ж
          </StyledGenderButton>
        </StyledSelectGender>
      </StyledNameInputContainer>
      <StyledNameInputContainer>
        <StyledTitleInput>Номер телефона</StyledTitleInput>
        <StyledInput
          type="tel"
          placeholder="7 999 999 99 99"
          value={tel}
          onChange={handlePhoneChange}
          ref={telRef}
          autoFocus={!tel}
        />
        <StyledErrorMessage style={{ opacity: telError ? 1 : 0 }}>
          {telError}
        </StyledErrorMessage>
      </StyledNameInputContainer>
      <StyledNameInputContainer>
        <StyledTitleInput>Дата рождения</StyledTitleInput>
        <StyledInput
          type="text"
          placeholder="дд.мм.гггг"
          value={birthday}
          onChange={handleBirthdayChange}
          ref={birthdayRef}
          autoFocus={!birthday}
        />
        <StyledErrorMessage style={{ opacity: birthdayError ? 1 : 0 }}>
          {birthdayError}
        </StyledErrorMessage>
      </StyledNameInputContainer>
    </StyledQuizStep1>
  );

  const renderQuizStep = () => (
    <StyledQuizStep>
      <StyledQuizOptions>
        {quizData[step - 2].options.map((option, index) => (
          <StyledQuizAnswer
            key={index}
            isActive={selectedOption === option.level}
            onClick={() => setSelectedOption(option.level)}
          >
            <p>{option.img}</p>
            <p>{option.text}</p>
          </StyledQuizAnswer>
        ))}
      </StyledQuizOptions>
    </StyledQuizStep>
  );

  return (
    <StyledQuizPage ref={formRef}>
      <StyledForBack>
        {step !== 1 && <BackButton onClick={handleBack} />}
      </StyledForBack>
      <StyledTopPage isExpanded={step > 1}>
        <StyledTitleContainer>
          <StyledTitleAnimate>
            {step === 1 ? 'Давайте знакомиться!' : quizData[step - 2].question}
          </StyledTitleAnimate>
        </StyledTitleContainer>
        <Progress label="Шаг" steps={8} completedSteps={step} />
      </StyledTopPage>
      <StyledBottomPage isExpanded={step > 1}>
        <StyledQuizContent
          style={{
            minHeight: step > 1 ? 'auto' : '',
          }}
        >
          {step === 1 ? renderStep1() : renderQuizStep()}
          <StyledQuizButton
            disabled={!isValid || isUpdateUserLoading}
            color="neutral"
            onClick={handleNext}
          >
            {step === 8 ? 'Завершить' : 'Далее'}
          </StyledQuizButton>
        </StyledQuizContent>
      </StyledBottomPage>
    </StyledQuizPage>
  );
}

const StyledQuizPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  width: 100%;
`;

const StyledTopPage = styled.div<{ isExpanded?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
  padding: 0 16px;
  height: ${({ isExpanded }) => (isExpanded ? '50%' : '30%')};
  transition: height 0.5s ease;

  h1 {
    font-size: 24px;
    color: ${Color.Violet_950};
  }
`;

const StyledTitleContainer = styled.div`
  position: relative;
  min-height: 50%;
`;

const StyledTitleAnimate = styled.h1`
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 24px;
  color: ${Color.Violet_950};
`;

const StyledBottomPage = styled.div<{ isExpanded?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px 16px 0 0;
  background: ${Color.White};
  padding-bottom: 32px;
  height: ${({ isExpanded }) => (isExpanded ? '50%' : '70%')};
  transition: height 0.5s ease;
`;

const StyledQuizContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px 16px 0 16px;
  padding-bottom: 16px;
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

const StyledNameInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const StyledInput = styled.input`
  background: ${Color.Black_50};
  border: 1px solid ${Color.Black_100};
  height: 36px;
  padding: 0 14px;
  font-size: 16px;
  color: ${Color.Black_950};
  border-radius: 14px;

  &::placeholder {
    color: ${Color.Black_400};
  }
`;

const StyledTitleInput = styled.p`
  font-size: 12px;
  color: ${Color.Black_950};
`;

const StyledSelectGender = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledGenderButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 74px;
  height: 36px;
  background: ${({ isActive }) =>
    isActive ? Color.Violet_200 : Color.Black_50};
  color: ${({ isActive }) => (isActive ? Color.Black_50 : Color.Black_950)};
  transition: all 150ms ease-in-out;
  border-radius: 14px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const StyledQuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
`;

const StyledQuizAnswer = styled.button<{ isActive?: boolean }>`
  border: 1px solid
    ${({ isActive }) => (isActive ? Color.Violet_200 : Color.Black_100)};
  background: ${({ isActive }) =>
    isActive ? Color.Violet_200 : Color.Black_50};
  border-radius: 14px;
  height: 54px;
  transition: all 150ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 0 8px;
  cursor: pointer;

  p {
    color: ${({ isActive }) => (isActive ? Color.Black_50 : Color.Black_950)};
    font-size: 14px;
    transition: all 150ms ease-in-out;
  }
`;

const StyledForBack = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
`;

const StyledErrorMessage = styled.div`
  position: absolute;
  bottom: -16px;
  left: 16px;
  font-size: 12px;
  color: #ff3b30;
  transition: all 500ms ease-in-out;
`;

const StyledQuizStep1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledQuizStep = styled.div`
  position: absolute;
  width: calc(100% - 32px);
`;

const StyledQuizButton = styled(Button)`
  margin-top: auto;
`;
