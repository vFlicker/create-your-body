import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useLectureDetailsById } from '~/entities/lecture';
import lecturesIconSrc from '~/shared/assets/svg/book.svg';
import brainIconSrc from '~/shared/assets/svg/brain.svg';
import { blockComponents } from '~/shared/ui/blockComponents';
import { Button } from '~/shared/ui/Button';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

export function LectureDetailsPage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { lectureDetails, isLectureDetailsPending } = useLectureDetailsById(id);

  const handleButtonClick = () => {
    navigate(-1);
  };

  return (
    <CommonPageLayout
      title="Лекции"
      iconSrc={lecturesIconSrc}
      isLoading={isLectureDetailsPending}
    >
      <StyledLectureDetailsPageWrapper>
        {lectureDetails?.blocks?.map(({ _id, type, video, content }) => {
          const BlockComponent = blockComponents[type];
          return (
            <BlockComponent
              key={_id}
              text={content?.text}
              embedCode={video?.embedCode}
            />
          );
        })}

        <Button
          color="secondary"
          iconSrc={brainIconSrc}
          onClick={handleButtonClick}
        >
          Изучено
        </Button>
      </StyledLectureDetailsPageWrapper>
    </CommonPageLayout>
  );
}

const StyledLectureDetailsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
