import React from 'react'
import { destinations } from '../data/Destination'
import { FaClock, FaMapMarker, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6';

function GeneratedPlans() {

    const router = useNavigate();
    return (
        <div className='bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 min-h- mt-10'>

            <section
                className="relative max-w-7xl mx-auto sm:py-10 py-4 px-4 bg-white shadow-lg w-full rounded-lg"
                data-aos="fade-down"
                data-aos-duration="1000"
            >
                <div
                    className="flex sm:flex-row flex-col sm:gap-2 gap-4 p-4 mb-8"
                 
                >
                    <FaArrowLeftLong className='w-6 h-6 sm:flex-1/10 flex justify-center  text-gray-700 my-2 cursor-pointer duration-200 transition-all hover:-translate-x-1' onClick={() => router("/itinerary ")} />
                    <div className='flex flex-col flex-8/10'>
                        <h1
                            className='text-center sm:text-5xl text-4xl mb-4 font-semibold text-gray-800'

                        >
                            Generated Plans
                        </h1>
                        <p
                            className='text-center sm:text-lg text- w-full mx-auto text-gray-700'
                           
                        >
                            Let's personalize your experience. <br className='hidden sm:block'/> Your answers will help us design the perfect trip.
                        </p>
                    </div>
                    <div className='flex-1/10 '></div>
                </div>

                <div className='flex flex-col gap-6 '>
                    {destinations.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex flex-col mx-auto md:flex-row items-start md:items-center justify-between gap-4 py-4 sm:px-4 rounded-xl"
                           
                        >
                            {/* Left Section */}
                            <div className="flex flex-col md:flex-row w-full h-full gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full md:w-40 h-40 object-cover rounded-lg"

                                />
                                <div className='flex lg:flex-row flex-col md:gap-4 md:items-end lg:items-center justify-center'>
                                    <div className="flex flex-col  justify-around lg:min-w-lg min-h-40 w-full">
                                        {/* Title & Description */}
                                        <div>
                                            <h3
                                                className="text-3xl text-gray-700 font-semibold"
                                            >
                                                {item.title}
                                            </h3>
                                            <p
                                                className="text-gray-500 text-md max-w-lg"

                                            >
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Bottom Section: Location + Tags */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 gap-2">
                                            <div
                                                className="flex lg:flex-row flex-col lg:items-center lg:gap-4 gap-2 text-sm text-gray-500"

                                            >
                                                <span className="flex items-center gap-1">
                                                    <FaMapMarkerAlt /> {item.country}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaRegClock /> {item.flightDuration}
                                                </span>
                                            </div>

                                            <div
                                                className="flex flex-wrap gap-2 text-xs lg:pr-10"

                                            >
                                                {item.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className={`px-2 py-1 rounded-full text-white ${tag === "Mountain Views"
                                                            ? "bg-orange-400"
                                                            : tag === "Hiking Trails"
                                                                ? "bg-green-400"
                                                                : "bg-yellow-400"
                                                            }`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-full max-h-10 sm:w-64 mt-4 md:mt-0 flex"
                                    >
                                        <button className="bg-blue-100 w-full text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-blue-200 transition-all cursor-pointer" onClick={() => {
                                            router('/plan')
                                        }} >
                                            View itinerary
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default GeneratedPlans