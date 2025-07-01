import styled from '@emotion/styled';
import { ChangeEvent, useRef } from 'react';

import {
  useTransformationPhoto,
  useUpdateTransformationPhoto,
} from '~/entities/user';
import editIconSrc from '~/shared/assets/svg/editSmall.svg';
import emptyPhotoIconSrc from '~/shared/assets/svg/photoNone.svg';
import { IconButton } from '~/shared/ui/IconButton';
import { Loader } from '~/shared/ui/Loader';

import { showTelegramAlert } from '../libs/telegram';
import { Color } from '../theme/colors';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

type PhotoEditorProps = {
  label: string;
  stage: 'before' | 'after';
};

export function PhotoEditor({ label, stage }: PhotoEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isTransformationPhotoPending, transformationPhoto } =
    useTransformationPhoto();

  const {
    updateTransformationPhotoMutate,
    isUpdateTransformationPhotoPending,
  } = useUpdateTransformationPhoto();

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      showTelegramAlert('Размер файла не должен превышать 2 МБ');
      return;
    }

    if (!file.type.startsWith('image/')) {
      showTelegramAlert('Пожалуйста, загрузите изображение');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      updateTransformationPhotoMutate({ stage, formData });
    } catch {
      showTelegramAlert('Ошибка при загрузке фотографии');
    }
  };

  const isLoading =
    isTransformationPhotoPending || isUpdateTransformationPhotoPending;

  const photoData = transformationPhoto && transformationPhoto[stage];
  const hasPhoto = !!photoData;
  const photoUrl = hasPhoto ? photoData.url : emptyPhotoIconSrc;

  return (
    <StyledPhotoEditorWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledImageWrapper>
        {isLoading && <Loader />}
        {!isLoading && (
          <StyledImage src={photoUrl} isEmpty={!hasPhoto} alt={label} />
        )}
        <StyledEditButton
          color="secondary"
          iconSrc={editIconSrc}
          disabled={isLoading}
          onClick={handleEditClick}
        />
      </StyledImageWrapper>
      <StyledInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        disabled={isLoading}
        onChange={handleFileChange}
      />
    </StyledPhotoEditorWrapper>
  );
}

const StyledPhotoEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const StyledLabel = styled.span`
  color: #0d0d0d;
  font-size: 12px;
`;

const StyledImageWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 210px;
  border-radius: 6px;

  background-color: ${Color.Black_50};
`;

const StyledImage = styled.img<{ isEmpty: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;

  ${({ isEmpty }) =>
    isEmpty &&
    `
    width: 50%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: contain;
  `}
`;

const StyledEditButton = styled(IconButton)`
  position: absolute;
  top: 16px;
  right: 16px;

  button {
    width: 30px;
    height: 30px;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

const StyledInput = styled.input`
  display: none;
`;
