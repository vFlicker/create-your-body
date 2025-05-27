import './FoodPage.css';
import '../communication/CommunicationPage.css';

import { useEffect, useState } from 'react';

import { Profile } from '~/entities/user';
import { apiService } from '~/shared/api';
import food from '~/shared/assets/nav/food.svg';
import { Loader } from '~/shared/ui/Loader';
import { PdfViewer } from '~/widget/pdfViewer/PdfViewer';

import FoodContainer from '../../Components/Container/FoodContainer';

export function FoodPage({ data, userId, userQuery }) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataFood, setDataFood] = useState(null);
  const [selectedPdfId, setSelectedPdfId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getNutritionPlanCategories(userQuery);
        setDataFood(response.data);
      } catch (err) {
        console.error('Ошибка при получении данных о питании:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    setSelectedPdfId(null);
  };

  useEffect(() => {
    if (selectedPdfId) {
      window.handleBack = handleBack;
      document.body.setAttribute('data-handle-back', 'true');
    } else {
      window.handleBack = null;
      document.body.removeAttribute('data-handle-back');
    }
    return () => {
      window.handleBack = null;
      document.body.removeAttribute('data-handle-back');
    };
  }, [selectedPdfId]);

  return (
    <div className="foodPage">
      <div className="topFood">
        <Profile level={data?.user_level} photoSrc={data?.image} />
        <div className="topFoodTitle">
          <img src={food} alt="logo" />
          <h1 style={{ fontSize: '24px' }}>Питание</h1>
        </div>
      </div>
      <div className="botFood">
        <div
          className={`content-wrapper-food ${selectedPdfId ? 'slide-left' : ''}`}
          style={{
            width: isLoading ? '100%' : '',
            height: isLoading ? '100%' : '',
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <div
              className="foodList"
              style={{ height: selectedPdfId ? '50vh' : '' }}
            >
              {dataFood?.data?.map((item) => (
                <FoodContainer
                  key={item.id}
                  title={item.title}
                  icon={item.iconUrl}
                  iconAlt={item.title}
                  onClick={() => setSelectedPdfId(item.id)}
                  foodId={item.id}
                />
              ))}
            </div>
          )}
          {selectedPdfId && (
            <div className={`pdf-wrapper ${selectedPdfId ? 'slide-in' : ''}`}>
              <PdfViewer
                userQuery={userQuery}
                userId={userId}
                pdfId={selectedPdfId}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
