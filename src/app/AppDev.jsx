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
import { apiService, BASE_API_URL, extractErrorLogData } from '~/shared/api';
import { AppRoute } from '~/shared/router';

import ButtonBack from '../Components/Button/ButtonBack';
import ButtonClose from '../Components/Button/ButtonClose';
import Loader from '../Components/Loader/Loader';
import Nav from '../Components/Nav/Nav';
import PageTransition from '../Components/PageTransition/PageTransition';

function Layout({ data }) {
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
        {showControlsNav && <Nav data={data} />}
      </div>
    </>
  );
}

export function AppDev() {
  const [userId, setUserId] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [data, setData] = useState(null);
  const [base, setBase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user || {};
      const currentUserQuery = window.Telegram.WebApp.initData;
      console.log({ telegram: window.Telegram });

      setUserId(telegramUser.id || '5003100894');
      setUserQuery(currentUserQuery);
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
          const errorText = 'Ошибка при отправке изображения:';
          const errorDetails = extractErrorLogData(error);
          addLog(errorText, JSON.stringify(errorDetails, null, 2));
        }
      };

      const addUser = async () => {
        try {
          const user = await apiService.getUserByQuery(currentUserQuery);
          addLog('Ответ сервера на запрос пользователя:', user);
          setData(user);
          const userTarif = user.user_tarif || '';
          const isBase = userTarif.trim().includes('Base');
          setBase(isBase);
          addLog('Тариф пользователя:', userTarif, 'Base:', isBase);
        } catch (error) {
          const errorText = 'Ошибка при получении данных пользователя:';
          const errorDetails = extractErrorLogData(error);
          addLog(errorText, JSON.stringify(errorDetails, null, 2));
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
    <BrowserRouter basename="/testapp">
      {isLoading ? (
        <Loader height="100vh" />
      ) : (
        <Routes>
          {hasAccess ? (
            <Route path="/" element={<Layout data={data} />}>
              <Route index element={<StartPage data={data} />} />
              <Route
                path={AppRoute.QUIZ}
                element={<QuizPage userQuery={userQuery} data={data} />}
              />
              <Route
                path={AppRoute.RESULT}
                element={<ResultPage userQuery={userQuery} userId={userId} />}
              />
              <Route
                path={AppRoute.DASHBOARD}
                element={
                  <DashboardPage data={data} userId={userId} base={base} />
                }
              />
              <Route
                path={AppRoute.BEGIN}
                element={<BeginPage data={data} userId={userId} />}
              />
              <Route
                path={AppRoute.PROFILE}
                element={
                  <ProfilePage
                    data={data}
                    userQuery={userQuery}
                    userId={userId}
                    setData={setData}
                  />
                }
              />
              <Route
                path={AppRoute.PARAMETERS}
                element={
                  <ParametersPage
                    data={data}
                    userId={userId}
                    userQuery={userQuery}
                    setData={setData}
                  />
                }
              />
              <Route
                path={AppRoute.RECORD}
                element={
                  <RecordPage
                    data={data}
                    userQuery={userQuery}
                    userId={userId}
                  />
                }
              />
              <Route
                path={AppRoute.COMMUNICATION}
                element={<CommunicationPage data={data} />}
              />
              <Route
                path={AppRoute.TRAINING}
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
                path={AppRoute.FOOD}
                element={<FoodPage data={data} userId={userId} />}
              />
              <Route
                path={AppRoute.LECTURES}
                element={
                  <LecturesPage
                    data={data}
                    userId={userId}
                    level={data.user_level}
                  />
                }
              />
              <Route
                path={AppRoute.RECIPES}
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
