import './StartPage.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import element from '~/shared/assets/img/element.png';
import startPhoto from '~/shared/assets/img/start.jpg';
import { Button } from '~/shared/ui/Button';
import { Icon } from '~/shared/ui/Icon';

import ImageOverlay from '../../Components/ImageOverley';
import Loader from '../../Components/Loader/Loader';

const buttonConfig = {
  start: {
    text: 'Начать',
    Icon: <Icon name="icon-run" />,
  },
  training: {
    text: 'К тренировкам',
    Icon: <Icon name="icon-muscles" />,
  },
};

export function StartPage({ data }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({
    startPhoto: false,
    element: false,
  });

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.setBackgroundColor('#fff');
    }
  }, []);

  useEffect(() => {
    const startPhotoImg = new Image();
    const elementImg = new Image();

    startPhotoImg.src = startPhoto;
    elementImg.src = element;

    startPhotoImg.onload = () => {
      setLoadedImages((prev) => ({ ...prev, startPhoto: true }));
      checkAllImagesLoaded({ ...loadedImages, startPhoto: true });
    };

    elementImg.onload = () => {
      setLoadedImages((prev) => ({ ...prev, element: true }));
      checkAllImagesLoaded({ ...loadedImages, element: true });
    };
  }, [loadedImages]);

  const checkAllImagesLoaded = (newLoadedImages) => {
    if (newLoadedImages.startPhoto && newLoadedImages.element) {
      setIsLoading(false);
    }
  };

  function handleButtonClick() {
    if (data.born_date) {
      navigate('/dashboard');
    } else {
      navigate('/quiz');
    }
  }

  const buttonType = data.born_date ? 'training' : 'start';

  return (
    <div className="startPage">
      <div className="imgContainer">
        {isLoading && <Loader />}
        <img className="green" src={element} alt="Зеленый фон" />
        <ImageOverlay overlayImageSrc={startPhoto} maskImageSrc={element} />
      </div>
      <div className="startDown">
        <div className="startPadding">
          <div className="startText">
            <h1>
              CREATE
              <br />
              YOUR <span>BODY</span>
            </h1>
            <p>Построй тело своей мечты</p>
          </div>
          <Button
            color="neutral"
            icon={buttonConfig[buttonType].Icon}
            onClick={handleButtonClick}
          >
            {buttonConfig[buttonType].text}
          </Button>
        </div>
      </div>
    </div>
  );
}
