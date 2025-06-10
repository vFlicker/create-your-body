import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useLectureDetailsById } from '~/entities/lecture';
import lecturesIconSrc from '~/shared/assets/svg/book.svg';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

import TrainingPage from '../../Components/TrainingPage/TrainingPage';

export function LectureDetailsPage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { lectureDetails, isLectureDetailsPending } = useLectureDetailsById(id);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <CommonPageLayout
      title="Лекции"
      iconSrc={lecturesIconSrc}
      isLoading={isLectureDetailsPending}
    >
      <TrainingPage
        trainingData={lectureDetails}
        onBack={handleBack}
        lectures={true}
        jcsb={true}
      />
    </CommonPageLayout>
  );
}
