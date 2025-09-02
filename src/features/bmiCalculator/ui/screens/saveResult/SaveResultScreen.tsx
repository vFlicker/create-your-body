import styled from '@emotion/styled';
import { JSX } from 'react';

import { BmiChart, BmiStats, FactBlock } from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { ColorfulDot } from '~/shared/ui/atoms/ColorfulDot';
import { Loader } from '~/shared/ui/atoms/Loader';
import { RangeSelect } from '~/shared/ui/molecules/RangeSelect';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';
import { useBmiCalculations } from '../../../model/useBmiCalculations';

type SaveResultScreenProps = {
  onRepeat: () => void;
  onFinish: () => void;
};

export function SaveResultScreen({
  onRepeat,
  onFinish,
}: SaveResultScreenProps): JSX.Element {
  const { form, setForm } = useBmiCalculatorStore();
  const { allCalculatedData, isLoading } = useBmiCalculations();

  if (!allCalculatedData || isLoading) {
    return <Loader />;
  }

  const { carbs, proteins, fats, targetCalories } = allCalculatedData;

  return (
    <StyledActivityScreenWrapper>
      <StyledMainWrapper>
        <StyledChartWrapper>
          <BmiChart
            proteinsPercentFromTarget={proteins.proteinsPercentFromTarget}
            fatsPercentFromTarget={fats.fatsPercentFromTarget}
            carbsPercentFromTarget={carbs.carbsPercentFromTarget}
          />
          <BmiStats
            targetCalories={targetCalories}
            proteinsInGrams={proteins.proteinsInGrams}
            proteinsPercentFromTarget={proteins.proteinsPercentFromTarget}
            fatsInGrams={fats.fatsInGrams}
            fatsPercentFromTarget={fats.fatsPercentFromTarget}
            carbsInGrams={carbs.carbsInGrams}
            carbsPercentFromTarget={carbs.carbsPercentFromTarget}
          />
        </StyledChartWrapper>

        <StyledTitle>Степень дефицита калорий</StyledTitle>

        <hr />

        <StyledTop>
          <StyledSubtitleWrapper>
            <ColorfulDot circleColor="#4765fa" />
            <span>Белки</span>
          </StyledSubtitleWrapper>
        </StyledTop>

        <RangeSelect
          min={1}
          max={2.5}
          step={0.1}
          labels={[
            { value: 1.2, text: '1,2 г/кг', description: 'Минимум' },
            { value: 1.6, text: '1,6 г/кг', description: 'Норма' },
            { value: 2.0, text: '2,0 г/кг', description: 'Спорт' },
            { value: 2.5, text: '2,5 г/кг', description: 'Максимум' },
          ]}
          value={form.proteinRatio}
          onChange={(value) => setForm({ ...form, proteinRatio: value })}
        />

        <StyledTop>
          <StyledSubtitleWrapper>
            <ColorfulDot circleColor="#ffbf2b" />
            <span>Жиры</span>
          </StyledSubtitleWrapper>
        </StyledTop>

        <RangeSelect
          min={0.5}
          max={1.5}
          step={0.1}
          labels={[
            { value: 0.7, text: '0,7 г/кг', description: 'Минимум' },
            { value: 1.0, text: '1,0 г/кг', description: 'Норма' },
            { value: 1.3, text: '1,3 г/кг', description: 'Высокий' },
            { value: 1.5, text: '1,5 г/кг', description: 'Максимум' },
          ]}
          value={form.fatRatio}
          onChange={(value) => setForm({ ...form, fatRatio: value })}
        />

        <StyledTop>
          <StyledSubtitleWrapper>
            <ColorfulDot circleColor="#26C26F" />
            <span>Углеводы</span>
          </StyledSubtitleWrapper>
        </StyledTop>

        <RangeSelect
          min={0}
          max={10}
          step={0.1}
          labels={[
            { value: 0, text: '0 г/кг', description: 'Кето' },
            { value: 2, text: '2 г/кг', description: 'Низкий' },
            { value: 4, text: '4 г/кг', description: 'Средний' },
            { value: 6, text: '6+ г/кг', description: 'Высокий' },
          ]}
          value={carbs.carbsCoefficient}
          disabled
        />

        <StyledFooter>
          <FactBlock>
            Мозг потребляет около 120 г глюкозы в сутки — это примерно 30% от
            всех углеводов!
          </FactBlock>

          <StyledActions>
            <Button color="neutral" onClick={onRepeat}>
              Пройти заново
            </Button>
            <Button color="accent" onClick={onFinish}>
              Завершить
            </Button>
          </StyledActions>
        </StyledFooter>
      </StyledMainWrapper>
    </StyledActivityScreenWrapper>
  );
}

const StyledActivityScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;

  padding: 16px 16px 24px;
  border-radius: 20px 20px 0 0;

  background-color: ${Color.White};
`;

const StyledChartWrapper = styled.div`
  display: flex;
  gap: 22px;
`;

const StyledTitle = styled.h1`
  color: #0d0d0d;
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledSubtitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: #0d0d0d;
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
`;

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  gap: 20px;
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
