import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { API_BASE_URL } from '../../API';
import edit from '../../Assets/svg/editSmall.svg';
import photoNone from '../../Assets/svg/photoNone.svg';
import ButtonEdit from '../Button/ButtonEdit';
import Loader from '../Loader/Loader';

export default function PhotoEditor({ label, initialPhoto, userId, number }) {
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState(initialPhoto);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      setIsLoading(true);
      try {
        // console.log('Отправка запроса на получение фото:', {
        //   url: `${API_BASE_URL}/api/v1/user/images/two`,
        //   userId,
        //   number,
        //   requestParams: {
        //   tg_id: String(userId),
        //   number: number
        //   }
        // });

        const response = await axios.get(
          `${API_BASE_URL}/api/v1/user/images/two`,
          {
            params: {
              tg_id: String(userId),
              number: number,
            },
            responseType: 'blob',
          },
        );

        // console.log('Ответ сервера:', {
        //   status: response.status,
        //   headers: response.headers,
        //   dataType: typeof response.data,
        //   dataSize: response.data?.size,
        //   data: response.data
        // });

        if (response.data && response.data.size > 100) {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const jsonData = JSON.parse(reader.result);
                console.error('Получен JSON вместо изображения:', jsonData);
                setPhoto(initialPhoto);
              } catch {
                const blob = new Blob([response.data], {
                  type: response.headers['content-type'] || 'image/jpeg',
                });
                const photoUrl = URL.createObjectURL(blob);
                // console.log('Созданный URL:', photoUrl);
                setPhoto(photoUrl);
              }
            };
            reader.readAsText(response.data);
          } catch (error) {
            console.error('Ошибка при обработке данных:', error);
            setPhoto(initialPhoto);
          }
        } else {
          console.error('Получены некорректные данные:', response.data);
          setPhoto(initialPhoto);
        }
      } catch (error) {
        console.error('Подробная информация об ошибке:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: error.config?.data,
          },
        });
        setPhoto(initialPhoto);
      } finally {
        setIsLoading(false);
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
          window.Telegram.WebApp.showAlert(
            'Максимальный размер фотографии 2 МБ',
          );
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
      formData.append('image', file);

      try {
        setIsUploading(true);
        if (photo) {
          console.log('Отправка PATCH запроса для обновления фото');
          await axios.patch(
            `${API_BASE_URL}/api/v1/user/images/two`,
            formData,
            {
              params: {
                tg_id: String(userId),
                number: number,
              },
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );
        } else {
          console.log('Отправка POST запроса для создания нового фото');
          formData.append('tg_id', String(userId));
          if (number === 0) {
            formData.append('image_before', file);
          } else {
            formData.append('image_after', file);
          }
          await axios.post(`${API_BASE_URL}/api/v1/user/images/two`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        setPhoto(URL.createObjectURL(file));
        console.log(`${label} успешно обновлено!`);
      } catch (error) {
        console.error('Подробная информация об ошибке при загрузке:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: error.config?.data,
          },
        });
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('Ошибка при загрузке фотографии');
        } else {
          alert('Ошибка при загрузке фотографии');
        }
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="before">
      <span>{label}</span>
      <div
        className="forBefore"
        style={{ background: photo ? 'transparent' : 'rgb(110 110 110)' }}
      >
        {isLoading || isUploading ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader />
          </div>
        ) : photo ? (
          <img src={photo} alt={label} />
        ) : (
          <img
            src={photoNone}
            alt={label}
            style={{
              width: '50%',
              height: '100%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              objectFit: 'contain',
            }}
          />
        )}
        <div className="forEdit">
          <ButtonEdit
            icon={edit}
            size={30}
            sizeIcon={16}
            onClick={handleEditClick}
            disabled={isLoading || isUploading}
          />
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={isLoading || isUploading}
      />
    </div>
  );
}
