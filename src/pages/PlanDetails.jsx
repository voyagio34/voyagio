import React, { useState } from 'react'
import { FaArrowLeftLong, FaRepeat, FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { FaHiking, FaUtensils, FaCamera, FaUmbrellaBeach, FaCalendarAlt, FaClock, FaListUl, FaCalendar, FaCoffee } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function PlanDetails() {
    const [expandedDays, setExpandedDays] = useState({});
    const router = useNavigate();

    const toggleDay = (dayId) => {
        setExpandedDays(prev => ({
            ...prev,
            [dayId]: !prev[dayId]
        }));
    };

    const itineraryDays = [
        {
            id: 1,
            title: "Day 1 - Adventure day",
            date: "Monday, June 30",
            activities: [
                {
                    time: "7:00 AM",
                    title: "Hike at the Marsh Loop",
                    duration: "Duration: 3hrs",
                    icon: <FaHiking className="w-5 h-5" />,
                    color: "bg-orange-100 text-orange-600"
                },
                {
                    time: "12:30 PM",
                    title: "Lunch at The Bison Banff",
                    type: "Traditional Tapas • Local cuisine",
                    icon: <FaUtensils className="w-5 h-5" />,
                    color: "bg-yellow-100 text-yellow-600"
                },
                {
                    time: "03:00 PM",
                    title: "Wild Flour Bakery",
                    type: "Best Cafe in the town",
                    icon: <FaCoffee className="w-5 h-5" />,
                    color: "bg-blue-100 text-blue-600"
                },
                {
                    time: "05:00 PM",
                    title: "Shuttle to Moraine Lake",
                    type: "Panoramic city view • Best at golden hour",
                    icon: <FaCamera className="w-5 h-5" />,
                    color: "bg-green-100 text-green-600"
                }
            ]
        },
        {
            id: 2,
            title: "Day 2 - Culture day",
            date: "Tuesday, July 1",
            activities: [
                {
                    time: "10:00 AM",
                    title: "Visit Sagrada Familia",
                    duration: "Duration: 3hrs",
                    icon: <FaCamera className="w-5 h-5" />,
                    color: "bg-purple-100 text-purple-600"
                },
                {
                    time: "01:30 PM",
                    title: "Lunch at Disfrutar",
                    type: "Michelin Star • Modern Mediterranean",
                    icon: <FaUtensils className="w-5 h-5" />,
                    color: "bg-yellow-100 text-yellow-600"
                },
                {
                    time: "05:00 PM",
                    title: "Photoshoot at lake",
                    type: "Best photoshoot spot",
                    icon: <FaCamera className="w-5 h-5" />,
                    color: "bg-green-100 text-green-600"
                }
            ]
        },
        {
            id: 3,
            title: "Day 3 - Relaxed day",
            date: "Tuesday, July 2",
            activities: [
                {
                    time: "5:00 AM",
                    title: "Beach day at Barceloneta",
                    duration: "Duration: 3hrs",
                    icon: <FaUmbrellaBeach className="w-5 h-5" />,
                    color: "bg-blue-100 text-blue-600"
                },
                {
                    time: "09:00 PM",
                    title: "Dinner at Beach",
                    type: "Best experience for candle light dinner",
                    icon: <FaUtensils className="w-5 h-5" />,
                    color: "bg-yellow-100 text-yellow-600"
                }
            ]
        }
    ];

    return (
        <div className='bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 min-h-screen mt-10' >
            <section
                className="relative max-w-7xl mx-auto sm:py-10 sm:px-4 bg-white shadow-lg w-full rounded-lg"
                data-aos="fade-in"
            >
                {/* Header */}
                <div
                    className="flex md:flex-row flex-col md:justify-between gap-4 items-start  p-4 mb-8"
                    data-aos="fade-in"
                    data-aos-delay="100"
                >
                    <FaArrowLeftLong className='w-6 h-6 flex-1/10 text-gray-700 my-2 cursor-pointer duration-200 transition-all hover:-translate-x-1' onClick={()=>router(-1)}/>

                    <div className='flex flex-8/10 flex-col gap-2 md:items-center'>
                        <h1 className='sm:text-4xl text-3xl text-gray-800 font-semibold'>Trip Plan for Banff, Canada</h1>
                        <span className='text-md text-gray-500 font-medium'>3 days • June 30 - July 2</span>
                    </div>
                    <button
                        className="bg-blue-500 min-w-46 min-h-12 hover:bg-blue-600 transition-all cursor-pointer flex flex-1/10 items-center gap-4 justify-center text-white px-6 rounded-md"
                    >
                        <FaRepeat />
                        Regenerate
                    </button>
                </div>

                {/* Itinerary Days */}
                <div className='flex flex-col gap-6 px-4'>
                    {itineraryDays.map((day, index) => (
                        <div
                            key={day.id}
                            className='border border-gray-200 rounded-xl overflow-hidden'
                            data-aos="fade-in"
                            data-aos-delay={200 + (index * 100)}
                        >
                            {/* Day Header */}
                            <div
                                className='bg-gray-50 p-6 cursor-pointer transition-all hover:bg-blue-50'
                                onClick={() => toggleDay(day.id)}
                            >
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        <div className='bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center'>
                                            <FaCalendarAlt className='w-5 h-5' />
                                        </div>
                                        <div>
                                            <h3 className='text-xl font-semibold text-gray-800'>{day.title}</h3>
                                            <p className='text-sm text-gray-600'>{day.date}</p>
                                        </div>
                                    </div>
                                    <FaChevronUp className={ `w-5 h-5 text-gray-500 transition-all duration-300 ${expandedDays[day.id] ? ('rotate-0'):('rotate-180')}`}/>
                                  
                                </div>
                            </div>

                            {/* Day Activities */}
                            {expandedDays[day.id] && (
                                <div className='p-6 transition-all bg-white'>
                                    <div className='space-y-4'>
                                        {day.activities.map((activity, activityIndex) => (
                                            <div
                                                key={activityIndex}
                                                className='flex gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all'
                                                data-aos="fade-in"
                                                data-aos-delay={50 * activityIndex}
                                                data-aos-duration="600"
                                            >
                                                <div className={`w-12 h-12 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
                                                    {activity.icon}
                                                </div>
                                                <div className='flex-1'>
                                                    <div className='flex items-start justify-between'>
                                                        <div>
                                                            <h4 className='font-semibold text-gray-800 mb-1'>{activity.title}</h4>
                                                            <p className='text-sm text-gray-600'>
                                                                {activity.duration || activity.type}
                                                            </p>
                                                        </div>
                                                        <span className='text-sm text-gray-500 font-medium'>{activity.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* View Day Button */}
                            <button
                                className='w-full bg-blue-500 rounded-lg cursor-pointer text-white py-4 hover:bg-blue-600 transition-all font-semibold'
                                onClick={() => router("/day")}
                            >
                                View Day
                            </button>
                        </div>
                    ))}
                </div>

                <div className='flex md:flex-row flex-col gap-4 border-1 justify-between rounded-2xl border-gray-300 mx-4 lg:px-10 md:px-8 sm:px-6 px-4 py-4 my-10' data-aos="fade-in" data-aos-delay={itineraryDays.length < 4 ? (itineraryDays.length * 100 + 100) : 200}>
                    <div className="flex gap-4 items-center">
                        <FaListUl className='w-8 h-8 text-blue-500' />
                        <div className="flex flex-col ">
                            <span className='text-md text-gray-700 '> {itineraryDays.length + ' days and 8 activities'}</span>
                            <span className='text-md text-gray-600'>Selected</span>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 min-w-46 min-h-12 hover:bg-blue-600 transition-all cursor-pointer flex items-center gap-4 justify-center text-white px-6 rounded-md"
                    >
                        Confirm Itinerary
                    </button>
                </div>
            </section>
        </div>
    )
}

export default PlanDetails