import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../../API';

import ButtonEdit from '../Button/ButtonEdit';

import edit from '../../Assets/svg/editSmall.svg';

export default function PhotoEditor ({ label, initialPhoto, userId, number }) {
    const fileInputRef = useRef(null);
    const [photo, setPhoto] = useState(initialPhoto);
  
    useEffect(() => {
      const fetchPhoto = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/v1/user/image/two`, {
            params: { tg_id: userId, number },
            responseType: 'blob',
          });
          setPhoto(URL.createObjectURL(response.data));
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
        // Проверка размера файла (2 МБ = 2 * 1024 * 1024 байт)
        if (file.size > 2 * 1024 * 1024) {
          // Используем Telegram.WebApp.showAlert вместо стандартного alert
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.showAlert('Максимальный размер фотографии 2 МБ');
          } else {
            alert('Максимальный размер фотографии 2 МБ'); // Fallback для не-Telegram среды
          }
          return;
        }
  
        const formData = new FormData();
        formData.append('image', file);
  
        try {
          await axios.post(`${API_BASE_URL}/api/v1/user/image/two`, formData, {
            params: { user_tg_id: userId, number },
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          setPhoto(URL.createObjectURL(file));
          console.log(`${label} успешно обновлено!`);
        } catch (error) {
          console.error(`Ошибка при загрузке ${label}:`, error.message);
        }
      }
    };
  
    return (
      <div className="before">
        <span>{label}</span>
        <div className="forBefore">
          <img src={photo} alt={label} />
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
