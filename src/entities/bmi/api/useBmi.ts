import { useQuery } from '@tanstack/react-query';

import { bmiApiService } from './bmiApiService';

export const useBmi = () => {
  const { data, isPending } = useQuery({
    queryKey: ['bmi'],
    queryFn: bmiApiService.getBmi,
  });

  return { bmi: data, isBmiPending: isPending };
};
