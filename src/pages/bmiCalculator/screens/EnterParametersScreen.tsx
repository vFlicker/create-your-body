import styled from '@emotion/styled';
import { JSX } from 'react';

import { useBmiStore } from '~/entities/bmi/model/bmiStore';
import {
  EnterParametersForm,
  ToggleHasExtraWeight,
} from '~/features/bmiCalculator/enterParameters';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';

import { FactBlock } from './ui/FactBlock';
import { ScreenHeader } from './ui/ScreenHeader';

type EnterParametersScreenProps = {
  onNext: () => void;
};

export function EnterParametersScreen({
  onNext,
}: EnterParametersScreenProps): JSX.Element {
  const { form } = useBmiStore();

  const isDisabled = form.height === undefined || form.weight === undefined;

  return (
    <StyledEnterParametersScreenWrapper>
      <ScreenHeader
        title="Введите свои параметры"
        subtitle="🔥 Узнайте свой базовый обмен веществ (BMR)"
      />

      <StyledMainWrapper>
        <StyledFormWrapper>
          <EnterParametersForm />
          <ToggleHasExtraWeight />
        </StyledFormWrapper>

        <StyledFooter>
          <FactBlock>
            Мужчины обычно имеют базовый обмен веществ выше на{' '}
            <span>10-15%</span> из-за большей мышечной массы
          </FactBlock>

          <StyledActions>
            <Button color="accent" disabled={isDisabled} onClick={onNext}>
              Далее
            </Button>
          </StyledActions>
        </StyledFooter>
      </StyledMainWrapper>
    </StyledEnterParametersScreenWrapper>
  );
}

const StyledEnterParametersScreenWrapper = styled.div`
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

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
