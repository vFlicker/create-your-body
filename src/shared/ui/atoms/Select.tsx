import styled from '@emotion/styled';
import { ChangeEvent, JSX } from 'react';

import { Color } from '../../theme/colors';

type SelectProps = {
  className?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export function Select({
  className,
  value,
  options,
  onChange,
}: SelectProps): JSX.Element {
  return (
    <div>
      <StyledSelect className={className} value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
}

const StyledSelect = styled.select`
  padding: 4px 28px 4px 12px;
  border: none;
  border-radius: 8px;

  background-color: ${Color.Green_500};
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='13' viewBox='0 0 12 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 5L6 8L9 5' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;

  font-size: 16px;
  font-weight: 500;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;

  cursor: pointer;
`;
