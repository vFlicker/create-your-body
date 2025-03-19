import React, { useState, useRef, useEffect, useCallback } from 'react';
import './VideoViewer.css';
import axios from 'axios';
import { API_BASE_URL } from '../../API';

import play from '../../Assets/svg/play.svg';
import pause from '../../Assets/svg/pause.svg';

const VideoViewer = ({ videoSrc, page, userId, instruction, lastVideo }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [showPlayButton, setShowPlayButton] = useState(true);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Обновление прогресса и времени
  const updateProgress = useCallback(() => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      const progressPercent = (current / total) * 100 || 0;
      setProgress(progressPercent);

      setCurrentTime(formatTime(current));
      setDuration(formatTime(total));
    }
  }, []);

  // Переключение воспроизведения
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        sendVideoUpdate(); // Отправляем данные при паузе
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowPlayButton(true);
      setTimeout(() => setShowPlayButton(false), 5000);
    }
  };

  // Перемотка по клику на прогресс-бар
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * (videoRef.current?.duration || 0);
    if (videoRef.current) videoRef.current.currentTime = newTime;
  };

  // Дебаунсинг для отправки данных (раз в 5 секунд)
  const debouncedSendVideoUpdate = useCallback(
    (data) => {
      // Внутренняя функция дебаунсинга
      let timeout;
      const debounce = (func, wait) => (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };

      const sendRequest = async () => {
        try {
          if (instruction) {
            // Запрос для приветственного видео
            await axios.patch(`${API_BASE_URL}/api/v1/user/video/greet`, null, {
              params: {
                tg_id: userId,
                duration_view: data.last_video_time,
              },
            });
            console.log('Приветственное видео обновлено:', data.last_video_time);
          } else {
            // Запрос для обычного видео
            await axios.patch(`${API_BASE_URL}/api/v1/user/video`, {
              user_tg_id: userId,
              last_video: lastVideo || page,
              last_video_time: data.last_video_time,
              last_video_link: videoSrc,
              last_video_duration: data.last_video_duration,
            });
            console.log('Видео прогресс обновлен:', data);
          }
        } catch (error) {
          console.error('Ошибка при обновлении видео прогресса:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        }
      };

      return debounce(sendRequest, 5000)(data);
    },
    [userId, instruction, lastVideo, page, videoSrc]
  );

  // Функция для отправки данных
  const sendVideoUpdate = useCallback(() => {
    if (!videoRef.current || !userId) return;

    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;

    const videoData = {
      last_video_time: formatTime(current),
      last_video_duration: formatTime(total),
    };

    debouncedSendVideoUpdate(videoData);
  }, [userId, debouncedSendVideoUpdate]);

  // Обработчики событий
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('loadedmetadata', () => {
        setDuration(formatTime(video.duration));
      });
      video.addEventListener('ended', () => {
        setIsPlaying(false);
        setShowPlayButton(true);
        sendVideoUpdate(); // Отправляем данные при завершении видео
      });

      // Отправка данных при выходе из компонента
      return () => {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('ended', () => {});
        if (isPlaying) sendVideoUpdate(); // Отправляем, если видео воспроизводилось
      };
    }
  }, [isPlaying, sendVideoUpdate, updateProgress]);

  return (
    <div className="videoViewer">
      <video
        ref={videoRef}
        className="videoElement"
        src={videoSrc}
        onClick={togglePlay}
      />
      <button
        className="playButton"
        style={{ opacity: showPlayButton ? '1' : '0' }}
        onClick={togglePlay}
      >
        <img src={isPlaying ? pause : play} alt="Управление воспроизведением" />
      </button>
      <div
        className="controlsContainer"
        style={{ opacity: showPlayButton ? '1' : '0' }}
      >
        <div className="timeDisplay">
          <p>{currentTime}</p>
          <p>{duration}</p>
        </div>
        <div className="progressBar" onClick={handleProgressClick}>
          <div
            className="progressFill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoViewer;