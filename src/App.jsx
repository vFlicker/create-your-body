import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import axios from "axios";
import { API_BASE_URL } from './API';

import Loader from "./Components/Loader/Loader";
import PageTransition from "./Components/PageTransition/PageTransition";

import NoEntry from "./Pages/NoEntry/NoEntry";
import ButtonClose from "./Components/Button/ButtonClose";
import ButtonBack from "./Components/Button/ButtonBack";
import Nav from "./Components/Nav/Nav";
import StartPage from "./Pages/StartPage/StartPage";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Begin from "./Pages/Begin/Begin";
import Profile from "./Pages/Profile/Profile";
import Parameters from "./Pages/Profile/Parameters";
import Record from "./Pages/Profile/Record";
import Communication from "./Pages/Communication/Communication";
import Train from "./Pages/Train/Train";
import Food from "./Pages/Food/Food";
import Lectures from "./Pages/Lectures/Lectures";
import Recipes from "./Pages/Recipes/Recipes";
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

function App() {
  const [userId, setUserId] = useState('492999470'); // Тестовый ID пользователя
  const [data, setData] = useState(null);
  const [base, setBase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((...args) => {
    const msg = args.map(arg => {
      try {
        return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
      } catch (e) {
        return String(arg);
      }
    }).join(' ');

    setLogs(prevLogs => [...prevLogs, msg]);
  }, []);

  useEffect(() => {
    addLog('Проверка окружения:');
    addLog('window.Telegram:', !!window.Telegram, window.Telegram);
    addLog('window.Telegram.WebApp:', !!(window.Telegram && window.Telegram.WebApp), window.Telegram.WebApp);
    addLog('User Agent:', navigator.userAgent);
    addLog('Платформа:', navigator.userAgentData?.platform || 'Неизвестно');
    
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.disableVerticalSwipes();

      // const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
      // setUserId(telegramUser.id);
      // addLog('Telegram User ID:', telegramUser.id);
      // addLog('Telegram User Photo URL:', telegramUser.photo_url);

      // const addImage = async () => {
      //   const image = telegramUser.photo_url && typeof telegramUser.photo_url === 'string'
      //     ? telegramUser.photo_url
      //     : '';
      //   const imageData = {
      //     user_tg_id: String(telegramUser.id),
      //     image: image,
      //   };

      //   addLog('Отправляемые данные для изображения:', imageData);

      //   const params = new URLSearchParams(imageData).toString();

      //   try {
      //     const response = await axios.post(`${API_BASE_URL}/api/v1/user/image?${params}`, null, {
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     });
      //     addLog('Ответ сервера на запрос изображения:', response.data);
      //   } catch (error) {
      //     const errorDetails = {
      //       message: error.message,
      //       status: error.response?.status,
      //       statusText: error.response?.statusText,
      //       data: error.response?.data,
      //       config: {
      //         url: error.config?.url,
      //         method: error.config?.method,
      //         headers: error.config?.headers,
      //       }
      //     };
      //     addLog('Ошибка при отправке изображения:', JSON.stringify(errorDetails, null, 2));
      //   }
      // };

      const addUser = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/v1/user`, {
            params: { user_id: userId },
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
            }
          };
          addLog('Ошибка при получении данных пользователя:', JSON.stringify(errorDetails, null, 2));
          setData(null);
        }
      };

      const fetchData = async () => {
        try {
          setIsLoading(true);
          await Promise.all([
            // addImage(), 
            addUser()]);
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
              <Route path="quiz" element={<Quiz userId={userId} />} />
              <Route path="result" element={<Result userId={userId} />} />
              <Route path="dashboard" element={<Dashboard data={data} userId={userId} base={base} />} />
              <Route path="begin" element={<Begin data={data} userId={userId} />} />
              <Route path="profile" element={<Profile data={data} userId={userId} setData={setData} />} />
              <Route path="parameters" element={<Parameters data={data} userId={userId} setData={setData} />} />
              <Route path="record" element={<Record data={data} userId={userId} />} />
              <Route path="communication" element={<Communication data={data} userId={userId} base={base} />} />
              <Route path="train" element={<Train data={data} userId={userId} level={data.user_level} base={base} />} />
              <Route path="food" element={<Food data={data} userId={userId} />} />
              <Route path="lectures" element={<Lectures data={data} userId={userId} level={data.user_level}/>} />
              <Route path="recipes" element={<Recipes data={data} userId={userId} />} />
            </Route>
          ) : (
            <Route path="*" element={<NoEntry logs={logs} addLog={addLog} />} />
          )}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;