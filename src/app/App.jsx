import './index.css';
import './App.css';

import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { BeginPage } from '~/pages/begin';
import { CommunicationPage } from '~/pages/communication';
import { DashboardPage } from '~/pages/dashboard';
import { FoodPage } from '~/pages/food';
import { LecturesPage } from '~/pages/lectures';
import { NoEntryPage } from '~/pages/noEntry';
import { ParametersPage, ProfilePage, RecordPage } from '~/pages/profile';
import { QuizPage } from '~/pages/quiz';
import { RecipesPage } from '~/pages/recipes';
import { ResultPage } from '~/pages/result';
import { StartPage } from '~/pages/start';
import { TrainPage } from '~/pages/train';
import { BASE_API_URL } from '~/shared/api';

import ButtonBack from '../Components/Button/ButtonBack';
import ButtonClose from '../Components/Button/ButtonClose';
import Loader from '../Components/Loader/Loader';
import Nav from '../Components/Nav/Nav';
import PageTransition from '../Components/PageTransition/PageTransition';

function Layout() {
  const location = useLocation();
  const hiddenPathsBack = ['/', '/quiz', '/result', '/dashboard'];
  const showControlsBack = !hiddenPathsBack.includes(location.pathname);
  const hiddenPathsNav = ['/', '/quiz', '/result', '/noentry'];
  const showControlsNav = !hiddenPathsNav.includes(location.pathname);

  return (
    <>
      <div className="header">
        {showControlsBack && <ButtonBack />}
        <ButtonClose />
      </div>
      <div className="App">
        <div className="page-transition-container">
          <AnimatePresence mode="sync">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
        {showControlsNav && <Nav />}
      </div>
    </>
  );
}

export function App() {
  const [userId, setUserId] = useState(''); // Тестовый ID пользователя
  const [data, setData] = useState(null);
  const [base, setBase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((...args) => {
    const msg = args
      .map((arg) => {
        try {
          return typeof arg === 'object'
            ? JSON.stringify(arg, null, 2)
            : String(arg);
        } catch {
          return String(arg);
        }
      })
      .join(' ');

    setLogs((prevLogs) => [...prevLogs, msg]);
  }, []);

  useEffect(() => {
    addLog('Проверка окружения:');
    addLog('window.Telegram:', !!window.Telegram, window.Telegram);
    addLog(
      'window.Telegram.WebApp:',
      !!(window.Telegram && window.Telegram.WebApp),
      window.Telegram.WebApp,
    );
    addLog('User Agent:', navigator.userAgent);
    addLog('Платформа:', navigator.userAgentData?.platform || 'Неизвестно');

    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.disableVerticalSwipes();

      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
      setUserId(telegramUser.id);
      addLog('Telegram User ID:', telegramUser.id);
      addLog('Telegram User Photo URL:', telegramUser.photo_url);

      const addImage = async () => {
        const image =
          telegramUser.photo_url && typeof telegramUser.photo_url === 'string'
            ? telegramUser.photo_url
            : '';
        const imageData = {
          user_tg_id: String(telegramUser.id),
          image: image,
        };

        addLog('Отправляемые данные для изображения:', imageData);

        const params = new URLSearchParams(imageData).toString();

        try {
          const response = await axios.post(
            `${BASE_API_URL}/api/v1/user/image?${params}`,
            null,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          addLog('Ответ сервера на запрос изображения:', response.data);
        } catch (error) {
          const errorDetails = {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: {
              url: error.config?.url,
              method: error.config?.method,
              headers: error.config?.headers,
            },
          };
          addLog(
            'Ошибка при отправке изображения:',
            JSON.stringify(errorDetails, null, 2),
          );
        }
      };

      const addUser = async () => {
        try {
          const response = await axios.get(`${BASE_API_URL}/api/v1/user`, {
            params: { user_id: telegramUser.id },
          });
          addLog('Ответ сервера на запрос пользователя:', response.data);
          setData(response.data);
          const userTarif = response.data.user_tarif || '';
          const isBase = userTarif.trim().includes('Base');
          setBase(isBase);
          addLog('Тариф пользователя:', userTarif, 'Base:', isBase);
        } catch (error) {
          const errorDetails = {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: {
              url: error.config?.url,
              method: error.config?.method,
              headers: error.config?.headers,
            },
          };
          addLog(
            'Ошибка при получении данных пользователя:',
            JSON.stringify(errorDetails, null, 2),
          );
          setData(null);
        }
      };

      const fetchData = async () => {
        try {
          setIsLoading(true);
          await Promise.all([addImage(), addUser()]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      addLog('Telegram WebApp API не найден');
      setIsLoading(false);
    }
  }, []);

  // Проверка: есть ли data и data.user_tarif
  const hasAccess = data && data.user_tarif && data.user_tarif.trim() !== '';

  useEffect(() => {
    addLog('Проверка условия доступа:');
    addLog('data:', data);
    addLog('data.user_tarif:', data?.user_tarif);
    addLog('data.user_tarif.trim():', data?.user_tarif?.trim());
    addLog('data.user_tarif.trim() !== "":', data?.user_tarif?.trim() !== '');
    addLog('Итоговое условие hasAccess:', hasAccess);
  }, [data, hasAccess, addLog]);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Loader height="100vh" />
      ) : (
        <Routes>
          {hasAccess ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<StartPage data={data} />} />
              <Route path="quiz" element={<QuizPage userId={userId} />} />
              <Route path="result" element={<ResultPage userId={userId} />} />
              <Route
                path="dashboard"
                element={
                  <DashboardPage data={data} userId={userId} base={base} />
                }
              />
              <Route
                path="begin"
                element={<BeginPage data={data} userId={userId} />}
              />
              <Route
                path="profile"
                element={
                  <ProfilePage data={data} userId={userId} setData={setData} />
                }
              />
              <Route
                path="parameters"
                element={
                  <ParametersPage
                    data={data}
                    userId={userId}
                    setData={setData}
                  />
                }
              />
              <Route
                path="record"
                element={<RecordPage data={data} userId={userId} />}
              />
              <Route
                path="communication"
                element={
                  <CommunicationPage data={data} userId={userId} base={base} />
                }
              />
              <Route
                path="train"
                element={
                  <TrainPage
                    data={data}
                    userId={userId}
                    level={data.user_level}
                    base={base}
                  />
                }
              />
              <Route
                path="food"
                element={<FoodPage data={data} userId={userId} />}
              />
              <Route
                path="lectures"
                element={
                  <LecturesPage
                    data={data}
                    userId={userId}
                    level={data.user_level}
                  />
                }
              />
              <Route
                path="recipes"
                element={<RecipesPage data={data} userId={userId} />}
              />
            </Route>
          ) : (
            <Route
              path="*"
              element={<NoEntryPage logs={logs} addLog={addLog} />}
            />
          )}
        </Routes>
      )}
    </BrowserRouter>
  );
}
