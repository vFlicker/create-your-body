import styled from '@emotion/styled';
import { JSX, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { hasWeekStructure, useCms2Folder } from '~/entities/cms2';
import { AppRoute } from '~/shared/router';
import { Cms2NodeCard } from '~/shared/ui/molecules/Cms2NodeCard';
import { Cms2Breadcrumbs, Cms2TrainingNavigator } from '~/widgets/cms2';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

export function Learning2FolderPage(): JSX.Element {
  const navigate = useNavigate();
  const { folderId } = useParams<{ folderId: string }>();
  const { folder, isFolderPending } = useCms2Folder(Number(folderId));

  // Check if this folder has week structure
  const isWeekBasedFolder = useMemo(() => {
    if (!folder?.children) return false;
    return hasWeekStructure(folder.children);
  }, [folder]);

  if (!folder || isFolderPending) {
    return <CommonPageLayout title="Загрузка..." isLoading />;
  }

  const nodeId = Number(folderId);

  if (folder.children.length === 0) {
    return (
      <CommonPageLayout
        title={folder.folder.title}
        breadcrumbs={<Cms2Breadcrumbs nodeId={nodeId} />}
      >
        <StyledEmptyMessage>Здесь пока ничего нет</StyledEmptyMessage>
      </CommonPageLayout>
    );
  }

  const handleFolderClick = (id: number) => {
    navigate(AppRoute.Learning2Folder.replace(':folderId', String(id)));
  };

  const handleLessonClick = (id: number) => {
    navigate(AppRoute.Learning2Lesson.replace(':lessonId', String(id)));
  };

  // Show TrainingNavigator for folders with weeks
  if (isWeekBasedFolder) {
    return (
      <CommonPageLayout
        title={folder.folder.title}
        breadcrumbs={<Cms2Breadcrumbs nodeId={nodeId} />}
      >
        <Cms2TrainingNavigator weeks={folder.children} />
      </CommonPageLayout>
    );
  }

  const sortedChildren = [...folder.children].sort((a, b) => a.order - b.order);

  return (
    <CommonPageLayout
      title={folder.folder.title}
      breadcrumbs={<Cms2Breadcrumbs nodeId={nodeId} />}
    >
      <StyledNodesList>
        {sortedChildren.map((node) => (
          <Cms2NodeCard
            key={node.id}
            title={node.title}
            type={node.type}
            coverImage={node.coverImage}
            disabled={!node.access.hasAccess}
            badgeText={
              node.access.isTeaser ? node.access.teaserMessage : undefined
            }
            isCompleted={node.isCompleted}
            hasTypeBadge={node.hasTypeBadge !== false}
            onClick={() =>
              node.type === 'folder'
                ? handleFolderClick(node.id)
                : handleLessonClick(node.id)
            }
          />
        ))}
      </StyledNodesList>
    </CommonPageLayout>
  );
}

const StyledNodesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledEmptyMessage = styled.p`
  margin: 0;
  padding: 32px 16px;
  text-align: center;
  font-size: 14px;
  color: var(--black-400, #999999);
`;
