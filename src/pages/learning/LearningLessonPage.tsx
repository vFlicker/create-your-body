import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useCms2Lesson,
  useCms2Progress,
  useLessonPageState,
  useMarkLessonComplete,
  useMarkPageComplete,
} from '~/entities/cms2';
import { usePersistentBackNavigation } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { Cms2ContentRenderer } from '~/shared/ui/molecules/cms2Blocks';
import { LessonStepNavigation } from '~/shared/ui/molecules/LessonStepNavigation';
import { LessonStepTabs } from '~/shared/ui/molecules/LessonStepTabs';
import { Cms2Breadcrumbs } from '~/widgets/cms2';
import { CommonPageLayout } from '~/widgets/layouts/CommonPageLayout';

export function LearningLessonPage(): JSX.Element {
  const navigate = useNavigate();
  const { goBack } = usePersistentBackNavigation();
  const { lessonId } = useParams<{ lessonId: string }>();
  const nodeId = Number(lessonId);

  const { lesson, isLessonPending } = useCms2Lesson(nodeId);
  const { progress } = useCms2Progress(nodeId);
  const { markPageComplete } = useMarkPageComplete();
  const { markLessonComplete } = useMarkLessonComplete();

  const {
    currentPageIndex,
    currentPage,
    pages,
    isFirstPage,
    isLastPage,
    hasMultiplePages,
    setCurrentPageIndex,
  } = useLessonPageState({ lesson, progress });

  const showStepTitles = lesson?.settings?.showStepTitles === true;

  if (!lesson || isLessonPending) {
    return <CommonPageLayout title="Загрузка..." isLoading />;
  }

  const handleNext = () => {
    if (!isLastPage && currentPage) {
      markPageComplete({ nodeId, pageId: currentPage.id }).catch(() => {
        // Silently ignore - fire-and-forget
      });
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstPage) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handlePageSelect = (index: number) => {
    if (index > currentPageIndex && currentPage) {
      markPageComplete({ nodeId, pageId: currentPage.id }).catch(() => {
        // Silently ignore - fire-and-forget
      });
    }
    setCurrentPageIndex(index);
  };

  const handleFinish = () => {
    if (currentPage) {
      markPageComplete({ nodeId, pageId: currentPage.id }).catch(() => {
        // Silently ignore
      });
    }
    markLessonComplete(nodeId).catch(() => {
      // Silently ignore
    });

    const didGoBack = goBack();
    if (!didGoBack) {
      navigate(-1);
    }
  };

  if (!currentPage) {
    return (
      <CommonPageLayout title={lesson.title}>
        <StyledEmptyMessage>Контент не найден</StyledEmptyMessage>
      </CommonPageLayout>
    );
  }

  // Extract TipTap nodes from the page blocks
  const tipTapNodes = currentPage.blocks.flatMap((block) =>
    block.type === 'text' ? block.content.content : [],
  );

  // Use lesson title if single page with default "Страница 1" title
  const pageTitle =
    pages.length === 1 && currentPage.title === 'Страница 1'
      ? lesson.title
      : currentPage.title || lesson.title;

  // Режим с табами (showStepTitles === true)
  if (showStepTitles && hasMultiplePages) {
    return (
      <CommonPageLayout
        title={lesson.title}
        breadcrumbs={<Cms2Breadcrumbs nodeId={nodeId} />}
      >
        <LessonStepTabs
          pages={pages}
          currentIndex={currentPageIndex}
          onSelect={handlePageSelect}
        />

        <Cms2ContentRenderer nodes={tipTapNodes} />

        <StyledFinishWrapper>
          {isLastPage && (
            <Button color="accent" onClick={handleFinish}>
              Завершить урок
            </Button>
          )}
        </StyledFinishWrapper>
      </CommonPageLayout>
    );
  }

  // Режим с точками навигации (по умолчанию)
  return (
    <CommonPageLayout
      title={pageTitle}
      breadcrumbs={<Cms2Breadcrumbs nodeId={nodeId} />}
    >
      <StyledContentWrapper hasBottomNav={hasMultiplePages}>
        <Cms2ContentRenderer nodes={tipTapNodes} />

        {!hasMultiplePages && (
          <StyledSinglePageFinish>
            <Button color="accent" onClick={handleFinish}>
              Завершить
            </Button>
          </StyledSinglePageFinish>
        )}
      </StyledContentWrapper>

      {hasMultiplePages && (
        <LessonStepNavigation
          currentIndex={currentPageIndex}
          totalPages={pages.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onFinish={handleFinish}
          onPageSelect={handlePageSelect}
        />
      )}
    </CommonPageLayout>
  );
}

const StyledContentWrapper = styled.div<{ hasBottomNav?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: ${({ hasBottomNav }) => (hasBottomNav ? '80px' : '0')};
`;

const StyledSinglePageFinish = styled.div`
  margin-top: 24px;
`;

const StyledFinishWrapper = styled.div`
  margin-top: 24px;
`;

const StyledEmptyMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 24px;
`;
