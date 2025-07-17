type Exercise = {
  id: number;
  value: string;
};

export type GetExercisesResponse = {
  success: boolean;
  message: string;
  data: {
    exercises: {
      label: string;
      name: string;
      options: Exercise[];
    }[];
  };
};
