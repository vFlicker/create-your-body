import styled from '@emotion/styled';
import { JSX } from 'react';

import { FactBlock, ScreenHeader } from '~/entities/bmi';
import { StatCard } from '~/entities/bmi/ui/StatCard';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';

type ProteinScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

export function ProteinScreen({
  onNext,
  onBack,
}: ProteinScreenProps): JSX.Element {
  return (
    <StyledActivityScreenWrapper>
      <ScreenHeader
        title="Выберите норму белка"
        subtitle="⚖️ Определяем ваш идеальный баланс БЖУ"
      />

      <StyledMainWrapper>
        <StatCard />

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
