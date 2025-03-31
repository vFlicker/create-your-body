import React, { useState, useEffect } from 'react'
import './Food.css'
import axios from 'axios'
import { API_BASE_URL } from '../../API'


import ProfileBtn from '../../Components/ProfileBtn/ProfileBtn'
import Loader from '../../Components/Loader/Loader'
import PdfViewer from '../../Components/PdfViewer/PdfViewer.jsx'
import FoodContainer from '../../Components/Container/FoodContainer'

import food from '../../Assets/nav/food.svg'

export default function Food({ data }) {
    const [isLoading, setIsLoading] = useState(true);
    const [dataFood, setDataFood] = useState(null);
    const [selectedPdfId, setSelectedPdfId] = useState(null);

    useEffect(() => {
        try {
            setIsLoading(true);
            const fetchData = async () => {
                const response = await axios.get(`${API_BASE_URL}/cms/api/nutrition/client/category/nutrition`);
                console.log(response.data);
                setDataFood(response.data);
            }
            fetchData();
        } catch (error) {
            console.error('Ошибка при получении данных:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleBack = () => {
        setSelectedPdfId(null);
    };

    // Передаем handleBack в Nav
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
        <div className='foodPage'>
            <div className='topFood'>
                <ProfileBtn level={data?.user_level} user_photo={data?.image} />
                <div className='topFoodTitle'>
                    <img src={food} alt='logo' />
                    <h1 style={{fontSize: '24px'}}>Питание</h1>
                </div>
            </div>
            <div className='botFood'>
                <div
                    className={`content-wrapper ${selectedPdfId ? 'slide-left' : ''}`}
                    style={{ position: isLoading ? 'absolute' : '', top: isLoading ? '50%' : '', transform: isLoading ? 'translateY(-50%)' : '' }}
                >
                    <div className='foodList'
                        style={{ display: isLoading ? 'flex' : '', flexDirection: isLoading ? 'column' : '', height: selectedPdfId ? '20vh' : '' }}
                    >
                        {isLoading ? <Loader /> :
                            dataFood?.data?.map((item) => (
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
                    {selectedPdfId && (
                        <div className={`pdf-wrapper ${selectedPdfId ? 'slide-in' : ''}`}>
                            <PdfViewer pdfId={selectedPdfId} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
