import React, { useEffect } from 'react'
import { FaCamera, FaCoffee, FaHiking, FaMapMarkerAlt, FaThermometerHalf, FaUtensils } from 'react-icons/fa';
import { FaArrowLeftLong, FaRegClock, FaRepeat } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';

const activities = [
    {
        id: 1,
        time: "7:00 AM - 9:00 AM",
        title: "Hike at the Marsh Loop",
        duration: "Duration: 3hrs",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=400&fit=crop",
        outfit: "Outfit: Casual",
        weather: "Weather: Cloudy, 18°C",
        type: "outdoor",
        icon: <FaHiking className="w-5 h-5" />,
        color: "border-orange-600 text-orange-600"
    },
    {
        id: 2,
        time: "12:00 PM - 01:30 PM",
        title: "Lunch at The Bison Banff",
        subtitle: "Traditional Tapas • Local cuisine",
        images: [
            "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&h=200&fit=crop",
            "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&h=200&fit=crop",
            "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=300&h=200&fit=crop"
        ],
        outfit: "Outfit: Smart Casual",
        weather: "Weather: Sunny, 26°C",
        type: "dining",
        icon: <FaUtensils className="w-5 h-5" />,
        color: "border-yellow-600 text-yellow-600"
    },
    {
        id: 3,
        time: "03:00 PM - 04:30 PM",
        title: "Wild Flour Bakery",
        subtitle: "Best Cafe in the town",
        images: [
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=200&h=200&fit=crop"
        ],
        outfit: "Outfit: Smart Casual",
        weather: "Weather: Sunny, 22°C",
        type: "cafe",
        icon: <FaCoffee className="w-5 h-5" />,
        color: "border-blue-600 text-blue-600"
    },
    {
        id: 4,
        time: "05:00 PM - 06:30 PM",
        title: "Shuttle to Moraine Lake",
        subtitle: "Panoramic city view • Best at golden hour",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
        outfit: "Outfit: Smart Casual",
        weather: "Weather: Cloudy, 20°C",
        type: "outdoor",
        icon: <FaCamera className="w-5 h-5" />,
        color: "border-green-600 text-green-600"
    }
];
function DayDetails() {
    const router = useNavigate();
  

    return (
        <div className='bg-gray-50 mt-10 px-4 py-16 sm:px-6 lg:px-8 min-h-screen'>
            <section
                className="relative max-w-7xl mx-auto sm:py-10 sm:px-4 bg-white shadow-lg w-full rounded-lg"
                data-aos="fade-in"
            >
                <div
                    className="flex md:flex-row flex-col md:justify-between gap-4 items-start  p-4 mb-8"
                    data-aos="fade-in"
                    data-aos-delay="100"
                >
                    <FaArrowLeftLong className='w-6 h-6 flex-1/10 text-gray-700 my-2 cursor-pointer duration-200 transition-all hover:-translate-x-1' onClick={() => router(-1)} />

                    <div className='flex flex-8/10 flex-col gap-2 md:items-center'>
                        <h1 className='sm:text-4xl text-3xl text-gray-800 font-semibold'>Day 1 - Adventure day</h1>
                        <span className='text-md text-gray-500 font-medium'>Monday , June 30</span>
                    </div>
                    <div className='flex flex-1/10'>

                    </div>
                </div>

                <div className=" mx-auto p-4 space-y-6 min-h-screen">
                    {activities.map((activity, index) => (
                        <div
                            key={activity.id}
                            className="bg-white rounded-2xl mb-10 transition-all duration-300 overflow-hidden"
                            data-aos="fade-in"
                            data-aos-delay={index * 100}
                        >
                            {/* Time Header */}
                            <div className="flex items-center gap-2 px-4 sm:px-6 pt-4 border-gray-100">
                                <FaRegClock className="text-gray-900 w-4 h-4" />
                                <span className="text-sm font-medium text-gray-900">{activity.time}</span>
                            </div>

                            {/* Activity Content */}
                            <div className="p-4 sm:p-6">

                                <div className="mb-4 flex gap-4">
                                    <div className={`w-12 h-12 rounded-full ${activity.color} border-1 flex items-center justify-center flex-shrink-0`}>
                                        {activity.icon}
                                    </div>
                                    <div className='flex flex-col'>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                            {activity.title}
                                        </h3>
                                        {activity.subtitle && (
                                            <p className="text-sm text-gray-600">{activity.subtitle}</p>
                                        )}
                                        {activity.duration && (
                                            <p className="text-sm text-gray-600">{activity.duration}</p>
                                        )}
                                    </div>

                                </div>

                                {/* Single Image Layout */}
                                {activity.image && (
                                    <div className="mb-4 rounded-xl overflow-hidden">
                                        <img
                                            src={activity.image}
                                            alt={activity.title}
                                            className="w-full h-48 sm:h-64 object-cover"
                                        />
                                    </div>
                                )}

                                {/* Multiple Images Layout */}
                                {activity.images && (
                                    <div className={`grid gap-2 mb-4 ${activity.images.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
                                        }`}>
                                        {activity.images.map((img, imgIndex) => (
                                            <div key={imgIndex} className="rounded-lg overflow-hidden">
                                                <img
                                                    src={img}
                                                    alt={`${activity.title} ${imgIndex + 1}`}
                                                    className="w-full h-24 sm:h-32 object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Info Section */}
                                <div className="flex flex-col gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <div className='p-2 rounded-lg bg-gray-100 text-gray-900'>
                                            <FaMapMarkerAlt className="w-5 h-5" />
                                        </div>
                                        <span>{activity.outfit}</span>
                                    </div>
                                    <hr className='text-gray-200' />
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <div className='p-2 rounded-lg bg-gray-100 text-gray-900'>

                                            <FaThermometerHalf className="w-5 h-5" />
                                        </div>

                                        <span>{activity.weather}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex sm:flex-row flex-col border-gray-100 px-4 sm:px-6 gap-2">
                                <button onClick={() => {
                                    router('/edit')
                                }} className="flex-1 py-3 sm:py-4 text-center text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-semibold text-sm rounded-lg sm:text-base border-1 border-blue-500 cursor-pointer">
                                    Edit
                                </button>
                                <button className="flex-1 py-3 sm:py-4 text-center bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 font-semibold text-sm rounded-lg sm:text-base cursor-pointer">
                                    Skip
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}

export default DayDetails
