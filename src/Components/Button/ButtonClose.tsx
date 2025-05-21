import './Button.css';

import { useLocation } from 'react-router-dom';

import close from '~/shared/assets/svg/close.svg';
import closeStart from '~/shared/assets/svg/closeWhite.svg';

export default function ButtonClose() {
  const location = useLocation();
  return (
    <button className="close" onClick={() => window.Telegram.WebApp.close()}>
      <img src={location.pathname === '/' ? closeStart : close} alt="Закрыть" />
    </button>
  );
}
