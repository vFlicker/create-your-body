import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { MeasurementsChart } from '~/entities/measurement';
import plusIconSrc from '~/shared/assets/svg/plus.svg';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { IconButton } from '~/shared/ui/atoms/IconButton';

export function MeasurementsWidget(): JSX.Element {
  const navigate = useNavigate();

  return (
    <StyledMeasurementsWidget>
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
          iconSrc={plusIconSrc}
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
