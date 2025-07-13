import styled from '@emotion/styled';
import { isToday } from 'date-fns';
import { JSX } from 'react';

import arrowDownIconSrc from '~/shared/assets/svg/arrow-narrow-down.svg';
import EditIcon from '~/shared/assets/svg/pencil.svg?react';
import PlusIcon from '~/shared/assets/svg/plus.svg?react';
import StepsIcon from '~/shared/assets/svg/run-green.svg?react';
import ForkIcon from '~/shared/assets/svg/small-button.svg?react';
import WeightIcon from '~/shared/assets/svg/weight.svg?react';
import { formatNumberWithThousands } from '~/shared/libs/format';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';

import { useDailyReports } from '../api/useDailyReports';
import { getReportForDate } from '../dailyReportLib';

type DailyReportCardProps = {
  date: Date;
  onCreateReportClick: () => void;
  onEditReportClick: (id: number) => void;
};

export function DailyReportCard({
  date,
  onCreateReportClick,
  onEditReportClick,
}: DailyReportCardProps): JSX.Element {
  const { dailyReports, isDailyReportsPending } = useDailyReports();

  const isTodayReport = isToday(date);
  const reportForToday = getReportForDate(date, dailyReports);

  const showButton = reportForToday || isTodayReport;
  const report = !isDailyReportsPending ? reportForToday : null;
  const hasReport = !!report;

  const handleButtonClick = () => {
    if (hasReport) {
      onEditReportClick(report.id);
    } else if (isTodayReport) {
      onCreateReportClick();
    }
  };

  return (
    <StyledHealthTrackerWrapper>
      <StyledMetrics>
        <StyledMetric>
          <StyledIconWrapper>
            <WeightIcon stroke="#CBFF52" />
          </StyledIconWrapper>
          <StyledMetricValue>
            {hasReport ? `${report?.weight}` : '-'} <span>кг</span>
            {hasReport && <StyledArrowIcon src={arrowDownIconSrc} />}
          </StyledMetricValue>
        </StyledMetric>
        <StyledMetric>
          <StyledIconWrapper>
            <StepsIcon stroke="#CBFF52" />
          </StyledIconWrapper>
          <StyledMetricValue>
            {hasReport
              ? `${formatNumberWithThousands(report?.steps ?? 0)}`
              : '-'}{' '}
            <span>шагов</span>
          </StyledMetricValue>
        </StyledMetric>
      </StyledMetrics>
      <StyledHorizontalDivider />
      <StyledNutrients>
        <StyledNutrientWrapper>
          <StyledIconWrapper>
            <ForkIcon fill="#CBFF52" />
          </StyledIconWrapper>
          <StyledNutrient>
            <StyledNutrientValue>
              {hasReport ? report?.calories : '-'}
            </StyledNutrientValue>
            <StyledNutrientLabel>ККАЛ</StyledNutrientLabel>
          </StyledNutrient>
        </StyledNutrientWrapper>
        <StyledVerticalDivider />
        <StyledNutrient>
          <StyledNutrientValue>
            {hasReport ? report?.proteins : '-'} <span>г</span>
          </StyledNutrientValue>
          <StyledNutrientLabel>БЕЛКИ</StyledNutrientLabel>
        </StyledNutrient>
        <StyledNutrient>
          <StyledNutrientValue>
            {hasReport ? report?.fats : '-'} <span>г</span>
          </StyledNutrientValue>
          <StyledNutrientLabel>ЖИРЫ</StyledNutrientLabel>
        </StyledNutrient>
        <StyledNutrient>
          <StyledNutrientValue>
            {hasReport ? report?.carbs : '-'} <span>г</span>
          </StyledNutrientValue>
          <StyledNutrientLabel>УГЛЕВОДЫ</StyledNutrientLabel>
        </StyledNutrient>
      </StyledNutrients>

      {showButton && (
        <StyledButton
          variant="filled"
          color="secondary"
          iconComponent={hasReport ? <EditIcon /> : <PlusIcon />}
          onClick={handleButtonClick}
        >
          {hasReport ? 'Обновить данные' : 'Внести данные'}
        </StyledButton>
      )}
    </StyledHealthTrackerWrapper>
  );
}

const StyledHealthTrackerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  padding: 18px 18px 22px 18px;
  border-radius: 10px;
  color: ${Color.White};
  background-image: linear-gradient(90deg, #7a66ff 0%, #8877fc 100%);
`;

const StyledMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledMetric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledNutrientWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 26px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.12);
`;

const StyledMetricValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;

  font-size: 24px;
  font-weight: 600;
  line-height: 100%;

  span {
    font-size: 10px;
    text-transform: uppercase;
  }
`;

const StyledArrowIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const StyledHorizontalDivider = styled.hr`
  height: 1px;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
`;

const StyledVerticalDivider = styled.div`
  display: flex;
  border: none;
  width: 1px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const StyledNutrients = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledNutrient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;

const StyledNutrientValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;

  span {
    font-size: 11px;
    text-transform: uppercase;
  }
`;

const StyledNutrientLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  line-height: 100%;
  text-transform: uppercase;
`;

const StyledButton = styled(Button)`
  border: 1px solid rgba(255, 255, 255, 0.3);

  color: ${Color.White};

  background-color: rgba(255, 255, 255, 0.2);
  background-image: linear-gradient(
    98deg,
    rgba(255, 255, 255, 0.2) 32.98%,
    rgba(255, 255, 255, 0.3) 65.01%
  );

  stroke: ${Color.White};
`;
