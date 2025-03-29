import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import axios from "axios";
import { API_BASE_URL } from './API';

import Loader from "./Components/Loader/Loader";
// import PageTransition from "./Components/PageTransition/PageTransition";

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
        <Outlet />
        {showControlsNav && <Nav />}
      </div>
    </>
  );
}

function App() {
  const [userId, setUserId] = useState(''); // Тестовый ID пользователя
  const [data, setData] = useState(null);
  const [base, setBase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
      setUserId(telegramUser.id);
      console.log(telegramUser.id);
      console.log(telegramUser.photo_url);

      const addImage = async () => {
        const image = telegramUser.photo_url && typeof telegramUser.photo_url === 'string'
          ? telegramUser.photo_url
          : '';
        const imageData = {
          user_tg_id: String(telegramUser.id),
          image: image,
        };

        console.log('Отправляемые данные:', imageData);

        const params = new URLSearchParams(imageData).toString();

        try {
          const response = await axios.post(`${API_BASE_URL}/api/v1/user/image?${params}`, null, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Ответ сервера:', response.data);
        } catch (error) {
          console.error('Ошибка:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        }
      };

      const addUser = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/v1/user`, {
            params: { user_id: telegramUser.id },
          });
          console.log(response.data);
          setData(response.data);
          const userTarif = response.data.user_tarif || '';
          const isBase = userTarif.trim().includes('Base');
          setBase(isBase);
          console.log('Тариф:', userTarif, 'Base:', isBase);
        } catch {
          console.log('Не получилось получить данные');
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
      console.error('Telegram WebApp API не найден');
      setIsLoading(false);
    }
  }, []);

  // Проверка: есть ли data и data.user_tarif
  const hasAccess = data && data.user_tarif && data.user_tarif.trim() !== '';

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
              <Route path="dashboard" element={<Dashboard data={data} userId={userId} />} />
              <Route path="begin" element={<Begin data={data} userId={userId} />} />
              <Route path="profile" element={<Profile data={data} userId={userId} setData={setData} />} />
              <Route path="parameters" element={<Parameters data={data} userId={userId} setData={setData} />} />
              <Route path="record" element={<Record data={data} userId={userId} />} />
              <Route path="communication" element={<Communication data={data} userId={userId} base={base} />} />
              <Route path="train" element={<Train data={data} userId={userId} level={data.user_level} />} />
              <Route path="food" element={<Food data={data} userId={userId} />} />
              <Route path="lectures" element={<Lectures data={data} userId={userId} />} />
            </Route>
          ) : (
            <Route path="*" element={<NoEntry />} />
          )}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;