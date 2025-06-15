import styled from '@emotion/styled';
import { JSX } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useBodyMeasurements } from '~/entities/user';
import measurementsImageSrc from '~/shared/assets/img/measurements.jpeg';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/Button';
import { UserPageLayout } from '~/widgets/UserPageLayout';

export function StartProfilePage(): JSX.Element {
  const navigate = useNavigate();

  const { bodyMeasurements, isBodyMeasurementsPending } = useBodyMeasurements();
  const hasBodyMeasurements = bodyMeasurements?.length > 0;

  if (hasBodyMeasurements) {
    return <Navigate to={AppRoute.Profile} replace />;
  }

  return (
    <UserPageLayout isLoading={isBodyMeasurementsPending} hasUserLevel>
      <StyledStartProfilePageWrapper>
        <StyledImage src={measurementsImageSrc} />
        <StyledInfoWrapper>
          <StyledTitle>Почему важно сделать фото и замеры?</StyledTitle>
          <StyledText>
            Полагаться только на весы нет смысла. (советую взвешиваться не чаще
            чем раз в неделю на программе).
          </StyledText>

          <StyledHighlightedText color="primary">
            Вес может скакать изо дня в день, особенно если вы начинаете ходить
            в зал. Это нормально.
          </StyledHighlightedText>

          <StyledText>
            Также помним, что один и тот же вес будет смотреться на разных
            девушках по-разному! Все зависит от соотношения жира и мышц в
            организме.
          </StyledText>

          <StyledHighlightedText color="secondary">
            Поэтому ни с кем себя не сравниваем! Сравниваем только с собой из
            вчера!
          </StyledHighlightedText>
        </StyledInfoWrapper>
        <Button
          color="accent"
          onClick={() => navigate(AppRoute.BodyMeasurements)}
        >
          Добавить параметры
        </Button>
      </StyledStartProfilePageWrapper>
    </UserPageLayout>
  );
}

const StyledStartProfilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 320px;
  border-radius: 14px;
  margin-bottom: 16px;
  object-fit: cover;
  object-position: top center;
`;

const StyledInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-bottom: 20px;
`;

const StyledTitle = styled.h4`
  color: #0d0d0d;
  font-size: 16px;
  font-weight: 700;
`;

const StyledText = styled.p`
  color: #0d0d0d;
  font-size: 14px;
`;

const highlightedTextColors = {
  primary: '#CEC8FF',
  secondary: '#E6FFAD',
};

const StyledHighlightedText = styled.p<{ color: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 14px;

  color: #0d0d0d;
  font-size: 14px;

  background-color: ${({ color }) => highlightedTextColors[color]};
`;
