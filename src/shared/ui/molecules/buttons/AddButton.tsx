import styled from '@emotion/styled';
import { JSX } from 'react';

import PlusIcon from '~/shared/assets/svg/plus.svg?react';
import { IconButton } from '~/shared/ui/atoms/IconButton';

type AddButtonProps = {
  className?: string;
  onClick?: () => void;
};

export function AddButton({ className, onClick }: AddButtonProps): JSX.Element {
  return (
    <StyledAddButton
      className={className}
      color="accent"
      isActive
      iconComponent={<PlusIcon stroke="#ffffff" />}
      onClick={onClick}
    />
  );
}

const StyledAddButton = styled(IconButton)`
  button {
    width: 54px;
    height: 54px;
  }
`;
