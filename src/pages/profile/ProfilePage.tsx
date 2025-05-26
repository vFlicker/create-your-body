import './profile.css';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { useUpdateUser } from '~/entities/user';
import { Profile } from '~/entities/user';
import { useBodyMeasurements } from '~/entities/user/api/useBodyMeasurements';
import zamer from '~/shared/assets/img/zamer.jpeg';
import chart from '~/shared/assets/svg/chart.svg';
import close from '~/shared/assets/svg/close.svg';
import exit from '~/shared/assets/svg/exit.svg';
import history from '~/shared/assets/svg/history.svg';
import right from '~/shared/assets/svg/right.svg';
import settings from '~/shared/assets/svg/settings.svg';
import { Color } from '~/shared/theme/colors';
import { Loader } from '~/shared/ui/Loader';

import Button from '../../Components/Button/Button';
import ButtonEdit from '../../Components/Button/ButtonEdit';
import PhotoEditor from '../../Components/PhotoEditor/PhotoEditor';
import { Toggler } from '../../shared/ui/Toggler';

export function ProfilePage({ userQuery, data }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeLevel, setActiveLevel] = useState(data.user_level);
  const [isPressed, setIsPressed] = useState(false);
  const [isHistoryPressed, setIsHistoryPressed] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const calculateDifference = (current, previous) => {
    if (!previous) return null;
    const diff = current - previous;
    return diff > 0 ? `+${diff}` : diff;
  };

  const { bodyMeasurements, isBodyMeasurementsPending } =
    useBodyMeasurements(userQuery);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#F2F2F2');
    }
  }, []);

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

  const { updateUserMutate } = useUpdateUser();

  const handleSelectorClick = async (level) => {
    setActiveLevel(level);
    updateUserMutate({ userQuery, userData: { user_level: level } });
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
              <div className="profileData">
                <Profile
                  level={data?.user_level}
                  photoSrc={data?.image}
                  isShowInfo={false}
                />
                <div className="profileName">
                  <p>{data?.name || 'Имя'}</p>
                  <span>{data?.user_level || 'Уровень'}</span>
                </div>
              </div>
              <ButtonEdit onClick={() => navigate('/parameters')} />
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
                  activeValue={activeLevel}
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

            <div className="parameters">
              <h3>Параметры</h3>
              <div className="parametersValues">
                <div className="param">
                  <div className="value">
                    <span>Возраст</span>
                    <p>
                      {data?.born_date
                        ? (() => {
                            const birthDate = new Date(data.born_date);
                            const today = new Date();
                            let age =
                              today.getFullYear() - birthDate.getFullYear();
                            const monthDiff =
                              today.getMonth() - birthDate.getMonth();
                            if (
                              monthDiff < 0 ||
                              (monthDiff === 0 &&
                                today.getDate() < birthDate.getDate())
                            ) {
                              age--;
                            }
                            return age;
                          })()
                        : '-'}
                    </p>
                  </div>
                  <div className="value">
                    <span>Пол</span>
                    <p>
                      {data?.sex === 'male'
                        ? 'Мужской'
                        : data?.sex === 'female'
                          ? 'Женский'
                          : '-'}
                    </p>
                  </div>
                </div>
                <div className="param">
                  <div className="value">
                    <span>Обхват груди</span>
                    <p>
                      {lastParameters?.chest}
                      {firstParameters &&
                        lastParameters &&
                        lastParameters.chest - firstParameters.chest < 0 && (
                          <span className="negative">
                            {lastParameters.chest - firstParameters.chest} см
                          </span>
                        )}
                    </p>
                  </div>
                  <div className="value">
                    <span>Обхват талии</span>
                    <p>
                      {lastParameters?.waist}
                      {firstParameters &&
                        lastParameters &&
                        lastParameters.waist - firstParameters.waist < 0 && (
                          <span className="negative">
                            {lastParameters.waist - firstParameters.waist} см
                          </span>
                        )}
                    </p>
                  </div>
                </div>
                <div className="param">
                  <div className="value">
                    <span>Обхват живота</span>
                    <p>
                      {lastParameters?.abdominal_circumference}
                      {firstParameters &&
                        lastParameters &&
                        lastParameters.abdominal_circumference -
                          firstParameters.abdominal_circumference <
                          0 && (
                          <span className="negative">
                            {lastParameters.abdominal_circumference -
                              firstParameters.abdominal_circumference}{' '}
                            см
                          </span>
                        )}
                    </p>
                  </div>
                  <div className="value">
                    <span>Обхват бедер</span>
                    <p>
                      {lastParameters?.hips}
                      {firstParameters &&
                        lastParameters &&
                        lastParameters.hips - firstParameters.hips < 0 && (
                          <span className="negative">
                            {lastParameters.hips - firstParameters.hips} см
                          </span>
                        )}
                    </p>
                  </div>
                </div>
                <div className="param">
                  <div className="value">
                    <span>Обхват ноги</span>
                    <p>
                      {lastParameters?.legs}
                      {firstParameters &&
                        lastParameters &&
                        lastParameters.legs - firstParameters.legs < 0 && (
                          <span className="negative">
                            {lastParameters.legs - firstParameters.legs} см
                          </span>
                        )}
                    </p>
                  </div>
                  <div className="value">
                    <span>Вес</span>
                    <p>
                      {lastParameters?.weight}
                      {firstParameters &&
                        lastParameters &&
                        lastParameters.weight - firstParameters.weight < 0 && (
                          <span className="negative">
                            {lastParameters.weight - firstParameters.weight} кг
                          </span>
                        )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="photosContainerBefore">
              <h3>Фотографии</h3>
              <p>До и после тренировочной недели</p>
              <div className="photosBefore">
                <PhotoEditor
                  label="Фото до"
                  userQuery={userQuery}
                  stage="before"
                />
                <PhotoEditor
                  label="Фото после"
                  userQuery={userQuery}
                  stage="after"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="profile">
              <Profile level={data?.user_level} user_photo={data?.image} />
              <div className="profileName">
                <p>{data?.name || 'Имя'}</p>
                <span>{data?.user_level || 'Уровень'}</span>
              </div>
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
                  activeValue={activeLevel}
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
            <Button
              onClick={() => navigate('/parameters')}
              text="Добавить параметры"
              bg="#A799FF"
              bgFocus="#776CBC"
              color="#F2F2F2"
            />
          </>
        )}
      </div>
    </div>
  );
}
