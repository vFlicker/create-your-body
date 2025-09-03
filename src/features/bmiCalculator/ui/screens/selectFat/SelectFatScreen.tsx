import styled from '@emotion/styled';
import { JSX } from 'react';

import {
  Chip,
  FactBlock,
  fatsRiskLevelConfig,
  getRiskLevel,
  ScreenHeader,
  StatCard,
} from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { ColorfulDot } from '~/shared/ui/atoms/ColorfulDot';
import { Loader } from '~/shared/ui/atoms/Loader';
import { RangeSelect } from '~/shared/ui/molecules/RangeSelect';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';
import { useBmiCalculations } from '../../../model/useBmiCalculations';

type SelectFatScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function SelectFatScreen({
  onNext,
  onBack,
}: SelectFatScreenProps): JSX.Element {
  const { form, setForm } = useBmiCalculatorStore();
  const { allCalculatedData, isLoading } = useBmiCalculations();

  if (!allCalculatedData || isLoading) {
    return <Loader />;
  }

  const { fats } = allCalculatedData;

  const { riskLevel, label, chipColor, valueEmoji, getDescription } =
    getRiskLevel(form.fatRatio, fatsRiskLevelConfig);

  return (
    <StyledActivityScreenWrapper>
      <ScreenHeader
        title="Выберите норму жиров"
        subtitle="⚖️ Определяем ваш идеальный баланс БЖУ "
      />

      <StyledMainWrapper>
        <StyledTop>
          <StyledTitleWrapper>
            <ColorfulDot circleColor="#ffbf2b" />
            <span>Жиры</span>
          </StyledTitleWrapper>
          <Chip color={chipColor}>{label}</Chip>
        </StyledTop>

        <RangeSelect
          min={0}
          max={1.5}
          step={0.1}
          labels={[
            { value: 0, text: '0 г' },
            { value: 0.7, text: '0,7 г/кг', description: 'Минимум' },
            { value: 1.0, text: '1,0 г/кг', description: 'Норма' },
            { value: 1.3, text: '1,3 г/кг', description: 'Высокий' },
            { value: 1.5, text: '1,5 г/кг', description: 'Максимум' },
          ]}
          value={form.fatRatio}
          onChange={(value) => setForm({ ...form, fatRatio: value })}
        />

        <StatCard
          title={`Ваш уровень жиров (${form.fatRatio} г/кг веса)`}
          description={getDescription()}
          riskLevel={riskLevel}
          value={fats.fatsInGrams}
          valueEmoji={valueEmoji}
          calories={fats.fatsInKcal}
          percentage={fats.fatsPercentFromTarget}
        />

        <StyledFooter>
          <FactBlock>
            Холестерин из жиров — предшественник тестостерона. Недостаток жира
            снижает либидо.
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

const StyledTitleWrapper = styled.div`
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
