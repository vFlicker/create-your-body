import styled from '@emotion/styled';
import {
  JSX,
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import pauseIconSrc from '~/shared/assets/svg/pause.svg';
import playIconSrc from '~/shared/assets/svg/play.svg';
import { Color } from '~/shared/theme/colors';

import { formatTime } from './videoPlayerLib';

type VideoPlayerProps = {
  videoSrc: string;
  onVideoUpdate: (data: { currentTime: string; duration: string }) => void;
  onVideoEnd?: (ended: boolean) => void;
  togglePlayRef?: RefObject<() => void>;
};

export function VideoPlayer({
  togglePlayRef,
  videoSrc,
  onVideoEnd,
  onVideoUpdate,
}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [showControls, setShowControls] = useState(true);

  const updateProgress = useCallback(() => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      const progressPercent = total > 0 ? (current / total) * 100 : 0;
      setProgress(progressPercent);
      setCurrentTime(formatTime(current));
      if (total && !isNaN(total)) {
        setDuration(formatTime(total));
      }
    }
  }, []);

  const sendVideoUpdate = useCallback(() => {
    if (!videoRef.current) return;

    const { currentTime, duration } = videoRef.current;

    const videoData = {
      currentTime: formatTime(currentTime),
      duration: formatTime(duration),
    };

    onVideoUpdate(videoData);
  }, [onVideoUpdate]);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        sendVideoUpdate();
      } else {
        videoRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
      setShowControls(true);
    }
  }, [isPlaying, sendVideoUpdate]);

  useEffect(() => {
    if (togglePlayRef) {
      togglePlayRef.current = togglePlay;
    }
  }, [togglePlayRef, togglePlay]);

  const handleProgressClick = (
    evt: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    const progressBar = evt.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = evt.clientX - rect.left;
    const width = rect.width;
    if (videoRef.current && videoRef.current.duration) {
      const newTime = (clickX / width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      updateProgress();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => updateProgress();
      const handleLoadedMetadata = () => {
        setDuration(formatTime(video.duration));
        updateProgress();
      };
      const handleEnded = () => {
        setIsPlaying(false);
        setShowControls(true);
        sendVideoUpdate();
        if (onVideoEnd) onVideoEnd(true);
      };
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      if (video.readyState >= video.HAVE_METADATA) {
        handleLoadedMetadata();
      }

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        if (!video.ended && video.currentTime > 0) {
          sendVideoUpdate();
        }
      };
    }
  }, [sendVideoUpdate, updateProgress, onVideoEnd]);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <StyledVideoViewer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledVideoElement ref={videoRef} src={videoSrc} onClick={togglePlay} />
      <StyledPlayButton
        onClick={togglePlay}
        style={{ opacity: !isPlaying || showControls ? 1 : 0 }}
      >
        <img
          src={isPlaying ? pauseIconSrc : playIconSrc}
          alt={isPlaying ? 'Pause' : 'Play'}
        />
      </StyledPlayButton>
      {showControls && (
        <StyledControlsContainer>
          <StyledTimeDisplay>
            <p>{currentTime}</p>
            <p>{duration}</p>
          </StyledTimeDisplay>
          <StyledProgressBar onClick={(evt) => handleProgressClick(evt)}>
            <StyledProgressFill style={{ width: `${progress}%` }} />
          </StyledProgressBar>
        </StyledControlsContainer>
      )}
    </StyledVideoViewer>
  );
}

const StyledVideoViewer = styled.div`
  position: relative;
  height: 218px;
  width: 100%;
  background-color: ${Color.Black_950};
  border-radius: 14px;
  overflow: hidden;
`;

const StyledVideoElement = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  cursor: pointer;
  display: block;
`;

const StyledPlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${Color.Green_500};
  border-radius: 50px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease-in-out;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const StyledControlsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;

const StyledProgressBar = styled.div`
  flex-grow: 1;
  height: 8px;
  background: ${Color.Black_50};
  cursor: pointer;
  position: relative;
  border-radius: 50px;
  width: 100%;
`;

const StyledProgressFill = styled.div`
  height: 100%;
  background: ${Color.Violet_200};
  border-radius: 50px;
  transition: width 0.1s linear;
`;

const StyledTimeDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  p {
    font-weight: 500;
    font-size: 12px;
    color: ${Color.White};
    pointer-events: none;
  }
`;
