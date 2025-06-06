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
import { withAttrs } from '~/shared/ui/withAttrs';

import { showTelegramAlert } from '../libs';
import { Color } from '../theme/colors';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

type PhotoEditorProps = {
  userQuery: string;
  label: string;
  stage: 'before' | 'after';
};

export function PhotoEditor({ userQuery, label, stage }: PhotoEditorProps) {
  const fileInputRef = useRef(null);

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
    const file = evt.target.files[0];

    if (!file) return;

    if (MAX_FILE_SIZE) {
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
      updateTransformationPhotoMutate({ userQuery, formData, stage });
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
        <StyledImage src={photoUrl} isEmpty={!hasPhoto} alt={label} />
        <StyledEditButton disabled={isLoading} onClick={handleEditClick} />
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
  font-size: 12px;
  color: ${Color.Black_400};
`;

const StyledImageWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 210px;
  border-radius: 6px;

  background-color: ${Color.Black_600};
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

const StyledEditButton = withAttrs(
  { iconSrc: editIconSrc },
  styled(IconButton)`
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
  `,
);

const StyledInput = styled.input`
  display: none;
`;
