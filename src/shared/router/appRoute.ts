export const enum AppRoute {
  // Start route
  Start = '/',

  // Dashboard route
  Dashboard = '/dashboard',
  Learning = '/learning',
  History = '/history',

  // Begin route
  Begin = '/begin',

  // Quiz routes
  Quiz = '/quiz',
  QuizResult = '/quiz-result',

  // User routes
  Profile = '/profile',
  ProfileEdit = '/profile/edit',
  BodyMeasurements = '/body-measurements',
  Record = '/record',
  Subscriptions = '/subscriptions',

  // Communication routes
  Communication = '/communication',

  // Training routes
  TrainingCategories = '/training',
  TrainingAbout = '/training/about',
  TrainingWarmup = '/training/warmup',
  TrainingPlace = '/training/place',
  TrainingPlaceWeeks = '/training/place/:type',
  TrainingPlaceWeek = '/training/place/:type/:week',
  TrainingPlaceDetails = '/training/place/:type/:week/:id',

  // Nutrition routes
  FoodCategories = '/food',
  Food = '/food/:categoryId',

  // Lectures routes
  LectureWeeks = '/lectures',
  LectureWeek = '/lectures/:week',
  LectureDetails = '/lectures/:week/:id',

  // Recipes routes
  RecipeCategories = '/recipes',
  RecipeCategory = '/recipes/:category',
  RecipeDetails = '/recipes/:category/:id',

  // Error routes
  NoEntry = '/no-entry',
}
