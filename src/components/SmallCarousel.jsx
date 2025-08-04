import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SmallCarousel = () => {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollContainerRef = useRef(null);

    const landmarks = [
        {
            id: 1,
            name: "Eiffel Tower",
            tours: "356 Tours",
            image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=300&h=400&fit=crop"
        },
        {
            id: 2,
            name: "Machu Picchu",
            tours: "356 Tours",
            image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=300&h=400&fit=crop"
        },
        {
            id: 3,
            name: "Great Wall",
            tours: "356 Tours",
            image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&h=400&fit=crop"
        },
        {
            id: 4,
            name: "Statue of Liberty",
            tours: "356 Tours",
            image: "https://images.unsplash.com/photo-1503572327579-b5c6afe5c5c5?w=300&h=400&fit=crop"
        },
        {
            id: 5,
            name: "Taj Mahal",
            tours: "356 Tours",
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=400&fit=crop"
        },
        {
            id: 6,
            name: "Opera House",
            tours: "356 Tours",
            image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=300&h=400&fit=crop"
        },
        {
            id: 7,
            name: "Colosseum",
            tours: "356 Tours",
            image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=400&fit=crop"
        },
        {
            id: 8,
            name: "Grand Canyon",
            tours: "356 Tours",
            image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=300&h=400&fit=crop"
        }
    ];

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollButtons);
            window.addEventListener('resize', checkScrollButtons);

            return () => {
                scrollContainer.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('resize', checkScrollButtons);
            };
        }
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="w-full max-w-7xl  mx-auto px-4 py-8">
            <div className="relative">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-opacity ${
                        canScrollLeft ? 'opacity-100 cursor-pointer hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!canScrollLeft}
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className={`absolute sm:-right-4 right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-opacity ${
                        canScrollRight ? 'opacity-100 cursor-pointer hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!canScrollRight}
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>

                {/* Carousel Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-8"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitScrollbar: { display: 'none' }
                    }}
                >
                    {landmarks.map((landmark) => (
                        <div
                            key={landmark.id}
                            className="flex-none group cursor-pointer"
                        >
                            <div className="flex flex-col items-center space-y-3">
                                {/* Circular Image Container */}
                                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                    <img
                                        src={landmark.image}
                                        alt={landmark.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="text-center">
                                    <h3 className="font-medium text-gray-900 text-sm">
                                        {landmark.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {landmark.tours}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SmallCarousel;