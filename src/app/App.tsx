import './index.css';

import styled from '@emotion/styled';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { useUser } from '~/entities/user';
import { BackButton } from '~/features/BackButton';
import { CloseButton } from '~/features/CloseButton';
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
import { BASE_API_URL, extractErrorLogData } from '~/shared/api';
import { AppRoute } from '~/shared/router';
import { Loader } from '~/shared/ui/Loader';
import { Nav } from '~/widget/nav';

import PageTransition from '../Components/PageTransition/PageTransition';
import { withProviders } from './providers';

const QUERY_ID =
  'query_id=AAHeQjUqAgAAAN5CNSphXg-_&user=%7B%22id%22%3A5003100894%2C%22first_name%22%3A%22Vladyslav%22%2C%22last_name%22%3A%22Sliusar%22%2C%22username%22%3A%22vFlicker%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FuDnD8SAXAvwYTy_EsnWuicjYOryNK03zY2-bxDXnzn9GogyZmGEjYaD9xuNa7Glc.svg%22%7D&auth_date=1746115559&signature=ntEo5NStvuDC5iFb5eL7h0PToBCPu4wDPPT3SdmZMLmqG-UpGS7n98k4rE0B0D6hqvgS9kucLOcU85wfymuvBw&hash=372c96f818d87bff896af566daa37b9115d3bf90d8da1d93c49281284448b4d6';

export const AppWithProviders = withProviders(App);

function Layout() {
  const location = useLocation();
  const hiddenPathsBack = ['/', '/quiz', '/result', '/dashboard'];
  const showControlsBack = !hiddenPathsBack.includes(location.pathname);
  const hiddenPathsNav = ['/', '/quiz', '/result', '/noentry'];
  const showControlsNav = !hiddenPathsNav.includes(location.pathname);

  return (
    <>
      <StyledHeader>
        {showControlsBack && <BackButton />}
        <CloseButton />
      </StyledHeader>
      <StyledMain>
        <div className="page-transition-container">
          <AnimatePresence mode="sync">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
        {showControlsNav && <Nav />}
      </StyledMain>
    </>
  );
}

export function App() {
  const [userId, setUserId] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  /**
   * Раніше ми мали стейт: [data, setData] = useState(null);
   */
  const setData = () => {};

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
      const currentUserQuery = window.Telegram.WebApp.initData || QUERY_ID;
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

      const fetchData = async () => {
        try {
          setIsLoading(true);
          await Promise.all([addImage()]);
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

  const { user, isUserPending } = useUser(userQuery);

  // Проверка: есть ли data и data.user_tarif
  const user_tarif = user?.user_tarif.trim() || '';
  const hasAccess = user_tarif !== '';
  const base = user_tarif.includes('Base');

  useEffect(() => {
    addLog('Проверка условия доступа:');
    addLog('user:', user);
    addLog('user.user_tarif:', user?.user_tarif);
    addLog('user.user_tarif.trim():', user?.user_tarif?.trim());
    addLog('user.user_tarif.trim() !== "":', user?.user_tarif?.trim() !== '');
    addLog('Итоговое условие hasAccess:', hasAccess);
  }, [user, hasAccess, addLog]);

  return (
    <>
      {isLoading || isUserPending ? (
        <Loader />
      ) : (
        <Routes>
          {hasAccess ? (
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <StartPage type={user.born_date ? 'training' : 'start'} />
                }
              />
              <Route
                path={AppRoute.Quiz}
                element={<QuizPage userQuery={userQuery} data={user} />}
              />
              <Route
                path={AppRoute.Result}
                element={<ResultPage userQuery={userQuery} userId={userId} />}
              />
              <Route
                path={AppRoute.Dashboard}
                element={
                  <DashboardPage data={user} userId={userId} base={base} />
                }
              />
              <Route
                path={AppRoute.Begin}
                element={<BeginPage data={user} userId={userId} />}
              />
              <Route
                path={AppRoute.Profile}
                element={
                  <ProfilePage
                    data={user}
                    userQuery={userQuery}
                    setData={setData}
                  />
                }
              />
              <Route
                path={AppRoute.Parameters}
                element={
                  <ParametersPage
                    data={user}
                    userId={userId}
                    userQuery={userQuery}
                    setData={setData}
                  />
                }
              />
              <Route
                path={AppRoute.Record}
                element={
                  <RecordPage
                    data={user}
                    userQuery={userQuery}
                    userId={userId}
                  />
                }
              />
              <Route
                path={AppRoute.Communication}
                element={<CommunicationPage data={user} />}
              />
              <Route
                path={AppRoute.Traning}
                element={
                  <TrainPage
                    userQuery={userQuery}
                    data={user}
                    userId={userId}
                    level={user.user_level}
                    base={base}
                  />
                }
              />
              <Route
                path={AppRoute.Food}
                element={
                  <FoodPage data={user} userId={userId} userQuery={userQuery} />
                }
              />
              <Route
                path={AppRoute.Lectures}
                element={
                  <LecturesPage
                    data={user}
                    userId={userId}
                    userQuery={userQuery}
                    level={user.user_level}
                  />
                }
              />
              <Route
                path={AppRoute.Recipes}
                element={<RecipesPage data={user} userQuery={userQuery} />}
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
    </>
  );
}

const StyledHeader = styled.div`
  position: absolute;
  top: 16px;
  height: 28px;
  width: 100%;
`;

const StyledMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;
