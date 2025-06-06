import './profile.css';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Profile, useCreateBodyMeasurements, useUser } from '~/entities/user';
import { useUserSession } from '~/shared/store';
import { Button } from '~/shared/ui/Button';

const InputPair = ({ labels, values, onChange, handleBlur, handleFocus }) => (
  <div className="inputPair" style={{ display: 'flex' }}>
    {labels.map((label, i) => (
      <div key={label} className="inputGroup">
        <label>{label}</label>
        <input
          type="text"
          value={values[i] || ''}
          onChange={onChange(i)}
          placeholder="0"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    ))}
  </div>
);

export function RecordPage() {
  const navigate = useNavigate();

  const { id, query } = useUserSession();
  const { user } = useUser();

  const formRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState({
    chest: '',
    waist: '',
    abdominal_circumference: '',
    hips: '',
    legs: '',
    weight: '',
  });

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      const platform = tg.platform.toLowerCase();
      setIsMobile(!['tdesktop', 'macos', 'linux', 'web'].includes(platform));
    }
  }, []);

  const { createBodyMeasurementsMutate } = useCreateBodyMeasurements();

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const userBodyParameters = {
        tg_id: String(id),
        chest: parseInt(formData.chest, 10) || 0,
        waist: parseInt(formData.waist, 10) || 0,
        abdominal_circumference:
          parseInt(formData.abdominal_circumference, 10) || 0,
        legs: parseInt(formData.legs, 10) || 0,
        hips: parseInt(formData.hips, 10) || 0,
        weight: parseInt(formData.weight, 10) || 0,
      };

      createBodyMeasurementsMutate({
        userQuery: query,
        parameters: userBodyParameters,
      });

      console.log('Данные сохранены', formData);
      navigate('/profile');
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error.message);
    }
  };

  const handleFocus = (e) => {
    if (!isMobile || !formRef.current) return;
    const input = e.target;
    const container = formRef.current;
    const containerRect = container.getBoundingClientRect();
    const inputRect = input.getBoundingClientRect();
    const relativeLeft = inputRect.left - containerRect.left;
    const relativeTop = inputRect.top - containerRect.top;
    const originX = (relativeLeft / containerRect.width) * 130;
    const originY = (relativeTop / containerRect.height) * 130;
    container.style.transformOrigin = `${originX}% ${originY}%`;
    container.style.transform = `scale(1.5)`;
    container.style.transition = 'transform 150ms ease-in-out';
    const scrollOffset =
      inputRect.top - containerRect.top - containerRect.height * 0.3;
    container.scrollTo({
      top: container.scrollTop + scrollOffset,
      behavior: 'smooth',
    });
  };

  const handleBlur = () => {
    if (!isMobile || !formRef.current) return;
    const container = formRef.current;
    container.style.transform = 'none';
    container.style.transition = 'transform 150ms ease-in-out';
  };

  const inputPairs = [
    { labels: ['Обхват груди', 'Обхват талии'], fields: ['chest', 'waist'] },
    {
      labels: ['Обхват живота', 'Обхват бедер'],
      fields: ['abdominal_circumference', 'hips'],
    },
    { labels: ['Обхват ноги', 'Вес'], fields: ['legs', 'weight'] },
  ];

  return (
    <div
      className="profilePage"
      ref={formRef}
      style={{ flex: '1', display: 'flex', height: 'calc(100% - 70px)' }}
    >
      <div className="profileContainer">
        <div className="profile" style={{ justifyContent: 'space-between' }}>
          <div className="profileData">
            <Profile
              level={user.user_level}
              photoSrc={user.image}
              isShowInfo={false}
            />
            <div className="profileName">
              <p>{user?.name || 'Имя'}</p>
              <span>{user?.user_level || 'Уровень'}</span>
            </div>
          </div>
        </div>
        <div className="recordYourProgress">
          <h3>Запишите свой прогресс</h3>
          <div className="inputsSection">
            {inputPairs.map(({ labels, fields }) => (
              <InputPair
                key={labels[0]}
                labels={labels}
                values={[formData[fields[0]], formData[fields[1]]]}
                onChange={(i) => handleChange(fields[i])}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
              />
            ))}
          </div>
          <Button color="secondary" onClick={handleSubmit}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
