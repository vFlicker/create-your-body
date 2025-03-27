import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../../API';

import ButtonEdit from '../Button/ButtonEdit';

import edit from '../../Assets/svg/editSmall.svg';
import photoNone from '../../Assets/svg/photoNone.svg';

export default function PhotoEditor({ label, initialPhoto, userId, number }) {
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState(initialPhoto);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/testapi/v1/user/images/two`, {
          data: {
            tg_id: String(userId),
            number: number // 0 для фото "до", 1 для фото "после"
          }
        });

        if (response.data) {
          const photoUrl = number === 0 ? response.data.image_before : response.data.image_after;
          if (photoUrl) {
            setPhoto(photoUrl);
          }
        }
      } catch (error) {
        console.error(`Ошибка при получении ${label}:`, error.message);
        setPhoto(initialPhoto);
      }
    };
    fetchPhoto();
  }, [userId, number, label, initialPhoto]);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
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

      const formData = new FormData();
      formData.append('user_tg_id', String(userId));

      if (number === 0) {
        formData.append('image_before', file);
      } else {
        formData.append('image_after', file);
      }

      try {
        // Проверяем, есть ли уже фотографии
        const checkResponse = await axios.get(`${API_BASE_URL}/testapi/v1/user/images/two`, {
          data: {
            tg_id: String(userId),
            number: 0
          }
        });

        if (checkResponse.data && (checkResponse.data.image_before || checkResponse.data.image_after)) {
          // Если фотографии есть, используем PATCH
          await axios.patch(`${API_BASE_URL}/testapi/v1/user/images/two`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          // Если фотографий нет, используем POST
          await axios.post(`${API_BASE_URL}/testapi/v1/user/images/two`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        setPhoto(URL.createObjectURL(file));
        console.log(`${label} успешно обновлено!`);
      } catch (error) {
        console.error(`Ошибка при загрузке ${label}:`, error.message);
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('Ошибка при загрузке фотографии');
        } else {
          alert('Ошибка при загрузке фотографии');
        }
      }
    }
  };

  return (
    <div className="before">
      <span>{label}</span>
      <div className="forBefore" style={{ background: photo ? 'transparent' : 'rgb(110 110 110)' }}>
        {photo ?
          <img src={photo} alt={label} />
          :
          <img src={photoNone} alt={label} style={{ width: '50%', height: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        }
        <div className="forEdit">
          <ButtonEdit
            icon={edit}
            size={30}
            sizeIcon={16}
            onClick={handleEditClick}
          />
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};
