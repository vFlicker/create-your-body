import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import axios from "axios";
import { API_BASE_URL } from './API';

import Loader from "./Components/Loader/Loader";

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

// Функция для получения всех файлов из папки
function importAll(r) {
  return r.keys().map(r);
}

// Загружаем все изображения из папок
const imgFiles = importAll(require.context('./Assets/img', false, /\.(png|jpe?g|svg)$/));
const navFiles = importAll(require.context('./Assets/nav', false, /\.(png|jpe?g|svg)$/));
const quizFiles = importAll(require.context('./Assets/quiz', false, /\.(png|jpe?g|svg)$/));
const svgFiles = importAll(require.context('./Assets/svg', false, /\.(png|jpe?g|svg)$/));

// Объединяем все файлы в один массив
const allImages = [...imgFiles, ...navFiles, ...quizFiles, ...svgFiles];

// Функция предзагрузки
function preloadImages() {
  allImages.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
}

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
        <ButtonClose /> {/* ButtonClose всегда видна */}
      </div>
      <div className="App">
        <Outlet /> {/* Здесь рендерятся дочерние маршруты */}
        {showControlsNav && <Nav />} {/* Условно показываем Nav */}
      </div>
    </>
  );
}

function App() {
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(null);
  const [base, setBase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
      setUserId(telegramUser.id);
      console.log('Telegram Start Param:', window.Telegram.WebApp.initDataUnsafe.start_param);
      console.log('Full Telegram Init Data:', window.Telegram.WebApp.initData);
      console.log('Привет!');

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
          console.log('Ответ сервера для изображения:', response.data);
        } catch (error) {
          console.error('Ошибка при отправке изображения:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        }
      };

      const addUser = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/v1/user`, {
            params: { user_id: telegramUser.id },
          });
          console.log('Данные пользователя:', response.data);
          setData(response.data);
          const userTarif = response.data.user_tarif || '';
          const isBase = userTarif.trim().includes('Base');
          setBase(isBase);
          console.log('Тариф пользователя:', userTarif, 'Base:', isBase);
        } catch {
          console.log('Не удалось получить данные пользователя');
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

  useEffect(() => {
    preloadImages();
  }, []);

  // Проверка: есть ли data и data.user_tarif
  const hasAccess = data && data.user_tarif && data.user_tarif.trim() !== '';

  return (
    <HashRouter>
      {isLoading ? (
        <Loader height="100vh" />
      ) : (
        <Routes>
          {hasAccess ? (
            // Если есть data и data.user_tarif, рендерим Layout с маршрутами
            <Route path="/" element={<Layout />}>
              <Route index element={<StartPage data={data} />} />
              <Route path="quiz" element={<Quiz userId={userId} />} />
              <Route path="result" element={<Result userId={userId} />} />
              <Route path="dashboard" element={<Dashboard data={data} userId={userId} />} />
              <Route path="begin" element={<Begin data={data} userId={userId} />} />
              <Route path="profile" element={<Profile data={data} userId={userId} setData={setData} />} />
              <Route path="parameters" element={<Parameters data={data} userId={userId} />} />
              <Route path="record" element={<Record data={data} userId={userId} />} />
              <Route path="communication" element={<Communication data={data} userId={userId} base={base} />} />
            </Route>
          ) : (
            // Если нет data или data.user_tarif, рендерим NoEntry
            <Route path="*" element={<NoEntry />} />
          )}
        </Routes>
      )}
    </HashRouter>
  );
}

export default App;