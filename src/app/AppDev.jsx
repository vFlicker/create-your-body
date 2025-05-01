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

import { BeginPage } from '~/pages1/begin1';
import { CommunicationPage } from '~/pages1/communication1';
import { DashboardPage } from '~/pages1/dashboard1';
import { FoodPage } from '~/pages1/food1';
import { LecturesPage } from '~/pages1/lectures1';
import { NoEntryPage } from '~/pages1/noEntry1';
import { ParametersPage, ProfilePage, RecordPage } from '~/pages1/profile1';
import { QuizPage } from '~/pages1/quiz1';
import { RecipesPage } from '~/pages1/recipes1';
import { ResultPage } from '~/pages1/result1';
import { StartPage } from '~/pages1/start1';
import { TrainPage } from '~/pages1/train1';
import { apiService, BASE_API_URL, extractErrorLogData } from '~/shared/api';

import ButtonBack from '../Components/Button/ButtonBack';
import ButtonClose from '../Components/Button/ButtonClose';
import Loader from '../Components/Loader/Loader';
import Nav from '../Components/Nav/Nav';
import PageTransition from '../Components/PageTransition/PageTransition';

const QUERY_ID =
  'query_id=AAHeQjUqAgAAAN5CNSphXg-_&user=%7B%22id%22%3A5003100894%2C%22first_name%22%3A%22Vladyslav%22%2C%22last_name%22%3A%22Sliusar%22%2C%22username%22%3A%22vFlicker%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FuDnD8SAXAvwYTy_EsnWuicjYOryNK03zY2-bxDXnzn9GogyZmGEjYaD9xuNa7Glc.svg%22%7D&auth_date=1746115559&signature=ntEo5NStvuDC5iFb5eL7h0PToBCPu4wDPPT3SdmZMLmqG-UpGS7n98k4rE0B0D6hqvgS9kucLOcU85wfymuvBw&hash=372c96f818d87bff896af566daa37b9115d3bf90d8da1d93c49281284448b4d6';

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

      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
      const currentUserQuery = window.Telegram.WebApp.initData;
      console.log({ telegram: window.Telegram });

      setUserId(telegramUser.id);
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
    <BrowserRouter>
      {isLoading ? (
        <Loader height="100vh" />
      ) : (
        <Routes>
          {hasAccess ? (
            <Route path="/" element={<Layout data={data} />}>
              <Route index element={<StartPage data={data} />} />
              <Route
                path="quiz"
                element={<QuizPage userQuery={userQuery} data={data} />}
              />
              <Route
                path="result"
                element={<ResultPage userQuery={userQuery} userId={userId} />}
              />
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
                  <ProfilePage
                    data={data}
                    userQuery={userQuery}
                    userId={userId}
                    setData={setData}
                  />
                }
              />
              <Route
                path="parameters"
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
                path="record"
                element={<RecordPage data={data} userId={userId} />}
              />
              <Route
                path="communication"
                element={<CommunicationPage data={data} />}
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
