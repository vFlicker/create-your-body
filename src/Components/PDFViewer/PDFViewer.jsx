import { useState, useEffect, useRef } from 'react';
import left from '../../Assets/svg/left.svg';
import right from '../../Assets/svg/right.svg';
import Loader from '../../Components/Loader/Loader';
import './PDFViewer.css';

export default function PDFViewer({ pdf_list }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [isPressedLeft, setIsPressedLeft] = useState(false);
    const [isPressedRight, setIsPressedRight] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState({});
    
    const containerRef = useRef(null);
    const imageRefs = useRef([]);

    useEffect(() => {
        pdf_list.forEach((img, index) => {
            const image = new Image();
            image.src = img;
            image.onload = () => {
                setLoadedImages(prev => ({...prev, [index]: true}));
                if(index === 0) setIsLoading(false);
            };
        });
    }, [pdf_list]);

    useEffect(() => {
        setFade(true);
        const timer = setTimeout(() => setFade(false), 300);

        if (imageRefs.current[currentIndex] && containerRef.current) {
            const container = containerRef.current;
            const image = imageRefs.current[currentIndex];
            const containerWidth = container.offsetWidth;
            const imageLeft = image.offsetLeft;
            
            container.scrollTo({
                left: imageLeft - (containerWidth - image.offsetWidth) / 2,
                behavior: 'smooth'
            });
        }

        return () => clearTimeout(timer);
    }, [currentIndex]);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || imageRefs.current.length === 0) return;
            const container = containerRef.current;
            const scrollLeft = container.scrollLeft;
            const containerWidth = container.offsetWidth;

            imageRefs.current.forEach((image, index) => {
                if (!image) return;
                const imageLeft = image.offsetLeft;
                const imageCenter = imageLeft + image.offsetWidth / 2;

                if (scrollLeft + containerWidth / 2 >= imageCenter) {
                    setCurrentIndex(index);
                }
            });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleImageLoad = (index) => {
        setLoadedImages(prev => ({...prev, [index]: true}));
        if(index === currentIndex) setIsLoading(false);
    };

    const handleNavigation = (direction) => {
        setIsLoading(true);
        const newIndex = direction === 'next' 
            ? Math.min(currentIndex + 1, pdf_list.length - 1)
            : Math.max(currentIndex - 1, 0);

        if(loadedImages[newIndex]) setIsLoading(false);
        
        setCurrentIndex(newIndex);
    };

    return (
        <div className='pdfContainer'>
            {isLoading && <Loader />}
            
            <div 
                className={`pdfSlide ${fade ? 'fade' : ''}`} 
                ref={containerRef}
                style={{opacity: isLoading ? 0.5 : 1}}
            >
                {pdf_list.map((img, index) => (
                    <div 
                        key={index}
                        ref={el => imageRefs.current[index] = el}
                        className="pdfImageWrapper"
                    >
                        <img
                            src={img}
                            alt={`page-${index + 1}`}
                            className="pdfImage"
                            loading="lazy"
                            onLoad={() => handleImageLoad(index)}
                            style={{display: loadedImages[index] ? 'block' : 'none'}}
                        />
                    </div>
                ))}
            </div>

            <div className="pdfButtons" style={{opacity: isPressedLeft || isPressedRight ? '1' : '0.7'}}>
                {currentIndex !== 0 &&
                    <button
                        onClick={() => handleNavigation('prev')}
                        onMouseDown={() => setIsPressedLeft(true)}
                        onMouseUp={() => setIsPressedLeft(false)}
                        onTouchStart={() => setIsPressedLeft(true)}
                        onTouchEnd={() => setIsPressedLeft(false)}
                        disabled={isLoading}
                        style={{background: isPressedLeft ? '#A799FF' : ''}}
                    >
                        <img src={left} alt="Назад" />
                    </button>
                }

                <p>{currentIndex + 1}/{pdf_list.length}</p>

                {currentIndex !== pdf_list.length - 1 && 
                    <button
                        onClick={() => handleNavigation('next')}
                        onMouseDown={() => setIsPressedRight(true)}
                        onMouseUp={() => setIsPressedRight(false)}
                        onTouchStart={() => setIsPressedRight(true)}
                        onTouchEnd={() => setIsPressedRight(false)}
                        disabled={isLoading}
                        style={{background: isPressedRight ? '#A799FF' : ''}}
                    >
                        <img src={right} alt="Вперед" />
                    </button>
                }
            </div>
        </div>
    );
};
