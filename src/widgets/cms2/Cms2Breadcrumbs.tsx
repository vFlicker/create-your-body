import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Cms2BreadcrumbItem } from '~/entities/cms2';
import { useCms2Breadcrumbs } from '~/entities/cms2';
import { AppRoute } from '~/shared/router';
import { Color } from '~/shared/theme/colors';

type Cms2BreadcrumbsProps = {
  nodeId: number;
  rootLabel?: string;
};

export function Cms2Breadcrumbs({
  nodeId,
  rootLabel = 'Обучение',
}: Cms2BreadcrumbsProps): JSX.Element | null {
  const navigate = useNavigate();
  const { breadcrumbs, isBreadcrumbsPending } = useCms2Breadcrumbs(nodeId);

  if (isBreadcrumbsPending) {
    return null;
  }

  const handleClick = (item: Cms2BreadcrumbItem | null) => {
    if (!item) {
      // Root "Обучение" click - go to learning page
      navigate(AppRoute.Learning);
      return;
    }
    if (item.type === 'product') {
      navigate(AppRoute.LearningProduct.replace(':productId', String(item.id)));
    } else if (item.type === 'folder') {
      navigate(AppRoute.LearningFolder.replace(':folderId', String(item.id)));
    } else if (item.type === 'lesson') {
      navigate(AppRoute.LearningLesson.replace(':lessonId', String(item.id)));
    }
  };

  // Don't show the last item (current page)
  const visibleBreadcrumbs = breadcrumbs.slice(0, -1);

  return (
    <StyledBreadcrumbs>
      <StyledBreadcrumbItem>
        <StyledLink onClick={() => handleClick(null)}>{rootLabel}</StyledLink>
        {visibleBreadcrumbs.length > 0 && <StyledSeparator>/</StyledSeparator>}
      </StyledBreadcrumbItem>
      {visibleBreadcrumbs.map((item, index) => (
        <StyledBreadcrumbItem key={item.id}>
          <StyledLink onClick={() => handleClick(item)}>
            {item.title}
          </StyledLink>
          {index < visibleBreadcrumbs.length - 1 && (
            <StyledSeparator>/</StyledSeparator>
          )}
        </StyledBreadcrumbItem>
      ))}
    </StyledBreadcrumbs>
  );
}

const StyledBreadcrumbs = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
`;

const StyledBreadcrumbItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: ${Color.Black_400};
  cursor: pointer;

  &:hover {
    color: ${Color.Violet_300};
  }
`;

const StyledSeparator = styled.span`
  font-size: 12px;
  color: ${Color.Black_300};
`;
