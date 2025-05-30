import './LecturesPage.css';
import '../train/TrainPage.css';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { lectureApiService } from '~/entities/lecture';
import { Profile } from '~/entities/user';
import book from '~/shared/assets/svg/book.svg';
import { Loader } from '~/shared/ui/Loader';

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

export function LecturesPage({ userQuery, level, user_photo }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weeksData, setWeeksData] = useState(null);
  const [lecturesData, setLecturesData] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [isLoadingLectures, setIsLoadingLectures] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const weeksResponse =
          await lectureApiService.getAllLectureWeeks(userQuery);
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
        const response = await lectureApiService.getAllLectureByWeek(
          userQuery,
          selectedWeek,
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
      if (!selectedLectureId) return;

      setIsLoadingLectures(true);
      try {
        const response = await lectureApiService.getLectureDetailsById(
          userQuery,
          selectedLectureId,
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
  }, [selectedLectureId]);

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
    setPage([1, 1]);
  };

  const handleLectureSelect = (lectureId) => {
    setSelectedLectureId(lectureId);
    setPage([2, 1]);
  };

  const handleBack = () => {
    if (page === 2) {
      setSelectedLectureId(null);
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
        <Profile level={level} photoSrc={user_photo} />
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

          {page === 2 && selectedLectureId && (
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
