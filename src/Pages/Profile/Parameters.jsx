import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';
import { API_BASE_URL } from '../../API';

import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';
import Button from '../../Components/Button/Button';

import example from '../../Assets/img/example.jpeg';
import add from '../../Assets/svg/addImg.svg';
import close from '../../Assets/svg/closeWhite.svg';

const InputPair = ({ labels, values, onChange, handleBlur, handleFocus, type = 'text' }) => {
  if (type === 'gender') {
    return (
      <div className="inputPair">
        <div className="inputGroup">
          <label>{labels[0]}</label>
          <div className="selectGender">
            <button
              className={`genderBtn ${values[0] === 'm' ? 'active' : ''}`}
              onClick={() => onChange(0)('m')}
            >
              М
            </button>
            <button
              className={`genderBtn ${values[0] === 'w' ? 'active' : ''}`}
              onClick={() => onChange(0)('w')}
            >
              Ж
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'birthday') {
    return (
      <div className="inputPair">
        <div className="inputGroup">
          <label>{labels[0]}</label>
          <input
            type="text"
            value={values[0] || ''}
            onChange={(e) => onChange(0)(e)}
            placeholder="дд.мм.гггг"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="inputPair">
      {labels.map((label, i) => (
        label && (
          <div key={label} className="inputGroup">
            <label>{label}</label>
            <input
              type="text"
              value={values[i] || ''}
              onChange={(e) => onChange(i)(e)}
              placeholder="0"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        )
      ))}
    </div>
  );
};

const PhotoUploader = ({ label, value, onChange, onRemove }) => {
  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="photoUploader" onClick={handleClick}>
      <label>{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      {value ? (
        <div className="uploadContainer">
          <img
            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
            alt={label}
            className="previewImage"
            onClick={(e) => e.stopPropagation()}
          />
          <img 
            className="closePhoto" 
            src={close} 
            alt="Закрыть" 
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          />
        </div>
      ) : (
        <div className="uploadPlaceholderContainer">
          <img src={add} className="uploadPlaceholder" alt="Добавить" />
        </div>
      )}
    </div>
  );
};

export default function Parameters({ userId, data }) {
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    chest: '',
    waist: '',
    belly: '',
    hips: '',
    leg: '',
    weight: '',
    photoBefore: null,
    photoAfter: null
  });
  const [gen, setGen] = useState(data?.sex === 'male' ? 'm' : 'w');
  const [birthday, setBirthday] = useState(data?.born_date ? new Date(data.born_date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '.') : '');
  const [birthdayError, setBirthdayError] = useState('');
  const [hasParameters, setHasParameters] = useState(false);
  const [hasPhotos, setHasPhotos] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      const platform = tg.platform.toLowerCase();
      setIsMobile(!['tdesktop', 'macos', 'linux', 'web'].includes(platform));
    }

    const fetchData = async () => {
      try {
        // Получаем параметры
        const parametersResponse = await axios.get(`${API_BASE_URL}/testapi/v1/user/parametrs`, {
          params: { user_tg_id: userId },
        });
        const parameters = Array.isArray(parametersResponse.data) ? parametersResponse.data : [parametersResponse.data];
        const latestParameters = parameters[parameters.length - 1];
        
        if (latestParameters) {
          setHasParameters(true);
          setFormData({
            chest: latestParameters.chest || '',
            waist: latestParameters.waist || '',
            belly: latestParameters.abdominal_circumference || '',
            hips: latestParameters.hips || '',
            leg: latestParameters.legs || '',
            weight: latestParameters.weight || '',
          });
        }

        // Проверяем наличие фотографий
        try {
          const photosResponse = await axios.get(`${API_BASE_URL}/testapi/v1/user/images/two`, {
            data: { 
              tg_id: String(userId),
              number: 0 // Проверяем наличие фото "до"
            }
          });
          
          if (photosResponse.data && (photosResponse.data.image_before || photosResponse.data.image_after)) {
            setHasPhotos(true);
            setFormData(prev => ({
              ...prev,
              photoBefore: photosResponse.data.image_before || null,
              photoAfter: photosResponse.data.image_after || null,
            }));
          }
        } catch (photoError) {
          console.log('Фотографий нет или ошибка:', photoError.response?.status);
          setHasPhotos(false);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        setHasParameters(false);
        setHasPhotos(false);
      }
    };

    fetchData();
  }, [userId]);

  const isDateValid = (date) => {
    if (!/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/.test(date)) return false;
    const [day, month, year] = date.split('.').map(Number);
    const birthDate = new Date(year, month - 1, day);
    if (
      birthDate.getFullYear() !== year ||
      birthDate.getMonth() + 1 !== month ||
      birthDate.getDate() !== day
    ) return false;
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());
    return birthDate < minDate;
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
    setBirthdayError(isDateValid(newValue) ? '' : 'Введите корректную дату рождения');
  };

  const handleFocus = (e) => {
    if (!isMobile || !formRef.current) return;
    const input = e.target;
    const container = formRef.current;
    const containerRect = container.getBoundingClientRect();
    const inputRect = input.getBoundingClientRect();
    const relativeLeft = inputRect.left - containerRect.left;
    const relativeTop = inputRect.top - containerRect.top;
    const originX = (relativeLeft / containerRect.width) * 130;
    const originY = (relativeTop / containerRect.height) * 130;
    container.style.transformOrigin = `${originX}% ${originY}%`;
    container.style.transform = `scale(1.5)`;
    container.style.transition = 'transform 150ms ease-in-out';
    const scrollOffset = inputRect.top - containerRect.top - (containerRect.height * 0.3);
    container.scrollTo({
      top: container.scrollTop + scrollOffset,
      behavior: 'smooth',
    });
  };

  const handleBlur = () => {
    if (!isMobile || !formRef.current) return;
    const container = formRef.current;
    container.style.transform = 'none';
    container.style.transition = 'transform 150ms ease-in-out';
  };

  const handleChange = (field, index) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleGenderChange = (index) => (value) => {
    setGen(value);
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('Максимальный размер фотографии 2 МБ');
        } else {
          alert('Максимальный размер фотографии 2 МБ');
        }
        return;
      }

      if (!file.type.startsWith('image/')) {
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('Пожалуйста, загрузите изображение');
        } else {
          alert('Пожалуйста, загрузите изображение');
        }
        return;
      }

      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleRemovePhoto = (field) => () => {
    setFormData(prev => ({
      ...prev,
      [field]: null
    }));
  };

  const handleSubmit = async () => {
    const requiredFields = ['chest', 'waist', 'belly', 'hips', 'leg', 'weight'];
    const isAllFilled = requiredFields.every(field => {
      const value = formData[field];
      return value !== undefined && value !== null && String(value).trim() !== '';
    });
  
    if (!isAllFilled) {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('Добавьте все параметры');
      } else {
        alert('Добавьте все параметры');
      }
      return;
    }
  
    if (!isDateValid(birthday)) {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('Введите корректную дату рождения');
      } else {
        alert('Введите корректную дату рождения');
      }
      return;
    }
  
    try {
      // Обновление информации о пользователе
      const [day, month, year] = birthday.split('.');
      const formattedBirthday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
      await axios.patch(`${API_BASE_URL}/testapi/v1/user/info`, {
        tg_id: String(userId),
        sex: gen === 'm' ? 'male' : 'female',
        born_date: formattedBirthday
      });
  
      // Обновление параметров
      const parametersData = {
        tg_id: String(userId),
        number: 1,
        chest: parseInt(formData.chest, 10) || 0,
        waist: parseInt(formData.waist, 10) || 0,
        abdominal_circumference: parseInt(formData.belly, 10) || 0,
        legs: parseInt(formData.leg, 10) || 0,
        hips: parseInt(formData.hips, 10) || 0,
        weight: parseInt(formData.weight, 10) || 0
      };
  
      if (hasParameters) {
        await axios.patch(`${API_BASE_URL}/testapi/v1/user/parametrs`, parametersData);
      } else {
        await axios.post(`${API_BASE_URL}/testapi/v1/user/parametrs`, parametersData);
      }
  
      // Загрузка фотографий
      if (formData.photoBefore || formData.photoAfter) {
        const formDataPhotos = new FormData();
        formDataPhotos.append('user_tg_id', String(userId));
        
        if (formData.photoBefore) {
          formDataPhotos.append('image_before', formData.photoBefore);
        }
        if (formData.photoAfter) {
          formDataPhotos.append('image_after', formData.photoAfter);
        }

        if (hasPhotos) {
          // Если фотографии уже есть (по GET-запросу), используем PATCH
          await axios.patch(`${API_BASE_URL}/testapi/v1/user/images/two`, formDataPhotos, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          // Если фотографий нет, используем POST
          await axios.post(`${API_BASE_URL}/testapi/v1/user/images/two`, formDataPhotos, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
      }
  
      console.log('Данные сохранены!');
      navigate('/profile');
    } catch (error) {
      console.error('Ошибка при сохранении:', error.response?.data || error.message);
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('Ошибка при сохранении данных');
      } else {
        alert('Ошибка при сохранении данных');
      }
    }
  };

  const inputPairs = [
    { labels: ['Пол', ''], values: [gen], onChange: handleGenderChange, type: 'gender' },
    { labels: ['Дата рождения', ''], values: [birthday], onChange: (i) => handleBirthdayChange, type: 'birthday' },
    { labels: ['Обхват груди', 'Обхват талии'], values: [formData.chest, formData.waist], onChange: (i) => handleChange(['chest', 'waist'][i], i) },
    { labels: ['Обхват живота', 'Обхват бедер'], values: [formData.belly, formData.hips], onChange: (i) => handleChange(['belly', 'hips'][i], i) },
    { labels: ['Обхват ноги', 'Вес'], values: [formData.leg, formData.weight], onChange: (i) => handleChange(['leg', 'weight'][i], i) },
  ];

  const isFormValid = () => {
    const requiredFields = ['chest', 'waist', 'belly', 'hips', 'leg', 'weight'];
    const isAllFilled = requiredFields.every(field => {
      const value = formData[field];
      return value !== undefined && value !== null && String(value).trim() !== '';
    });
    
    const isDateValidValue = isDateValid(birthday);
    
    return isAllFilled && isDateValidValue;
  };

  return (
    <div className="profilePage" ref={formRef}>
      <div className="profileContainer">
        <div className="profile">
          <ProfileBtn level={data.user_level} user_photo={data.image} />
          <div className="profileName">
            <p>{data?.name || 'Имя'}</p>
            <span>{data?.user_level || 'Уровень'}</span>
          </div>
        </div>
        <div className="howSize">
          <h3>Как измерить параметры?</h3>
          <div className="example">
            <div className="examplePhoto">
              <img src={example} alt="Пример измерения" />
            </div>
            <div className="solution">
              <p>Измеряем по самым выпирающим точкам обхват:</p>
              {['Груди', 'Талии', 'Живота', 'Бедер', 'Ноги'].map((item) => (
                <div key={item} className="sol">
                  <div className="dot" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="inputsSection">
          {inputPairs.map((pair, index) => (
            <InputPair
              key={index}
              labels={pair.labels}
              values={pair.values}
              onChange={pair.onChange}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              type={pair.type}
            />
          ))}
          <div className="loadPhotos">
            <PhotoUploader
              label="Фото до"
              value={formData.photoBefore}
              onChange={handleFileChange('photoBefore')}
              onRemove={handleRemovePhoto('photoBefore')}
            />
            <PhotoUploader
              label="Фото после"
              value={formData.photoAfter}
              onChange={handleFileChange('photoAfter')}
              onRemove={handleRemovePhoto('photoAfter')}
            />
          </div>
          <Button
            text="Сохранить"
            width="100%"
            bg={isFormValid() ? "#CBFF52" : "#EBFFBD"}
            bgFocus="#EBFFBD"
            color="#0D0D0D"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          />
          <div className="error-message-parameters" style={{ opacity: birthdayError ? 1 : 0 }}>{birthdayError}</div>
        </div>
      </div>
    </div>
  );
}