import styled from '@emotion/styled';
import { ChangeEvent, JSX, useRef } from 'react';

import addIconSrc from '../../assets/svg/photo-none.svg';
import { showTelegramAlert } from '../../libs/telegram';
import { Color } from '../../theme/colors';
import { Loader } from '../atoms/Loader';
import { EditButton } from './buttons/EditButton';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

type ImageUploaderProps = {
  label: string;
  isLoading: boolean;
  imageSrc?: string;
  onFileSelect: (file: File) => void;
};

export function ImageUploader({
  label,
  imageSrc,
  isLoading,
  onFileSelect,
}: ImageUploaderProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasPhoto = !!imageSrc;

  const handleClick = () => {
    if (!isLoading) fileInputRef.current?.click();
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
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

    onFileSelect(file);
    evt.target.value = '';
  };

  return (
    <StyledWrapper>
      <StyledImageWrapper>
        {isLoading && <Loader />}
        {!isLoading &&
          (hasPhoto ? (
            <>
              <StyledImage src={imageSrc} alt={label} />
              <StyledEditButton onClick={handleClick} />
            </>
          ) : (
            <StyledPlaceholder onClick={handleClick}>
              <StyledPlaceholderIcon src={addIconSrc} />
              <StyledPlaceholderText>Загрузить фото</StyledPlaceholderText>
            </StyledPlaceholder>
          ))}
      </StyledImageWrapper>

      <StyledLabel>{label}</StyledLabel>

      <StyledInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isLoading}
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const StyledImageWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 160px;
  border-radius: 6px;

  background-color: ${Color.Black_50};

  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledEditButton = styled(EditButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const StyledPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const StyledPlaceholderIcon = styled.img`
  width: 36px;
  height: 36px;
  padding: 9px;
  border-radius: 10px;
  background-color: rgba(167, 153, 255, 0.16);
`;

const StyledPlaceholderText = styled.span`
  color: #7a66ff;
  font-size: 14px;
  font-weight: 600;
  text-decoration-line: underline;
`;

const StyledLabel = styled.span`
  color: #0d0d0d;
  font-size: 12px;
  font-weight: 500;
`;

const StyledInput = styled.input`
  display: none;
`;
