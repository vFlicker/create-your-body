import './LecturesPage.css';
import '../train/TrainPage.css';

import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { BASE_API_URL } from '~/shared/api';
import book from '~/shared/assets/svg/book.svg';

import Loader from '../../Components/Loader/Loader';
import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn';
import TrainBox from '../../Components/TrainBox/TrainBox';
import TrainingPage from '../../Components/TrainingPage/TrainingPage';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

export function LecturesPage({ level, user_photo }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weeksData, setWeeksData] = useState(null);
  const [lecturesData, setLecturesData] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [isLoadingLectures, setIsLoadingLectures] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Получаем список недель
        const weeksResponse = await axios.get(
          `${BASE_API_URL}/cms/api/lectures/client-weeks`,
        );
        const weeks = weeksResponse.data.data || [];
        console.log('Все недели:', weeks);
        setWeeksData(weeks);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [level]);

  // Получение данных тренировок для выбранной недели
  useEffect(() => {
    const fetchWeekLectures = async () => {
      if (!selectedWeek || page !== 1) return;

      setIsLoadingLectures(true);
      try {
        const response = await axios.get(
          `${BASE_API_URL}/cms/api/lectures/client-week/${selectedWeek}`,
        );

        setLecturesData(response.data);
        console.log(
          `Получены лекции для недели ${selectedWeek}:`,
          response.data,
        );
      } catch (error) {
        console.error(
          `Ошибка при получении лекций для недели ${selectedWeek.week}:`,
          error.message,
        );
      } finally {
        setIsLoadingLectures(false);
      }
    };

    fetchWeekLectures();
  }, [selectedWeek, page, level]);

  useEffect(() => {
    const fetchWeekLectures = async () => {
      if (!selectedLecture) return;

      setIsLoadingLectures(true);
      try {
        const response = await axios.get(
          `${BASE_API_URL}/cms/api/lectures/client/${selectedLecture}`,
        );

        setLecture(response.data);
        console.log(`Получили лекцию:`, response.data);
      } catch (error) {
        console.error(`Ошибка при получении лекции`, error.message);
      } finally {
        setIsLoadingLectures(false);
      }
    };

    fetchWeekLectures();
  }, [selectedLecture]);

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
    setPage([1, 1]);
  };

  const handleLectureSelect = (lectureId) => {
    setSelectedLecture(lectureId);
    setPage([2, 1]);
  };

  const handleBack = () => {
    if (page === 2) {
      setSelectedLecture(null);
      setSelectedWeek(null);
      setPage([0, -1]);
    } else if (page === 1) {
      setSelectedWeek(null);
      setPage([0, -1]);
    } else if (page === 0) {
      window.handleBack = null;
      window.showContent = false;
      window.dispatchEvent(new Event('showContentChange'));
    }
  };

  useEffect(() => {
    window.handleBack = handleBack;
    document.body.setAttribute('data-handle-back', !!handleBack);
    return () => {
      window.handleBack = null;
      document.body.removeAttribute('data-handle-back');
    };
  }, [page]);

  return (
    <div className="lecturesPage">
      <div className="topLectures">
        <ProfileBtn level={level} user_photo={user_photo} />
        <div className="lecturesTitle">
          <img src={book} alt="Лекции" />
          <h1 style={{ fontSize: '24px' }}>Лекции</h1>
        </div>
      </div>
      <div className="bottomLectures">
        <AnimatePresence initial={false} custom={direction}>
          {page === 0 && (
            <motion.div
              key="weeks"
              className="weeksScreen"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              {isLoading ? (
                <Loader />
              ) : (
                Array.from({ length: 4 }).map((_, index) => {
                  const weekData = weeksData?.find(
                    (item) => item.week === index + 1,
                  );
                  return (
                    <TrainBox
                      key={index}
                      lectures={weekData || { week: index + 1 }}
                      train_count={weekData?.count}
                      onClick={() =>
                        weekData && handleWeekSelect(weekData.week)
                      }
                      isClosed={!weekData}
                    />
                  );
                })
              )}
            </motion.div>
          )}

          {page === 1 && selectedWeek && (
            <motion.div
              key="trainings"
              className="trainingsScreen"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              {isLoadingLectures ? (
                <Loader />
              ) : (
                <div className="trainingsGrid">
                  {lecturesData?.data?.map((lecture, index) => {
                    return (
                      <TrainBox
                        key={index}
                        lectures={lecture}
                        onClick={() => handleLectureSelect(lecture._id)}
                        train_count={0}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {page === 2 && selectedLecture && (
            <motion.div
              key="trainingDetails"
              className="trainingDetailsScreen"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <TrainingPage
                trainingData={lecture}
                onBack={handleBack}
                level="Профи"
                lectures={true}
                jcsb={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
