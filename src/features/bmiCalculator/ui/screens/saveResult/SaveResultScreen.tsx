import styled from '@emotion/styled';
import { JSX } from 'react';

import { FactBlock } from '~/entities/bmi';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { RangeSelect } from '~/shared/ui/molecules/RangeSelect';

type SaveResultScreenProps = {
  onRepeat: () => void;
  onFinish: () => void;
};

export function SaveResultScreen({
  onRepeat,
  onFinish,
}: SaveResultScreenProps): JSX.Element {
  return (
    <StyledActivityScreenWrapper>
      <StyledMainWrapper>
        <StyledChart>Графік з результатами</StyledChart>

        <StyledTitle>Степень дефицита калорий</StyledTitle>

        <RangeSelect
          min={0}
          max={1.5}
          step={0.1}
          labels={[
            { value: 0, text: '0 г' },
            { value: 0.7, text: '0,7 г/кг', description: 'Минимум' },
            { value: 1.0, text: '1,0 г/кг', description: 'Норма' },
            { value: 1.4, text: '1,4 г/кг', description: 'Высокий' },
            { value: 1.5, text: '1,5 г/кг', description: 'Максимум' },
          ]}
          value={0}
          onChange={() => {}}
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

const StyledChart = styled.div`
  width: 100%;
  height: 200px;
  background-color: #0b91ff;
`;

const StyledTitle = styled.h1`
  color: #0d0d0d;
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
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
