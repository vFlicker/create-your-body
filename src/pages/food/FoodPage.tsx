import './FoodPage.css';
import '../communication/CommunicationPage.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Profile } from '~/entities/user';
import { apiService } from '~/shared/api';
import food from '~/shared/assets/nav/food.svg';
import copy from '~/shared/assets/svg/copy.svg';
import help from '~/shared/assets/svg/help.svg';
import { Loader } from '~/shared/ui/Loader';
import { PdfViewer } from '~/widget/pdfViewer/PdfViewer';

import Button from '../../Components/Button/Button';
import FoodContainer from '../../Components/Container/FoodContainer';
import { TelegramLinkButton } from '../communication/CommunicationPage';

export function FoodPage({ data, userId, userQuery }) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataFood, setDataFood] = useState(null);
  const [selectedPdfId, setSelectedPdfId] = useState(null);
  const [errorsContainer, setErrorsContainer] = useState(false);
  const [allowedUserIds, setAllowedUserIds] = useState([]);

  // Получение разрешенных ID с сервера
  useEffect(() => {
    const fetchAllowedIds = async () => {
      try {
        const response = await axios.get('https://hmns-test.ru/cyb/');
        // Преобразуем все ID в строки
        const stringIds = response.data.map((id) => id.toString());
        setAllowedUserIds(stringIds);
      } catch (err) {
        console.error('Ошибка при получении разрешенных ID:', err);
      }
    };

    fetchAllowedIds();
  }, []);

  // Проверка, имеет ли пользователь доступ к просмотру логов
  const canViewLogs = allowedUserIds.includes(userId?.toString());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getNutritionPlanCategories(userQuery);
        setDataFood(response.data);
      } catch (err) {
        console.error('Ошибка при получении данных о питании:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    setSelectedPdfId(null);
  };

  useEffect(() => {
    if (selectedPdfId) {
      window.handleBack = handleBack;
      document.body.setAttribute('data-handle-back', 'true');
    } else {
      window.handleBack = null;
      document.body.removeAttribute('data-handle-back');
    }
    return () => {
      window.handleBack = null;
      document.body.removeAttribute('data-handle-back');
    };
  }, [selectedPdfId]);

  return (
    <div className="foodPage">
      {canViewLogs && (
        <button
          className="errorBtn"
          style={{ bottom: 'unset', top: '100px' }}
          onClick={() => setErrorsContainer(!errorsContainer)}
        >
          <img src={help} alt="help" />
        </button>
      )}
      {errorsContainer &&
        createPortal(
          <div className="errorsContainer">
            <p>
              Здравствуйте!
              <br />
              <br />
              Это окно предназначено для просмотра логов приложения.
              <br />
              <br />
              Пожалуйста, скопируйте текст логов нажав на кнопку
              &quot;Скопировать все&quot; и отправьте его нам в чат поддержки.
              <br />
              <br />
              Спасибо!
            </p>
            <div className="logsContainer">
              {logs.map((log, index) => (
                <div key={index} className="logItem">
                  <pre>{log}</pre>
                </div>
              ))}
            </div>
            <div className="supportBtn">
              <Button
                bg={'#CBFF52'}
                bgFocus={'#EBFFBD'}
                color={'#0d0d0d'}
                icon={copy}
                text={'Скопировать все'}
                onClick={() => navigator.clipboard.writeText(logs.join('\n'))}
                width={'100%'}
              />
              <TelegramLinkButton
                username={'zabotaCYB'}
                buttonText="Поддержка"
                icon={help}
                style={{ width: '100%' }}
              />
              <Button
                bg={'#0D0D0D'}
                bgFocus={'#A799FF'}
                color={'#fff'}
                text={'Выйти'}
                onClick={() => setErrorsContainer(false)}
                width={'100%'}
              />
            </div>
          </div>,
          document.body,
        )}

      <div className="topFood">
        <Profile level={data?.user_level} photoSrc={data?.image} />
        <div className="topFoodTitle">
          <img src={food} alt="logo" />
          <h1 style={{ fontSize: '24px' }}>Питание</h1>
        </div>
      </div>
      <div className="botFood">
        <div
          className={`content-wrapper-food ${selectedPdfId ? 'slide-left' : ''}`}
          style={{
            width: isLoading ? '100%' : '',
            height: isLoading ? '100%' : '',
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <div
              className="foodList"
              style={{ height: selectedPdfId ? '50vh' : '' }}
            >
              {dataFood?.data?.map((item) => (
                <FoodContainer
                  key={item.id}
                  title={item.title}
                  icon={item.iconUrl}
                  iconAlt={item.title}
                  onClick={() => setSelectedPdfId(item.id)}
                  foodId={item.id}
                />
              ))}
            </div>
          )}
          {selectedPdfId && (
            <div className={`pdf-wrapper ${selectedPdfId ? 'slide-in' : ''}`}>
              <PdfViewer
                userQuery={userQuery}
                userId={userId}
                pdfId={selectedPdfId}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
