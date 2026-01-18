import styled from '@emotion/styled';
import { JSX } from 'react';

import {
  BmiChart,
  BmiStats,
  caloriesRiskLevelConfig,
  carbsRiskLevelConfig,
  Chip,
  FactBlock,
  fatsRiskLevelConfig,
  getRiskLevel,
  proteinsRiskLevelConfig,
  ShortStatCard,
  useCreateBmi,
} from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { ColorfulDot } from '~/shared/ui/atoms/ColorfulDot';
import { Loader } from '~/shared/ui/atoms/Loader';
import { RangeSelect } from '~/shared/ui/molecules/RangeSelect';

import { useBmiCalculatorStore } from '../../../model/bmiCalculatorStore';
import { useBmiCalculations } from '../../../model/useBmiCalculations';
import { getDeficitRangeSelectLabels } from './saveResultScreenLib';

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

  const { createBmi, isCreateBmiPending } = useCreateBmi();

  if (!allCalculatedData || isLoading) {
    return <Loader />;
  }

  const {
    carbs,
    proteins,
    fats,
    targetCalories,
    bmi,
    deficit,
    bmr,
    totalCalories,
    leanBodyMass,
  } = allCalculatedData;

  const handleFinishClick = async () => {
    await createBmi({
      dto: {
        calories: targetCalories,
        proteins: proteins.proteinsInGrams,
        fats: fats.fatsInGrams,
        carbs: carbs.carbsInGrams,
        imt: bmi,
        bmr,
        tdee: totalCalories,
        weight: form.fullWeight!,
        height: form.height!,
        deficit: form.deficitPercent,
      },
    });

    onFinish();
  };

  const deficitRangeLabels = getDeficitRangeSelectLabels(bmi);
  const caloriesRiskLevel = getRiskLevel(
    deficit.deviationFromTarget,
    caloriesRiskLevelConfig,
  );
  const proteinsRiskLevel = getRiskLevel(
    form.proteinRatio,
    proteinsRiskLevelConfig,
  );
  const fatsRiskLevel = getRiskLevel(form.fatRatio, fatsRiskLevelConfig);
  const carbsRiskLevel = getRiskLevel(carbs.carbsInGrams, carbsRiskLevelConfig);

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

        {form.hasExtraWeight && (
          <StyledLeanMassInfo>
            <span>ℹ️</span>
            <div>
              <strong>Расчёт от сухой массы тела</strong>
              <p>
                БЖУ рассчитаны от сухой массы ({leanBodyMass} кг), а не от
                полного веса ({form.fullWeight} кг). Это более точный расчёт при
                наличии лишнего веса.
              </p>
            </div>
          </StyledLeanMassInfo>
        )}

        {form.goal === 'deficit' && (
          <>
            <StyledTitle>Степень дефицита калорий</StyledTitle>

            <Chip color="normal">
              Дефицит {form.deficitPercent}% (
              {deficit.deficitPercentageFromTarget} ккал)
            </Chip>

            <RangeSelect
              min={deficitRangeLabels[0].value}
              max={deficitRangeLabels[deficitRangeLabels.length - 1].value}
              step={5}
              labels={deficitRangeLabels}
              value={form.deficitPercent}
              onChange={(value) => setForm({ ...form, deficitPercent: value })}
            />

            <ShortStatCard
              title={caloriesRiskLevel.label}
              description={caloriesRiskLevel.getDescription(
                deficit.deviationFromTarget,
              )}
              riskLevel={caloriesRiskLevel.riskLevel}
              valueEmoji={caloriesRiskLevel.valueEmoji}
              value={deficit.deficitPercentageFromTarget}
              measurementUnit="ккал"
            />
          </>
        )}

        <StyledSeparator />

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

        <ShortStatCard
          title={proteinsRiskLevel.label}
          description={proteinsRiskLevel.getDescription()}
          riskLevel={proteinsRiskLevel.riskLevel}
          valueEmoji={proteinsRiskLevel.valueEmoji}
          value={proteins.proteinsInGrams}
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
            { value: 1.5, text: '1,5 г/кг', description: 'Максимум' },
          ]}
          value={form.fatRatio}
          onChange={(value) => setForm({ ...form, fatRatio: value })}
        />

        <ShortStatCard
          title={fatsRiskLevel.label}
          description={fatsRiskLevel.getDescription()}
          riskLevel={fatsRiskLevel.riskLevel}
          valueEmoji={fatsRiskLevel.valueEmoji}
          value={fats.fatsInGrams}
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

        <ShortStatCard
          title={carbsRiskLevel.label}
          description={carbsRiskLevel.getDescription()}
          riskLevel={carbsRiskLevel.riskLevel}
          valueEmoji={carbsRiskLevel.valueEmoji}
          value={carbs.carbsInGrams}
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
            <Button
              color="accent"
              onClick={handleFinishClick}
              disabled={isCreateBmiPending}
            >
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

  padding: 16px 16px 104px;
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
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  z-index: 2;
`;

const StyledSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e2e2ea;
`;

const StyledLeanMassInfo = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background-color: #f0f0f6;

  span {
    font-size: 20px;
    flex-shrink: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  strong {
    font-size: 14px;
    font-weight: 600;
    color: #403c77;
  }

  p {
    font-size: 12px;
    font-weight: 500;
    line-height: 140%;
    color: #666;
    margin: 0;
  }
`;
