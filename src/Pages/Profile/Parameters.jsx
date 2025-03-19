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

const InputPair = ({ labels, values, onChange, handleBlur, handleFocus, isStatic }) => {
  return (
    <div className="inputPair">
      {labels.map((label, i) => (
        <div key={label} className="inputGroup">
          <label>{label}</label>
          {isStatic ? (
            <input
              type="text"
              value={values[i] || ''}
              readOnly
            />
          ) : (
            <input
              type="text"
              value={values[i] || ''}
              onChange={onChange(i)}
              placeholder="0"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const PhotoUploader = ({ label, value, onChange }) => {
  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Проверка размера файла (2 МБ = 2 * 1024 * 1024 байт)
      if (file.size > 2 * 1024 * 1024) {
        // Используем Telegram.WebApp.showAlert вместо стандартного alert
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('Максимальный размер фотографии 2 МБ');
        } else {
          alert('Максимальный размер фотографии 2 МБ'); // Фallback для не-Telegram среды
        }
        return;
      }
      onChange(e);
    }
  };

  return (
    <div className="photoUploader" onClick={handleClick}>
      <label>{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
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
          <img className="closePhoto" src={close} alt="Закрыть" />
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
    photoAfter: null,
  });

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      const platform = tg.platform.toLowerCase();
      setIsMobile(!['tdesktop', 'macos', 'linux', 'web'].includes(platform));
    }
  }, []);

  // Расчёт возраста из born_date
  const calculateAge = (bornDate) => {
    if (!bornDate) return '';
    const birth = new Date(bornDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return String(age);
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
    const value = index === undefined ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    const requiredFields = ['chest', 'waist', 'belly', 'hips', 'leg', 'weight'];
    const isAllFilled = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
  
    if (!isAllFilled) {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('Добавьте все параметры');
      } else {
        alert('Добавьте все параметры');
      }
      return;
    }
  
    if (!userId) {
      console.error('userId отсутствует');
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('Ошибка: отсутствует идентификатор пользователя');
        } else {
          alert('Ошибка: отсутствует идентификатор пользователя');
        }
        return;
      }
  
    try {
      // Отправка параметров
      const paramData = {
        tg_id: String(userId),
        chest: parseInt(formData.chest, 10) || 0,
        waist: parseInt(formData.waist, 10) || 0,
        abdominal_circumference: parseInt(formData.belly, 10) || 0,
        hips: parseInt(formData.hips, 10) || 0,
        legs: parseInt(formData.leg, 10) || 0,
        weight: parseInt(formData.weight, 10) || 0,
        created_at: new Date().toISOString(),
      };
  
      console.log('Отправляемые параметры:', paramData);
  
      await axios.post(`${API_BASE_URL}/api/v1/user_parametrs`, paramData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Отправка фотографий, если они есть
      if (formData.photoBefore || formData.photoAfter) {
        const photoData = new FormData();
        photoData.append('user_tg_id', String(userId)); // Добавляем user_tg_id в FormData
        if (formData.photoBefore) photoData.append('image_before', formData.photoBefore, `${userId}_before.jpg`);
        if (formData.photoAfter) photoData.append('image_after', formData.photoAfter, `${userId}_after.jpg`);
  
        await axios.post(`${API_BASE_URL}/api/v1/user/images/two`, photoData, { // Убираем query-параметр
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
  
      console.log('Данные сохранены!');
      navigate('/profile');
    } catch (error) {
      console.error('Ошибка при сохранении:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('Ошибка при сохранении данных');
      } else {
        alert('Ошибка при сохранении данных');
      }
    }
  };

  const inputPairs = [
    { labels: ['Пол', 'Возраст'], fields: ['sex', 'age'], isStatic: true },
    { labels: ['Обхват груди', 'Обхват талии'], fields: ['chest', 'waist'], isStatic: false },
    { labels: ['Обхват живота', 'Обхват бедер'], fields: ['belly', 'hips'], isStatic: false },
    { labels: ['Обхват ноги', 'Вес'], fields: ['leg', 'weight'], isStatic: false },
  ];

  const staticData = {
    sex: data?.sex === 'male' ? 'Мужской' : data?.sex === 'female' ? 'Женский' : '',
    age: calculateAge(data?.born_date),
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
          {inputPairs.map(({ labels, fields, isStatic }) => (
            <InputPair
              key={labels[0]}
              labels={labels}
              values={isStatic ? [staticData[fields[0]], staticData[fields[1]]] : [formData[fields[0]], formData[fields[1]]]}
              onChange={(i) => handleChange(fields[i], i)}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              isStatic={isStatic}
            />
          ))}
          <div className="loadPhotos">
            <PhotoUploader
              label="Фото до"
              value={formData.photoBefore}
              onChange={handleChange('photoBefore')}
            />
            <PhotoUploader
              label="Фото после"
              value={formData.photoAfter}
              onChange={handleChange('photoAfter')}
            />
          </div>
          <Button
            text="Сохранить"
            width="100%"
            bg="#CBFF52"
            bgFocus="#EBFFBD"
            color="#0D0D0D"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}