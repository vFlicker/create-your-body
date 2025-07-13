import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { MeasurementsChart } from '~/entities/measurement';
import PlusIcon from '~/shared/assets/svg/plus.svg?react';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { IconButton } from '~/shared/ui/atoms/IconButton';

export function MeasurementsWidget(): JSX.Element {
  const navigate = useNavigate();

  return (
    <StyledMeasurementsWidget>
      <StyledTitle>Мои замеры</StyledTitle>
      <MeasurementsChart />
      <StyledMeasurementsActionWrapper>
        <Button
          color="accent"
          variant="outlined"
          onClick={() => navigate(AppRoute.Measurements)}
        >
          Перейти к замерам
        </Button>
        <StyledCreateMeasurementButton
          color="accent"
          iconComponent={<PlusIcon stroke="#ffffff" />}
          isActive
          onClick={() => navigate(AppRoute.CreateMeasurements)}
        />
      </StyledMeasurementsActionWrapper>
    </StyledMeasurementsWidget>
  );
}

const StyledMeasurementsWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledTitle = styled.h2`
  margin-bottom: 12px;

  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledMeasurementsActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StyledCreateMeasurementButton = styled(IconButton)`
  button {
    width: 54px;
    height: 54px;
  }
`;
