import { JSX } from 'react';

import { useBmiStore } from '~/entities/bmi/model/bmiStore';
import { RangeSelect } from '~/shared/ui/molecules/RangeSelect';

export function SelectProteins(): JSX.Element {
  const { form, setForm } = useBmiStore();

  return (
    <RangeSelect
      min={0.5}
      max={2.5}
      step={0.1}
      labels={[
        { value: 0.5, text: '0,5 г/кг' },
        { value: 1.2, text: '1,2 г/кг', description: 'Минимум' },
        { value: 1.6, text: '1,6 г/кг', description: 'Норма' },
        { value: 2.0, text: '2,0 г/кг', description: 'Спорт' },
        { value: 2.5, text: '2,5 г/кг', description: 'Максимум' },
      ]}
      value={form.proteinRatio}
      onChange={(value) => setForm({ ...form, proteinRatio: value })}
    />
  );
}
