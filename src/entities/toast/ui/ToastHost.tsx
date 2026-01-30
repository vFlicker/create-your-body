import styled from '@emotion/styled';
import { JSX } from 'react';
import { createPortal } from 'react-dom';

import { useToastStore } from '../model/toastStore';

export function ToastHost(): JSX.Element | null {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return createPortal(
    <StyledToastContainer>
      {toasts.map((toast) => (
        <StyledToast
          key={toast.id}
          type={toast.type}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </StyledToast>
      ))}
    </StyledToastContainer>,
    document.body,
  );
}

const StyledToastContainer = styled.div`
  position: fixed;
  top: 16px;
  left: 16px;
  right: 16px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  z-index: 9999;
  pointer-events: none;
`;

const StyledToast = styled.div<{ type: 'success' | 'error' }>`
  padding: 14px 16px;
  border-radius: 12px;

  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;

  background-color: ${({ type }) => (type === 'success' ? '#34c759' : '#ff3b30')};

  animation: slideIn 0.3s ease-out;
  pointer-events: auto;
  cursor: pointer;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
