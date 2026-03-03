export const enum AppRoute {
  // Start route
  Start = '/',

  // Dashboard route
  Dashboard = '/dashboard',
  Learning = '/learning',
  LearningProduct = '/learning/product/:productId',
  LearningFolder = '/learning/folder/:folderId',
  LearningLesson = '/learning/lesson/:lessonId',

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

  // Communication routes
  Communication = '/communication',
}
