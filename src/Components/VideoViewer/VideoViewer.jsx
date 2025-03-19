import React, { useState, useRef, useEffect, useCallback } from 'react';
import './VideoViewer.css';
import axios from 'axios';
import { API_BASE_URL } from '../../API';

import play from '../../Assets/svg/play.svg';
import pause from '../../Assets/svg/pause.svg';

const VideoViewer = ({ videoSrc, page, userId, instruction, lastVideo, onVideoEnd, togglePlayRef }) => {
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

  // Update progress and time
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

  // Debounced function to send video updates (every 5 seconds)
  const debouncedSendVideoUpdate = useCallback(
    (data) => {
      let timeout;
      const debounce = (func, wait) => (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };

      const sendRequest = async () => {
        try {
          if (instruction) {
            await axios.patch(`${API_BASE_URL}/api/v1/user/video/greet`, null, {
              params: {
                tg_id: userId,
                duration_view: data.last_video_time,
              },
            });
            console.log('Welcome video updated:', data.last_video_time);
          } else {
            await axios.patch(`${API_BASE_URL}/api/v1/user/video`, {
              user_tg_id: userId,
              last_video: lastVideo || page,
              last_video_time: data.last_video_time,
              last_video_link: videoSrc,
              last_video_duration: data.last_video_duration,
            });
            console.log('Video progress updated:', data);
          }
        } catch (error) {
          console.error('Error updating video progress:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        }
      };

      return debounce(sendRequest, 5000)(data);
    },
    [userId, instruction, lastVideo, page, videoSrc]
  );

  // Function to send video update data
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

  // Toggle play/pause functionality
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        sendVideoUpdate(); // Send update when pausing
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowPlayButton(true);
      setTimeout(() => setShowPlayButton(false), 5000);
    }
  }, [isPlaying, sendVideoUpdate]);

  // Bind togglePlay to ref
  useEffect(() => {
    if (togglePlayRef) {
      togglePlayRef.current = togglePlay;
    }
  }, [togglePlayRef, togglePlay]);

  // Handle progress bar click to seek
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * (videoRef.current?.duration || 0);
    if (videoRef.current) videoRef.current.currentTime = newTime;
  };

  // Video event listeners
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
        sendVideoUpdate();
        if (onVideoEnd) onVideoEnd(true);
      });

      return () => {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('ended', () => {});
        if (isPlaying) sendVideoUpdate();
      };
    }
  }, [isPlaying, sendVideoUpdate, updateProgress, onVideoEnd]);

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
        <img src={isPlaying ? pause : play} alt="Playback control" />
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