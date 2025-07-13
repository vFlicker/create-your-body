type Week = {
  week: number;
  stream: number;
  type: 'home' | 'gym';
  cover: {
    fileId: string;
    fileName: string;
    originalName: string;
    url: string;
    size: number;
  };
  count: number;
};

type LastUnfinishedWorkout = {
  _id: string;
  title: string;
  week: number;
  stream: number;
  type: string;
  level: string;
  duration: number;
  coverImage: {
    fileId: string;
    fileName: string;
    originalName: string;
    url: string;
    size: number;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  exerciseCount: number;
  done: boolean;
  progress: {
    status: 'started' | 'in_progress' | 'completed';
    currentStep: number;
    startedAt: string;
    updatedAt: string;
  };
};

type Training = {
  _id: string;
  title: string;
  done: boolean;
  week: number;
  stream: number;
  type: string;
  level: string;
  exerciseCount: number;
  duration: number;
  coverImage: {
    fileId: string;
    fileName: string;
    originalName: string;
    url: string;
    size: number;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TrainingDetail = {
  _id: string;
  title: string;
  week: number;
  stream: number;
  type: string;
  level: string;
  duration: number;
  coverImage: {
    fileId: string;
    fileName: string;
    originalName: string;
    url: string;
    size: number;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  steps: {
    _id: string;
    title: string;
    order: number;
    workout: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    blocks?: {
      _id: string;
      type: 'video' | 'text' | 'divider';
      order: number;
      step?: string;
      lecture?: string;
      video?: {
        embedCode: string;
      };
      content?: {
        text: string;
      };
      image?: {
        alignment: string;
      };
      divider?: {
        showLine: boolean;
      };
      createdAt?: string;
      updatedAt?: string;
      __v?: number;
    }[];
  }[];
};

export type WeeksResponse = {
  status: string;
  data: Week[];
};

export type TrainingsResponse = {
  status: string;
  data: Training[];
};

export type TrainingDetailResponse = {
  status: string;
  data: TrainingDetail;
};

export type UpdateWorkoutProgressDto = {
  workoutMongoId: string;
  status: 'started' | 'in_progress' | 'completed';
  currentStep: number;
};

export type LastUnfinishedWorkoutResponse = {
  status: string;
  data: LastUnfinishedWorkout;
};
