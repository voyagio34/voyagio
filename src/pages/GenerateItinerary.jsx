import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaClock, FaStar, FaStarHalfAlt, FaRegStar, FaPlus, FaCheck } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import RoundLoader from '../components/RoundLoader';




function GenerateItinerary() {
    const INITIAL_VISIBLE = 6;
    const LOAD_MORE_STEP = 6;
    const [likedItems, setLikedItems] = useState([]);
    const [addedItems, setAddedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useNavigate();
    const { state } = useLocation();
    const [activities, setActivites] = useState([])


    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const displayedActivities = activities.slice(0, visibleCount);

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!state) {
            router("/")
        }
        setActivites(state);
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
    const renderStars = (rating = 0) => {
        const safe = Math.max(0, Math.min(5, Number(rating) || 0));
        const rounded = Math.round(safe * 2) / 2; // nearest 0.5
        const full = Math.floor(rounded);
        const half = rounded % 1 ? 1 : 0;
        const empty = 5 - full - half;

        return (
            <>
                {[...Array(full)].map((_, i) => (
                    <FaStar key={`f-${i}`} className="w-4 h-4 text-yellow-400" />
                ))}
                {half === 1 && <FaStarHalfAlt className="w-4 h-4 text-yellow-400" />}
                {[...Array(empty)].map((_, i) => (
                    <FaRegStar key={`e-${i}`} className="w-4 h-4 text-yellow-400" />
                ))}
            </>
        );
    };


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
                    <div className="flex flex-wrap sm:mx-3 mb-2 ">
                        {displayedActivities.map((activity, index) => (
                            <div key={index} className="w-full transition-all md:w-1/2 lg:w-1/3 px-2 mb-6">
                                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative">
                                        <img
                                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${activity.photos[0].photo_reference}&key=${import.meta.env.VITE_REACT_GOOGLE_PHOTO_API_KEY}`}
                                            alt={activity.name}
                                            className="w-full h-48 object-cover"
                                        />

                                        {/* Type Badge */}
                                        <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-white text-sm font-medium bg-blue-500 capitalize`}>
                                            {activity.types[0]}
                                        </div>

                                        {/* Heart Icon */}
                                        <button
                                            onClick={() => toggleLike(activity.place_id)}
                                            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200 cursor-pointer"
                                        >
                                            {likedItems.includes(activity.place_id) ? (
                                                <FaHeart className="w-5 h-5 text-red-500" />
                                            ) : (
                                                <FaRegHeart className="w-5 h-5 text-gray-700" />
                                            )}
                                        </button>


                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {activity.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 flex-1">
                                            {(activity.formatted_address).trim(10)}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex justify-between items-center gap-6 text-sm text-gray-500 mb-4">

                                            <div className=" rounded-full flex items-center gap-1" title={`${activity.rating ?? 0} / 5`}>
                                                {renderStars(activity.rating)}
                                                <span className="font-medium">{(activity.rating ?? 0).toFixed(1)}</span>
                                            </div>

                                            <span>{activity.user_ratings_total} reviews</span>
                                        </div>


                                        {/* Add to GenerateItinerary Button */}
                                        <button
                                            onClick={() => toggleAdded(activity.place_id)}
                                            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${addedItems.includes(activity.place_id)
                                                ? 'bg-blue-500 text-blue-50 hover:bg-blue-600'
                                                : 'bg-white text-blue-500 hover:bg-blue-50 border-1 border-blue-500'
                                                }`}
                                        >

                                            {addedItems.includes(activity.place_id) ? <FaCheck className='w-4 h-4' /> : <FaPlus className="w-4 h-4 " />}
                                            {addedItems.includes(activity.place_id) ? 'Added to itinerary' : 'Add to itinerary'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {activities.length > INITIAL_VISIBLE && (
                        <div className="flex items-center justify-center gap-3 pb-6">
                            {visibleCount < activities.length && (
                                <button
                                    onClick={() =>
                                        setVisibleCount((c) => Math.min(c + LOAD_MORE_STEP, activities.length))
                                    }
                                    className="px-5 py-3 rounded-xl border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 transition cursor-pointer"
                                >
                                    View more ({activities.length - visibleCount} left)
                                </button>
                            )}

                            {visibleCount > INITIAL_VISIBLE && (
                                <button
                                    onClick={() => {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        });
                                        setVisibleCount(INITIAL_VISIBLE);
                                    }}
                                    className="px-5 py-3 rounded-xl  border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer"
                                >
                                    Show less
                                </button>
                            )}
                        </div>
                    )}
                    {/* Generate Trip Plan Button */}
                    <div className="flex justify-center pb-10">
                        <button
                            onClick={handleGenerate}
                            className="relative max-w-lg w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl"
                        >
                            Generate My Trip Plan

                            {/* Badge (top-right corner) */}
                            {addedItems.length > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 h-6 min-w-6 px-1.5 rounded-full bg-white text-blue-600 text-xs font-bold flex items-center justify-center shadow ring-1 ring-blue-200"
                                    aria-label={`Selected ${addedItems.length} items`}
                                >
                                    {addedItems.length > 9 ? "9+" : addedItems.length} Selected
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GenerateItinerary
