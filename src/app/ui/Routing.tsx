import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import { BeginPage } from '~/pages/begin';
import { CommunicationPage } from '~/pages/communication';
import { DashboardPage, LearningPage } from '~/pages/dashboard';
import { FoodCategoriesPage, FoodPage } from '~/pages/food';
import {
  LectureDetailsPage,
  LectureWeekPage,
  LectureWeeksPage,
} from '~/pages/lectures';
import {
  CreateMeasurementsPage,
  EditMeasurementsPage,
  MeasurementsPage,
} from '~/pages/measurement';
import { QuizPage, QuizResultPage } from '~/pages/quiz';
import {
  RecipeCategoriesPage,
  RecipeCategoryPage,
  RecipesDetailsPage,
} from '~/pages/recipes';
import { StartPage } from '~/pages/start';
import {
  TrainingAboutPage,
  TrainingCategoriesPage,
  TrainingPlaceDetailsPage,
  TrainingPlaceWeekPage,
  TrainingPlaceWeeksPage,
  TrainingWarmupPage,
} from '~/pages/training';
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

        {/* Dashboard */}
        <Route path={AppRoute.Dashboard} element={<DashboardPage />} />
        <Route path={AppRoute.Learning} element={<LearningPage />} />

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

        {/* Training */}
        <Route
          path={AppRoute.TrainingCategories}
          element={<TrainingCategoriesPage />}
        />
        <Route path={AppRoute.TrainingAbout} element={<TrainingAboutPage />} />
        <Route
          path={AppRoute.TrainingWarmup}
          element={<TrainingWarmupPage />}
        />
        <Route
          path={AppRoute.TrainingPlaceWeeks}
          element={<TrainingPlaceWeeksPage />}
        />
        <Route
          path={AppRoute.TrainingPlaceWeek}
          element={<TrainingPlaceWeekPage />}
        />
        <Route
          path={AppRoute.TrainingPlaceDetails}
          element={<TrainingPlaceDetailsPage />}
        />

        {/* Nutrition */}
        <Route
          path={AppRoute.FoodCategories}
          element={<FoodCategoriesPage />}
        />
        <Route path={AppRoute.Food} element={<FoodPage />} />

        {/* Lectures */}
        <Route path={AppRoute.LectureWeeks} element={<LectureWeeksPage />} />
        <Route path={AppRoute.LectureWeek} element={<LectureWeekPage />} />
        <Route
          path={AppRoute.LectureDetails}
          element={<LectureDetailsPage />}
        />

        {/* Recipes */}
        <Route
          path={AppRoute.RecipeCategories}
          element={<RecipeCategoriesPage />}
        />
        <Route
          path={AppRoute.RecipeCategory}
          element={<RecipeCategoryPage />}
        />
        <Route path={AppRoute.RecipeDetails} element={<RecipesDetailsPage />} />
      </Route>
    </Routes>
  );
}
