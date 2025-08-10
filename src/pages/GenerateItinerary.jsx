import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaClock, FaStar, FaPlus, FaCheck } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import RoundLoader from '../components/RoundLoader';



const activities = [
    {
        id: 1,
        title: "Mountain Spa Escape",
        description: "Relax and rejuvenate in a serene alpine setting.",
        duration: "2 hrs",
        reviews: 120,
        rating: 4.5,
        type: "Premium",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
        tip: "Visit after 4 PM to avoid crowds"
    },
    {
        id: 2,
        title: "Art Gallery Tour",
        description: "Explore contemporary Canadian art with a guided session.",
        duration: "3 hrs",
        reviews: 120,
        rating: 4.2,
        type: "Paid",
        image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=300&fit=crop",
        tip: "Visit after 4 PM to avoid crowds"
    },
    {
        id: 3,
        title: "Banff Gondola Viewpoint",
        description: "Capture stunning panoramic views of the Canadian Rockies.",
        duration: "3 hrs",
        reviews: 120,
        rating: 4.8,
        type: "Free",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        tip: null
    },
    {
        id: 4,
        title: "Café Hopping in Downtown Banff",
        description: "Discover cozy cafés and local brews in the heart of town.",
        duration: "1.5 hrs",
        reviews: 120,
        rating: 4.3,
        type: "Paid",
        image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop",
        tip: null
    },
    {
        id: 5,
        title: "Café Hopping in Downtown Banff",
        description: "Discover cozy cafés and local brews in the heart of town.",
        duration: "1.5 hrs",
        reviews: 120,
        rating: 4.3,
        type: "Paid",
        image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop",
        tip: null
    },
    {
        id: 6,
        title: "Café Hopping in Downtown Banff",
        description: "Discover cozy cafés and local brews in the heart of town.",
        duration: "1.5 hrs",
        reviews: 120,
        rating: 4.5,
        type: "Paid",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
        tip: null
    }
];


function GenerateItinerary() {
    const [likedItems, setLikedItems] = useState([]);
    const [addedItems, setAddedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!state) {
            router("/")
        }
        setLoading(false)
        console.log(state)
    }, [])

    const toggleLike = (id) => {
        setLikedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const toggleAdded = (id) => {
        setAddedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const handleGenerate = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            formData: state,
            preference: addedItems
        }
        try {
            console.log("data:", data);
        } catch (error) {

        }
        finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <RoundLoader />
        )
    }


    return (
        <div className='relative bg-gray-50 px-4 py-20 mt-10 sm:px-6 lg:px-8 min-h-screen' >

            <section
                className="relative max-w-7xl mx-auto pt-4 px-4 bg-white shadow-lg w-full rounded-lg"
                data-aos="fade-right"
            >
                <div
                    className="flex flex-row gap-4 flex-1/10 items-center justify-start mx-6 p-4 mb-8"
                >
                    <FaArrowLeftLong className='w-6 h-6  text-gray-700 my-2 cursor-pointer duration-200 transition-all hover:-translate-x-1' onClick={() => router("/")} />
                </div>
                <div className="max-w-7xl mx-auto">
                    {/* Cards Grid */}
                    <div className="flex flex-wrap sm:mx-3 mb-8">
                        {activities.map((activity, index) => (
                            <div key={activity.id} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
                                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative">
                                        <img
                                            src={activity.image}
                                            alt={activity.title}
                                            className="w-full h-48 object-cover"
                                        />

                                        {/* Type Badge */}
                                        <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-white text-sm font-medium bg-blue-500`}>
                                            {activity.type}
                                        </div>

                                        {/* Heart Icon */}
                                        <button
                                            onClick={() => toggleLike(activity.id)}
                                            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200 cursor-pointer"
                                        >
                                            {likedItems.includes(activity.id) ? (
                                                <FaHeart className="w-5 h-5 text-red-500" />
                                            ) : (
                                                <FaRegHeart className="w-5 h-5 text-gray-700" />
                                            )}
                                        </button>

                                        {/* Rating Badge */}
                                        <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 rounded-full flex items-center gap-1">
                                            <FaStar className="w-4 h-4 text-yellow-400" />
                                            <span className="text-sm font-medium">{activity.rating}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {activity.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 flex-1">
                                            {activity.description}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex justify-between items-center gap-6 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <FaClock className="w-4 h-4" />
                                                <span>{activity.duration}</span>
                                            </div>
                                            <span>{activity.reviews} reviews</span>
                                        </div>

                                        {/* Tip (if exists) */}
                                        {activity.tip && (
                                            <p className="text-sm text-gray-600 mb-4">
                                                Tip: {activity.tip}
                                            </p>
                                        )}

                                        {/* Add to GenerateItinerary Button */}
                                        <button
                                            onClick={() => toggleAdded(activity.id)}
                                            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${addedItems.includes(activity.id)
                                                ? 'bg-blue-500 text-blue-50 hover:bg-blue-600'
                                                : 'bg-white text-blue-500 hover:bg-blue-50 border-1 border-blue-500'
                                                }`}
                                        >

                                            {addedItems.includes(activity.id) ? <FaCheck className='w-4 h-4' /> : <FaPlus className="w-4 h-4 " />}
                                            {addedItems.includes(activity.id) ? 'Added to itinerary' : 'Add to itinerary'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Generate Trip Plan Button */}
                    <div className="flex justify-center pb-10">
                        <button className="max-w-lg w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl" onClick={handleGenerate}>
                            Generate My Trip Plan
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GenerateItinerary
