import './Notification.css';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import exit from '../../Assets/svg/exit.svg';

const Notification = ({ children, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return createPortal(
    <div className="notification">
      {children}
      <button className="noticeCloseBtn" onClick={onClose}>
        <img src={exit} alt="Убрать сообщение" />
      </button>
    </div>,
    document.body,
  );
};

export default Notification;
