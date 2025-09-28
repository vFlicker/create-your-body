import styled from '@emotion/styled';
import { JSX } from 'react';

import TrashIcon from '../../../assets/svg/trash.svg?react';
import { IconButton } from '../../atoms/IconButton';

type RemoveButtonProps = JSX.IntrinsicElements['button'];

export function RemoveButton({
  className,
  onClick,
}: RemoveButtonProps): JSX.Element {
  return (
    <StyledIconButton
      className={className}
      color="secondary"
      iconComponent={<TrashIcon stroke="#F65C5C" />}
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

    background-color: #feebeb;
  }

  svg,
  img {
    width: 12px;
    height: 12px;
  }
`;
