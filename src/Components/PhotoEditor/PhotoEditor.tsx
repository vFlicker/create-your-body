import { useRef } from 'react';

import { useTransformationPhotos } from '~/entities/user/api/useTransformationPhoto';
import { useUpdateTransformationPhotos } from '~/entities/user/api/useUpdateTransformationPhotos';
import edit from '~/shared/assets/svg/editSmall.svg';
import photoNone from '~/shared/assets/svg/photoNone.svg';
import { Loader } from '~/shared/ui/Loader';

import ButtonEdit from '../Button/ButtonEdit';

export default function PhotoEditor({ label, userQuery, stage }) {
  const fileInputRef = useRef(null);

  const { isTransformationPhotosPending, transformationPhotos } =
    useTransformationPhotos(userQuery);

  const {
    updateTransformationPhotosMutate,
    isUpdateTransformationPhotosPending,
  } = useUpdateTransformationPhotos();

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
        }
        return;
      }

      if (!file.type.startsWith('image/')) {
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('Пожалуйста, загрузите изображение');
        }
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      try {
        updateTransformationPhotosMutate({
          userQuery,
          formData,
          stage,
        });
      } catch {
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('Ошибка при загрузке фотографии');
        }
      }
    }
  };

  const isLoading =
    isTransformationPhotosPending || isUpdateTransformationPhotosPending;

  const photoData = transformationPhotos && transformationPhotos[stage];
  const photoUrl = photoData?.url;

  return (
    <div className="before">
      <span>{label}</span>
      <div
        className="forBefore"
        style={{ background: photoUrl ? 'transparent' : 'rgb(110 110 110)' }}
      >
        {isLoading ? (
          <Loader />
        ) : photoUrl ? (
          <img src={photoUrl} alt={label} />
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
            disabled={isLoading}
          />
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={isLoading}
      />
    </div>
  );
}
