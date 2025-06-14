export const enum AppRoute {
  // Start route
  Start = '/',

  // Dashboard route
  Dashboard = '/dashboard',

  // Begin route
  Begin = '/begin',

  // Quiz routes
  Quiz = '/quiz',
  QuizResult = '/quiz-result',

  // User routes
  Profile = '/profile',
  StartProfile = '/start-profile',
  Parameters = '/parameters',
  Record = '/record',

  // Communication routes
  Communication = '/communication',

  // Training routes
  TrainingCategories = '/training',
  TrainingAbout = '/training/about',
  TrainingWarmup = '/training/warmup',

  // Nutrition routes
  FoodCategories = '/food',
  Food = '/food/:categoryId',

  // Lectures routes
  LecturesWeeks = '/lectures',
  LectureWeek = '/lectures/:week',
  LectureDetails = '/lectures/:week/:id',

  // Recipes routes
  RecipeCategories = '/recipes',
  RecipeCategory = '/recipes/:category',
  RecipeDetails = '/recipes/:category/:id',

  // Error routes
  NoEntry = '/no-entry',
}
