import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import { BeginPage } from '~/pages/begin';
import { CommunicationPage } from '~/pages/communication';
import { DashboardPage } from '~/pages/dashboard';
import { FoodPage } from '~/pages/food';
import { LecturesPage } from '~/pages/lectures';
import { ParametersPage, ProfilePage, RecordPage } from '~/pages/profile';
import { QuizPage } from '~/pages/quiz';
import { RecipesPage } from '~/pages/recipes';
import { ResultPage } from '~/pages/result';
import { StartPage } from '~/pages/start';
import { TrainPage } from '~/pages/train';
import { AppRoute } from '~/shared/router';

import { Layout } from './Layout';

export function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path={AppRoute.Quiz} element={<QuizPage />} />
        <Route path={AppRoute.Result} element={<ResultPage />} />
        <Route path={AppRoute.Dashboard} element={<DashboardPage />} />
        <Route path={AppRoute.Begin} element={<BeginPage />} />
        <Route path={AppRoute.Profile} element={<ProfilePage />} />
        <Route path={AppRoute.Parameters} element={<ParametersPage />} />
        <Route path={AppRoute.Record} element={<RecordPage />} />
        <Route path={AppRoute.Communication} element={<CommunicationPage />} />
        <Route path={AppRoute.Training} element={<TrainPage />} />
        <Route path={AppRoute.Food} element={<FoodPage />} />
        <Route path={AppRoute.Lectures} element={<LecturesPage />} />
        <Route path={AppRoute.Recipes} element={<RecipesPage />} />
      </Route>
    </Routes>
  );
}
