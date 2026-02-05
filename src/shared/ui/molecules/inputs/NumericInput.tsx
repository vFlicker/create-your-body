import styled from '@emotion/styled';
import { ChangeEvent, forwardRef, InputHTMLAttributes, JSX } from 'react';

import { ErrorText } from '../../atoms/ErrorText';

type NumericInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  label: string;
  postfix?: string;
  error?: string;
  decimals?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  function NumericInput(
    { className, label, postfix, error, decimals = 0, onChange, ...props },
    ref,
  ): JSX.Element {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      let value = input.value;

      // Заменяем запятую на точку
      value = value.replace(',', '.');

      // Убираем всё кроме цифр и точки
      value = value.replace(/[^\d.]/g, '');

      // Убираем лишние точки (оставляем только первую)
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }

      // Ограничиваем количество знаков после запятой
      if (decimals === 0) {
        // Целое число - убираем точку и всё после неё
        value = value.split('.')[0];
      } else if (parts.length === 2 && parts[1].length > decimals) {
        // Ограничиваем decimals знаков после точки
        value = parts[0] + '.' + parts[1].slice(0, decimals);
      }

      // Убираем ведущие нули (кроме "0" и "0.")
      if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
        value = value.replace(/^0+/, '') || '0';
      }

      // Обновляем значение в input
      input.value = value;

      // Вызываем оригинальный onChange
      onChange?.(e);
    };

    return (
      <StyledInputWrapper className={className}>
        <StyledLabel>
          <StyledLabelText>{label}</StyledLabelText>
          <StyledInput
            ref={ref}
            type="text"
            inputMode={decimals > 0 ? 'decimal' : 'numeric'}
            {...props}
            onChange={handleChange}
          />
          {postfix && <StyledPostfix>{postfix}</StyledPostfix>}
        </StyledLabel>
        {error && <ErrorText>{error}</ErrorText>}
      </StyledInputWrapper>
    );
  },
);

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledLabel = styled.label`
  position: relative;

  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 22px;

  color: #0d0d0d;
  font-size: 12px;
`;

const StyledLabelText = styled.span`
  position: absolute;
  top: 0;
`;

const StyledInput = styled.input`
  display: flex;
  padding: 14px 18px;
  border: 1px solid #e6e6e6;
  border-radius: 50px;

  color: #0d0d0d;
  font-size: 16px;
  font-weight: 400;

  background-color: #f2f2f2;

  &::placeholder {
    color: #999999;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const StyledPostfix = styled.span`
  position: absolute;
  right: 20px;
  top: 42px;

  color: #878787;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;
