import './TrainContent.css';
import '~/pages/train/TrainPage.css';

import { useCallback, useEffect, useState } from 'react';

import { trainingApiService } from '~/entities/training';
import { useStreamStore } from '~/entities/user';
import { Loader } from '~/shared/ui/Loader.js';

import TrainBox from '../TrainBox/TrainBox';
import TrainingPage from '../TrainingPage/TrainingPage';

export default function TrainContent({ userQuery, view, level }) {
  const [page, setPage] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [originalTrainingData, setOriginalTrainingData] = useState(null);
  const [weeksData, setWeeksData] = useState([]);
  const [weekDetails, setWeekDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWeekTrainings, setSelectedWeekTrainings] = useState([]);
  const [isLoadingTrainings, setIsLoadingTrainings] = useState(false);
  const [trainingDetails, setTrainingDetails] = useState({});

  const { stream } = useStreamStore();

  useEffect(() => {
    const fetchData = async () => {
      if (view !== 'gym' && view !== 'home') return;

      setIsLoading(true);
      try {
        // Получаем список недель
        const weeksResponse = await trainingApiService.getTrainingWeeks(
          userQuery,
          stream,
        );

        const weeks = weeksResponse || [];
        console.log('Получен список недель:', weeks.length);

        // Получаем детали для каждой недели
        const newWeekDetails = {};
        const mappedLevel = level === 'Новичок' ? 'noob' : 'pro';

        for (const { week } of weeks) {
          try {
            const response = await trainingApiService.getTrainingsByWeek(
              userQuery,
              week,
              {
                level: mappedLevel,
                type: view,
                stream,
              },
            );

            const filteredTrainings = response.filter(
              (training) =>
                training.type === view && training.level === mappedLevel,
            );

            newWeekDetails[week] = {
              count: filteredTrainings.length,
              coverUrl: week.cover?.url || null,
            };
          } catch (error) {
            console.error(
              `Ошибка при получении данных для недели ${week}:`,
              error.message,
            );
          }
        }

        setWeeksData(weeks);
        setWeekDetails(newWeekDetails);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [view, level, stream]);

  // Получение данных тренировок для выбранной недели
  useEffect(() => {
    const fetchWeekTrainings = async () => {
      if (!selectedWeek || page !== 1) return;

      setIsLoadingTrainings(true);
      try {
        const mappedLevel = level === 'Новичок' ? 'noob' : 'pro';

        const response = await trainingApiService.getTrainingsByWeek(
          userQuery,
          selectedWeek.week,
          {
            level: mappedLevel,
            type: view,
            stream,
          },
        );

        const filteredTrainings = response.filter(
          (training) =>
            training.type === view && training.level === mappedLevel,
        );

        console.log(
          `Получены тренировки для недели ${selectedWeek.week}:`,
          filteredTrainings,
        );

        // Получаем детальную информацию о каждой тренировке
        const details = {};
        for (const training of filteredTrainings) {
          try {
            const detailResponse =
              await trainingApiService.getTrainingDetailsById(
                userQuery,
                training._id,
              );
            details[training._id] = {
              stepsCount: detailResponse.steps?.length || 0,
              coverUrl: detailResponse.coverImage?.url,
              ...training,
            };
          } catch (error) {
            console.error(
              `Ошибка при получении деталей тренировки ${training._id}:`,
              error.message,
            );
          }
        }

        setTrainingDetails(details);
        setSelectedWeekTrainings(filteredTrainings);
        console.log('Тренировки', details);
      } catch (error) {
        console.error(
          `Ошибка при получении тренировок для недели ${selectedWeek.week}:`,
          error.message,
        );
      } finally {
        setIsLoadingTrainings(false);
      }
    };

    fetchWeekTrainings();
  }, [selectedWeek, page, view, level, stream]);

  const handleWeekSelect = (weekData) => {
    setIsLoadingTrainings(true);
    setSelectedWeek(weekData);
    setPage(1);
  };

  const handleTrainingSelect = async (training) => {
    try {
      const response = await trainingApiService.getTrainingDetailsById(
        userQuery,
        training._id,
      );
      setOriginalTrainingData(response);
      window.handleBack = null;
      document.body.removeAttribute('data-handle-back');
      setPage(2);
    } catch (error) {
      console.error(
        `Ошибка при получении данных тренировки ${training._id}:`,
        error.message,
      );
    }
  };

  const handleBack = useCallback(() => {
    if (page === 2) {
      setOriginalTrainingData(null);
      setPage(1);
    } else if (page === 1) {
      setSelectedWeek(null);
      setPage(0);
    } else if (page === 0) {
      window.showContent = false;
      window.dispatchEvent(new Event('showContentChange'));
    }
  }, [page]);

  useEffect(() => {
    // Устанавливаем handleBack только если мы не на странице упражнений
    if (page !== 2) {
      window.handleBack = handleBack;
      document.body.setAttribute('data-handle-back', 'true');
    } else {
      window.handleBack = null;
      document.body.removeAttribute('data-handle-back');
    }

    return () => {
      window.handleBack = null;
      document.body.removeAttribute('data-handle-back');
    };
  }, [page]); // Убираем handleBack из зависимостей

  return (
    <div className="trainContent">
      {page === 0 && (
        <div className="weeks-screen">
          {isLoading ? (
            <Loader />
          ) : (
            Array.from({ length: 4 }, (_, index) => {
              const weekNumber = index + 1;
              const weekData = weeksData.find(
                (week) => week.week === weekNumber,
              );

              return (
                <TrainBox
                  key={weekNumber}
                  data={{
                    week: weekNumber,
                    title: `Неделя ${weekNumber}`,
                    count: weekData ? weekDetails[weekNumber]?.count || 0 : 4,
                    coverUrl: weekData
                      ? weekDetails[weekNumber]?.coverUrl
                      : null,
                  }}
                  isClosed={!weekData}
                  onClick={() => weekData && handleWeekSelect(weekData)}
                />
              );
            })
          )}
        </div>
      )}

      {page === 1 && selectedWeek && (
        <div className="trainings-screen">
          <div
            className="trainings-grid"
            style={{
              transition: 'all 0.3s ease-in-out',
              gridTemplateColumns: isLoadingTrainings ? '1fr' : '',
              height: isLoadingTrainings ? '100%' : '',
            }}
          >
            {isLoadingTrainings ? (
              <Loader />
            ) : (
              selectedWeekTrainings
                .sort((a, b) => {
                  const numA = parseInt(a.title.match(/\d+/)?.[0] || '0');
                  const numB = parseInt(b.title.match(/\d+/)?.[0] || '0');
                  return numA - numB;
                })
                .map((training, index) => (
                  <TrainBox
                    key={index}
                    data={{
                      ...training,
                      count: trainingDetails[training._id]?.stepsCount || 0,
                      coverUrl: trainingDetails[training._id]?.coverUrl,
                    }}
                    steps={true}
                    onClick={() => handleTrainingSelect(training)}
                    level={level}
                    isBonus={index === 3}
                  />
                ))
            )}
          </div>
        </div>
      )}

      {page === 2 && originalTrainingData && (
        <div className="screen training-details-screen">
          <TrainingPage
            trainingData={originalTrainingData.steps}
            onBack={handleBack}
          />
        </div>
      )}
    </div>
  );
}
