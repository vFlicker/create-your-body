import './profile.css';

import { JSX, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import {
  MeasurementsTable,
  useBodyMeasurements,
  UserDataTable,
  UserMeta,
  useUpdateUser,
  useUser,
} from '~/entities/user';
import zamer from '~/shared/assets/img/measurements.jpeg';
import chart from '~/shared/assets/svg/chart.svg';
import close from '~/shared/assets/svg/close.svg';
import editIconSrc from '~/shared/assets/svg/editSmall.svg';
import exit from '~/shared/assets/svg/exit.svg';
import history from '~/shared/assets/svg/history.svg';
import right from '~/shared/assets/svg/right.svg';
import settings from '~/shared/assets/svg/settings.svg';
import { useUserSession } from '~/shared/store';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/Button';
import { IconButton } from '~/shared/ui/IconButton';
import { Loader } from '~/shared/ui/Loader';
import { PhotoEditor } from '~/shared/ui/PhotoEditor';

import { Toggler } from '../../shared/ui/Toggler';
import { calculateDifference, formatDate } from './profileLib';

export function ProfilePage(): JSX.Element {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHistoryPressed, setIsHistoryPressed] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { user } = useUser();
  const { query } = useUserSession();

  const { bodyMeasurements, isBodyMeasurementsPending } = useBodyMeasurements();

  useEffect(() => {
    if (historyOpen) {
      document.body.classList.add('history-open');
    } else {
      document.body.classList.remove('history-open');
    }

    return () => {
      document.body.classList.remove('history-open');
    };
  }, [historyOpen]);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleTouchStart = () => setIsPressed(true);
  const handleTouchEnd = () => setIsPressed(false);

  const handleHistoryMouseDown = () => setIsHistoryPressed(true);
  const handleHistoryMouseUp = () => setIsHistoryPressed(false);
  const handleHistoryTouchStart = () => setIsHistoryPressed(true);
  const handleHistoryTouchEnd = () => setIsHistoryPressed(false);

  const { updateUser } = useUpdateUser();

  const handleSelectorClick = async (level) => {
    updateUser({ userQuery: query, userData: { user_level: level } });
  };

  const handleCloseHistory = () => {
    setIsClosing(true);
    setTimeout(() => {
      setHistoryOpen(false);
      setIsClosing(false);
    }, 800); // Время анимации
  };

  let firstParameters = bodyMeasurements && bodyMeasurements.at(-1);
  let lastParameters = bodyMeasurements && bodyMeasurements[0];
  if (bodyMeasurements?.length === 1) {
    firstParameters = null;
    lastParameters = bodyMeasurements[0];
  }

  return (
    <div
      className="profilePage"
      style={{
        height: isBodyMeasurementsPending
          ? 'calc(100vh - 160px)'
          : 'fit-content',
      }}
    >
      {historyOpen &&
        createPortal(
          <div
            className={`profileHistoryContainer ${isClosing ? 'closing' : ''}`}
          >
            <div className="profileHistoryContent">
              <h3>История прогресса</h3>
              <button className="exitHistory" onClick={handleCloseHistory}>
                <img src={exit} alt="Выйти" />
              </button>
              <div className="profileHistoryList">
                {bodyMeasurements &&
                  bodyMeasurements.map((parameter, index) => (
                    <div key={index} className="profileHistoryItem">
                      <div className="historyDate">
                        <p>{formatDate(parameter.created_at)}</p>
                      </div>
                      <div className="historyParameters">
                        <div className="historyParameter">
                          <p>Обхват груди:</p>
                          <span>
                            {parameter.chest}
                            {index > 0 && (
                              <span
                                className={
                                  parameter.chest -
                                    bodyMeasurements[index - 1].chest >
                                  0
                                    ? 'positive'
                                    : 'negative'
                                }
                                style={{ width: 'auto' }}
                              >
                                {calculateDifference(
                                  parameter.chest,
                                  bodyMeasurements[index - 1].chest,
                                )}
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="historyParameter">
                          <p>Обхват талии:</p>
                          <span>
                            {parameter.waist}
                            {index > 0 && (
                              <span
                                className={
                                  parameter.waist -
                                    bodyMeasurements[index - 1].waist >
                                  0
                                    ? 'positive'
                                    : 'negative'
                                }
                                style={{ width: 'auto' }}
                              >
                                {calculateDifference(
                                  parameter.waist,
                                  bodyMeasurements[index - 1].waist,
                                )}
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="historyParameter">
                          <p>Обхват живота:</p>
                          <span>
                            {parameter.abdominal_circumference}
                            {index > 0 && (
                              <span
                                className={
                                  parameter.abdominal_circumference -
                                    bodyMeasurements[index - 1]
                                      .abdominal_circumference >
                                  0
                                    ? 'positive'
                                    : 'negative'
                                }
                                style={{ width: 'auto' }}
                              >
                                {calculateDifference(
                                  parameter.abdominal_circumference,
                                  bodyMeasurements[index - 1]
                                    .abdominal_circumference,
                                )}
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="historyParameter">
                          <p>Обхват бедер:</p>
                          <span>
                            {parameter.hips}
                            {index > 0 && (
                              <span
                                className={
                                  parameter.hips -
                                    bodyMeasurements[index - 1].hips >
                                  0
                                    ? 'positive'
                                    : 'negative'
                                }
                                style={{ width: 'auto' }}
                              >
                                {calculateDifference(
                                  parameter.hips,
                                  bodyMeasurements[index - 1].hips,
                                )}
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="historyParameter">
                          <p>Обхват ноги:</p>
                          <span>
                            {parameter.legs}
                            {index > 0 && (
                              <span
                                className={
                                  parameter.legs -
                                    bodyMeasurements[index - 1].legs >
                                  0
                                    ? 'positive'
                                    : 'negative'
                                }
                                style={{ width: 'auto' }}
                              >
                                {calculateDifference(
                                  parameter.legs,
                                  bodyMeasurements[index - 1].legs,
                                )}
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="historyParameter">
                          <p>Вес:</p>
                          <span>
                            {parameter.weight}
                            {index > 0 && (
                              <span
                                className={
                                  parameter.weight -
                                    bodyMeasurements[index - 1].weight >
                                  0
                                    ? 'positive'
                                    : 'negative'
                                }
                                style={{ width: 'auto' }}
                              >
                                {calculateDifference(
                                  parameter.weight,
                                  bodyMeasurements[index - 1].weight,
                                )}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <button className="exitHistoryBtn" onClick={handleCloseHistory}>
              <img src={exit} alt="Выйти" />
              <p>Выйти</p>
            </button>
          </div>,
          document.body,
        )}

      <div
        className="profileContainer"
        style={{ height: isBodyMeasurementsPending ? '100%' : 'auto' }}
      >
        {isBodyMeasurementsPending ? (
          <Loader />
        ) : lastParameters ? (
          <div className="dataHave">
            <div
              className="profile"
              style={{ justifyContent: 'space-between' }}
            >
              <UserMeta view="name" />

              <IconButton
                iconSrc={editIconSrc}
                onClick={() => navigate('/parameters')}
              />
            </div>
            <div className="settings">
              <div className="set" onClick={() => setOpen(!open)}>
                <img src={settings} alt="Настройки" />
                <p>Настроить уровень сложности</p>
                <img
                  className="toggle"
                  src={right}
                  style={{ opacity: open ? '0' : '1' }}
                  alt="Настроить уровень сложности"
                />
                <img
                  className="toggle"
                  src={close}
                  style={{ opacity: open ? '1' : '0' }}
                  alt="Настроить уровень сложности"
                />
              </div>
              {open && (
                <Toggler
                  backgroundColor={Color.White}
                  values={['Новичок', 'Профи']}
                  activeValue={user.user_level}
                  onClick={handleSelectorClick}
                />
              )}
            </div>
            <div className="recordText">
              <h4>Запись прогресса</h4>
              <p>
                Чтобы отслеживать прогресс необходимо в конце каждой недели
                обновлять параметры.
              </p>
            </div>
            <button
              className="recordBtn"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={() => navigate('/record')}
              style={{
                background: isPressed ? '#C0C0C0' : '',
                borderColor: isPressed ? '#C0C0C0' : '',
              }}
            >
              <img src={chart} alt="Записать прогресс" />
              <p>Записать прогресс</p>
            </button>
            <button
              className="recordBtn"
              onMouseDown={handleHistoryMouseDown}
              onMouseUp={handleHistoryMouseUp}
              onTouchStart={handleHistoryTouchStart}
              onTouchEnd={handleHistoryTouchEnd}
              onClick={() => setHistoryOpen(!historyOpen)}
              style={{
                background: isHistoryPressed ? '#C0C0C0' : '',
                borderColor: isHistoryPressed ? '#C0C0C0' : '',
              }}
            >
              <img src={history} alt="История прогресса" />
              <p>История прогресса</p>
            </button>

            <UserDataTable />
            <MeasurementsTable />

            <div className="photosContainerBefore">
              <h3>Фотографии</h3>
              <p>До и после тренировочной недели</p>
              <div className="photosBefore">
                <PhotoEditor label="Фото до" userQuery={query} stage="before" />
                <PhotoEditor
                  label="Фото после"
                  userQuery={query}
                  stage="after"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <UserMeta />

            <div className="settings">
              <div className="set" onClick={() => setOpen(!open)}>
                <img src={settings} alt="Настройки" />
                <p>Настроить уровень сложности</p>
                <img
                  className="toggle"
                  src={right}
                  style={{ opacity: open ? '0' : '1' }}
                  alt="Настроить уровень сложности"
                />
                <img
                  className="toggle"
                  src={close}
                  style={{ opacity: open ? '1' : '0' }}
                  alt="Настроить уровень сложности"
                />
              </div>
              {open && (
                <Toggler
                  backgroundColor={Color.White}
                  values={['Новичок', 'Профи']}
                  activeValue={user.user_level}
                  onClick={handleSelectorClick}
                />
              )}
            </div>
            <div className="zamer">
              <img src={zamer} alt="Важность замеров" />
            </div>
            <div className="profileInfo">
              <h4>Почему важно сделать фото и замеры?</h4>
              <p>
                Полагаться только на весы нет смысла. (советую взвешиваться не
                чаще чем раз в неделю на программе).
              </p>
              <div
                style={{
                  padding: '8px 16px',
                  background: '#CEC8FF',
                  borderRadius: '14px',
                }}
              >
                <p>
                  Вес может скакать изо дня в день, особенно если вы начинаете
                  ходить в зал. Это нормально.
                </p>
              </div>
              <p>
                Также помним, что один и тот же вес будет смотреться на разных
                девушках по-разному! Все зависит от соотношения жира и мышц в
                организме.
              </p>
              <div
                style={{
                  padding: '8px 16px',
                  background: '#E6FFAD',
                  borderRadius: '14px',
                }}
              >
                <p>
                  Поэтому ни с кем себя не сравниваем! Сравниваем только с собой
                  из вчера!
                </p>
              </div>
            </div>
            <Button color="accent" onClick={() => navigate('/parameters')}>
              Добавить параметры
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
