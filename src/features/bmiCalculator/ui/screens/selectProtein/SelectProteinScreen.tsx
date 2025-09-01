import styled from '@emotion/styled';
import { JSX } from 'react';

import { Chip, FactBlock, ScreenHeader, StatCard } from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { Loader } from '~/shared/ui/atoms/Loader';
import { RangeSelect } from '~/shared/ui/molecules/RangeSelect';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';
import { useSelectProteinData } from './useSelectProteinData';

type SelectProteinScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function SelectProteinScreen({
  onNext,
  onBack,
}: SelectProteinScreenProps): JSX.Element {
  const { form, setForm } = useBmiCalculatorStore();
  const { calculatedData, isLoading } = useSelectProteinData();

  if (isLoading || !calculatedData) {
    return <Loader />;
  }

  const { proteins, proteinKcalPercentage, riskLevelData } = calculatedData;

  const { riskLevel, label, chipColor, valueEmoji, description } =
    riskLevelData;

  return (
    <StyledActivityScreenWrapper>
      <ScreenHeader
        title="Выберите норму белка"
        subtitle="⚖️ Определяем ваш идеальный баланс БЖУ"
      />

      <StyledMainWrapper>
        <StyledTop>
          <StyledTitle>Белки</StyledTitle>
          <Chip color={chipColor}>{label}</Chip>
        </StyledTop>

        <RangeSelect
          min={0}
          max={2.5}
          step={0.1}
          labels={[
            { value: 0, text: '0 г/кг' },
            { value: 1.2, text: '1,2 г/кг', description: 'Минимум' },
            { value: 1.6, text: '1,6 г/кг', description: 'Норма' },
            { value: 2.0, text: '2,0 г/кг', description: 'Спорт' },
            { value: 2.5, text: '2,5 г/кг', description: 'Максимум' },
          ]}
          value={form.proteinRatio}
          onChange={(value) => setForm({ ...form, proteinRatio: value })}
        />

        <StatCard
          title={`Ваш уровень белка (${form.proteinRatio} г/кг веса)`}
          description={description}
          riskLevel={riskLevel}
          value={proteins.proteinsInGrams}
          valueEmoji={valueEmoji}
          calories={proteins.proteinsInKcal}
          percentage={proteinKcalPercentage}
        />

        <StyledFooter>
          <FactBlock>
            Белки имеют наибольший термический эффект — на их переваривание
            тратится до 30% калорий!
          </FactBlock>

          <StyledActions>
            <Button color="neutral" onClick={onBack}>
              Назад
            </Button>
            <Button color="accent" onClick={onNext}>
              Далее
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

const StyledTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: #0d0d0d;
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;

  &::before {
    content: '';

    display: block;

    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: #4765fa;
  }
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
