import styled from '@emotion/styled';
import { JSX } from 'react';

import PencilIcon from '../../../assets/svg/pencil.svg?react';
import { IconButton } from '../../atoms/IconButton';

type EditButtonProps = {
  className?: string;
  onClick: () => void;
};

export function EditButton({
  className,
  onClick,
}: EditButtonProps): JSX.Element {
  return (
    <StyledIconButton
      className={className}
      color="secondary"
      iconComponent={<PencilIcon stroke="#867EBD" />}
      onClick={onClick}
    />
  );
}

const StyledIconButton = styled(IconButton)`
  button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 26px;
    height: 26px;
    border-radius: 6px;

    background-color: #f0f0f6;
  }

  svg,
  img {
    width: 12px;
    height: 12px;
  }
`;
