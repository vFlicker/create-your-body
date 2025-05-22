import './Nav.css';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import back from '~/shared/assets/nav/back.svg';
import chat from '~/shared/assets/nav/chat.svg';
import dashboard from '~/shared/assets/nav/dashboard.svg';
import food from '~/shared/assets/nav/food.svg';
import muscles from '~/shared/assets/nav/musclesBlack.svg';
import profile from '~/shared/assets/nav/user.svg';
import lock from '~/shared/assets/svg/lock.svg';
import { AppRoute } from '~/shared/router';

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pressedPath, setPressedPath] = useState(null);
  const [prevPath, setPrevPath] = useState(null);
  const [_hasHandleBack, setHasHandleBack] = useState(false);

  // Массив с данными для навигации
  const navItems = [
    { path: AppRoute.Dashboard, icon: dashboard, label: 'Меню' },
    {
      path: AppRoute.Traning,
      icon: muscles,
      label: 'Тренировки',
    },
    {
      path: AppRoute.Food,
      icon: food,
      label: 'Питание',
    },
    { path: AppRoute.Communication, icon: chat, label: 'Общение' },
    { path: AppRoute.Profile, icon: profile, label: 'Профиль' },
  ];

  // Сохраняем предыдущий путь при изменении location
  useEffect(() => {
    const currentPath = location.pathname;
    return () => {
      setPrevPath(currentPath);
    };
  }, [location]);

  // Следим за изменениями window.handleBack
  useEffect(() => {
    const checkHandleBack = () => {
      setHasHandleBack(!!window.handleBack);
    };

    // Проверяем начальное состояние
    checkHandleBack();

    // Создаем наблюдатель за изменениями window.handleBack
    const observer = new MutationObserver(checkHandleBack);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-handle-back'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Проверяем, является ли текущий путь одним из путей в navItems
  const isCurrentPathInNav = navItems.some(
    (item) => item.path === location.pathname,
  );

  // Проверяем, нужно ли отключить ссылку (для /training и /food)
  const isLinkDisabled = (path) => path === '';

  // Обработчики событий для управления состоянием нажатия
  const handleMouseDown = (path) => setPressedPath(path);
  const handleMouseUp = () => setPressedPath(null);
  const handleTouchStart = (path) => setPressedPath(path);
  const handleTouchEnd = () => setPressedPath(null);

  // Обработчик клика
  const handleClick = (path) => {
    if (window.handleBack && path === location.pathname) {
      window.handleBack();
    } else if (
      path === prevPath &&
      !isCurrentPathInNav &&
      window.history.length > 1
    ) {
      navigate(-1);
    }
  };

  return (
    <div className="navContainer">
      <div className="navMenu">
        {navItems.map((item) => (
          <div
            key={item.path}
            className="nav"
            onMouseDown={() => handleMouseDown(item.path)}
            onMouseUp={handleMouseUp}
            onTouchStart={() => handleTouchStart(item.path)}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => {
              if (
                (window.handleBack && item.path === location.pathname) ||
                (item.path === prevPath && !isCurrentPathInNav)
              ) {
                e.preventDefault();
                handleClick(item.path);
              } else if (isLinkDisabled(item.path)) {
                e.preventDefault();
              }
            }}
          >
            {(window.handleBack && item.path === location.pathname) ||
            (item.path === prevPath && !isCurrentPathInNav) ? (
              // Кнопка с иконкой возврата и другим фоном
              <div
                className="navLink"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClick(item.path);
                }}
              >
                <div
                  className={`forIcon active ${pressedPath === item.path ? 'pressed' : ''}`}
                >
                  <img src={back} alt={`${item.label} назад`} />
                </div>
                <p>{item.label}</p>
              </div>
            ) : (
              <Link
                to={isLinkDisabled(item.path) ? undefined : item.path}
                className="navLink"
                style={{
                  pointerEvents: isLinkDisabled(item.path) ? 'none' : '',
                }}
              >
                <div
                  className={`forIcon ${location.pathname === item.path ? 'active' : ''} ${
                    pressedPath === item.path ? 'pressed' : ''
                  }`}
                  style={{
                    background: isLinkDisabled(item.path)
                      ? 'rgb(32,32,32)'
                      : '',
                    pointerEvents: isLinkDisabled(item.path) ? 'none' : '',
                  }}
                >
                  <img
                    src={isLinkDisabled(item.path) ? lock : item.icon}
                    style={{
                      width: isLinkDisabled(item.path) ? '24px' : '',
                      height: isLinkDisabled(item.path) ? '24px' : '',
                    }}
                    alt={item.label}
                  />
                </div>
                <p>{item.label}</p>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
