import './ProfileBtn.css';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import avatar from '~/shared/assets/nav/user.svg';

import Loader from '../Loader/Loader';

export default function ProfileBtn({ level, user_photo }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (user_photo) {
      const img = new Image();
      img.src = user_photo;
      img.onload = () => {
        setIsLoading(false);
      };
      img.onerror = () => {
        setIsLoading(false);
      };
    } else {
      setIsLoading(false);
    }
  }, [user_photo]);

  return (
    <div className="profilePlash">
      <button
        className="profileBtn"
        onClick={() => navigate('/profile')}
        style={{ borderColor: level === 'Профи' ? '#A799FF' : '' }}
      >
        {isLoading ? (
          <Loader width={16} widthContainer="100%" />
        ) : (
          <img
            src={user_photo ? user_photo : avatar}
            alt="аватар"
            style={{ transform: user_photo ? '' : 'scale(0.7)' }}
          />
        )}
        <div
          className="profileEllips"
          style={{ background: level === 'Профи' ? '#A799FF' : '' }}
        ></div>
      </button>
      {location.pathname !== '/profile' &&
        location.pathname !== '/record' &&
        location.pathname !== '/parameters' && (
          <div className="profileBtnText">
            <p>Уровень:</p>
            <span>{level}</span>
          </div>
        )}
    </div>
  );
}
