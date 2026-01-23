export const enum AppRoute {
  // Start route
  Start = '/',

  // Dashboard route
  Dashboard = '/dashboard',
  Learning = '/learning',
  Learning2 = '/learning-2',
  Learning2Product = '/learning-2/product/:productId',
  Learning2Folder = '/learning-2/folder/:folderId',
  Learning2Lesson = '/learning-2/lesson/:lessonId',

  // Measurement routes
  Measurements = '/measurements',
  CreateMeasurements = '/measurements/create',
  EditMeasurements = '/measurements/edit/:reportId',

  // Begin route
  Begin = '/begin',

  // Quiz routes
  Quiz = '/quiz',
  QuizResult = '/quiz-result',

  // Bmi calculator
  BmiCalculator = '/bmi-calculator',
  BmiCalculatorQuiz = '/bmi-calculator/quiz',

  // User routes
  Profile = '/profile',
  ProfileEdit = '/profile/edit',
  Subscriptions = '/profile/subscriptions',

  // Workout diary
  WorkoutDiary = '/workout-diary',

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

  // Communication routes
  Communication = '/communication',
}
