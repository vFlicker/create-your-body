import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import { BeginPage } from '~/pages/begin';
import {
  BmiCalculatorPage,
  BmiCalculatorQuizPage,
} from '~/pages/bmiCalculator';
import { CommunicationPage } from '~/pages/communication';
import { DashboardPage, LearningPage } from '~/pages/dashboard';
import {
  LearningFolderPage,
  LearningLessonPage,
  LearningProductPage,
} from '~/pages/learning';
import {
  CreateMeasurementsPage,
  EditMeasurementsPage,
  MeasurementsPage,
} from '~/pages/measurement';
import { QuizPage, QuizResultPage } from '~/pages/quiz';
import { StartPage } from '~/pages/start';
import { ProfileEditPage, ProfilePage, SubscriptionsPage } from '~/pages/user';
import { WorkoutDiaryPage } from '~/pages/workoutDiary';
import { AppRoute } from '~/shared/router';

export function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/">
        {/* Start Page */}
        <Route index element={<StartPage />} />

        {/* Quiz */}
        <Route path={AppRoute.Quiz} element={<QuizPage />} />
        <Route path={AppRoute.QuizResult} element={<QuizResultPage />} />

        {/* Bmi Calculator */}
        <Route path={AppRoute.BmiCalculator} element={<BmiCalculatorPage />} />

        <Route
          path={AppRoute.BmiCalculatorQuiz}
          element={<BmiCalculatorQuizPage />}
        />

        {/* Dashboard */}
        <Route path={AppRoute.Dashboard} element={<DashboardPage />} />
        <Route path={AppRoute.Learning} element={<LearningPage />} />
        <Route
          path={AppRoute.LearningProduct}
          element={<LearningProductPage />}
        />
        <Route
          path={AppRoute.LearningFolder}
          element={<LearningFolderPage />}
        />
        <Route
          path={AppRoute.LearningLesson}
          element={<LearningLessonPage />}
        />

        {/* Begin */}
        <Route path={AppRoute.Begin} element={<BeginPage />} />

        {/* User */}
        <Route path={AppRoute.Profile} element={<ProfilePage />} />
        <Route path={AppRoute.ProfileEdit} element={<ProfileEditPage />} />
        <Route path={AppRoute.Subscriptions} element={<SubscriptionsPage />} />

        {/* Workout Diary */}
        <Route path={AppRoute.WorkoutDiary} element={<WorkoutDiaryPage />} />

        {/* Measurements */}
        <Route path={AppRoute.Measurements} element={<MeasurementsPage />} />
        <Route
          path={AppRoute.CreateMeasurements}
          element={<CreateMeasurementsPage />}
        />
        <Route
          path={AppRoute.EditMeasurements}
          element={<EditMeasurementsPage />}
        />

        {/* Communication */}
        <Route path={AppRoute.Communication} element={<CommunicationPage />} />
      </Route>
    </Routes>
  );
}
