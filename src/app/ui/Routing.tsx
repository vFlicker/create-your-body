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

export function Routing(user): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<StartPage type={user.born_date ? 'training' : 'start'} />}
        />
        {/* <Route
          path={AppRoute.Quiz}
          element={<QuizPage userQuery={userQuery} data={user} />}
        />
        <Route
          path={AppRoute.Result}
          element={<ResultPage userQuery={userQuery} />}
        />
        <Route
          path={AppRoute.Dashboard}
          element={<DashboardPage data={user} />}
        />
        <Route
          path={AppRoute.Begin}
          element={<BeginPage data={user} userId={userId} />}
        />
        <Route
          path={AppRoute.Profile}
          element={<ProfilePage data={user} userQuery={userQuery} />}
        />
        <Route
          path={AppRoute.Parameters}
          element={
            <ParametersPage
              data={user}
              userId={userId}
              userQuery={userQuery}
              setData={setData}
            />
          }
        />
        <Route
          path={AppRoute.Record}
          element={
            <RecordPage data={user} userQuery={userQuery} userId={userId} />
          }
        />
        <Route
          path={AppRoute.Communication}
          element={<CommunicationPage data={user} />}
        />
        <Route
          path={AppRoute.Traning}
          element={
            <TrainPage
              userQuery={userQuery}
              data={user}
              level={user.user_level}
              base={base}
            />
          }
        />
        <Route
          path={AppRoute.Food}
          element={
            <FoodPage data={user} userId={userId} userQuery={userQuery} />
          }
        />
        <Route
          path={AppRoute.Lectures}
          element={
            <LecturesPage
              userQuery={userQuery}
              level={user.user_level}
              userPhotoSrc={user.image}
            />
          }
        />
        <Route
          path={AppRoute.Recipes}
          element={<RecipesPage data={user} userQuery={userQuery} />}
        /> */}
      </Route>
    </Routes>
  );
}
