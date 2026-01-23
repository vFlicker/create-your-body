import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  CMS2_DEFAULT_FOLDER_ICON,
  CMS2_FOLDER_ICONS,
  useCms2ProductContent,
} from '~/entities/cms2';
import { AppRoute } from '~/shared/router';
import { TitleCard } from '~/shared/ui/molecules/TitleCard';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

export function Learning2ProductPage(): JSX.Element {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { productContent, isProductContentPending } = useCms2ProductContent(
    Number(productId),
  );

  if (!productContent || isProductContentPending) {
    return <CommonPageLayout title="Загрузка..." isLoading />;
  }

  const handleFolderClick = (folderId: number) => {
    navigate(AppRoute.Learning2Folder.replace(':folderId', String(folderId)));
  };

  const handleLessonClick = (lessonId: number) => {
    navigate(AppRoute.Learning2Lesson.replace(':lessonId', String(lessonId)));
  };

  return (
    <CommonPageLayout title={productContent.product.title}>
      <StyledContentWrapper>
        <StyledFoldersList>
          {productContent.content.map((node) => (
            <TitleCard
              key={node.id}
              title={node.title}
              iconSrc={
                CMS2_FOLDER_ICONS[node.title] || CMS2_DEFAULT_FOLDER_ICON
              }
              disabled={!node.access.hasAccess}
              badgeText={
                node.access.isTeaser ? node.access.teaserMessage : undefined
              }
              isHighlight={false}
              onClick={() =>
                node.type === 'folder'
                  ? handleFolderClick(node.id)
                  : handleLessonClick(node.id)
              }
            />
          ))}
        </StyledFoldersList>
      </StyledContentWrapper>
    </CommonPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledFoldersList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
