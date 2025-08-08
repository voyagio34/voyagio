import { Link } from 'lucide-react'
import React from 'react'
import { InfoCards } from '../data/InfoCards'

function YourSmart() {
    return (
        <div className='bg-gray-50 overflow-x-hidden mt-10'>
            <section className="relative bg-cover bg-center bg-blue-200/30 px-2 py-20 sm:px-6 lg:px-8 w-full" data-aos="fade-in">
                <div
                    className="absolute sm:block hidden top-20 -left-20 w-46 h-46 bg-gray-200 rounded-full z-0"
                  
                />
                <div
                    className="absolute top-2 -right-10 w-50 h-50 bg-gray-200 rounded-full z-0"
               
                />
                <div
                    className="absolute sm:bottom-5 bottom-10 sm:block hidden sm:right-20 -right-5 w-26 h-26 bg-blue-500/60 rounded-full z-0"
               
                />
                <div
                    className="absolute bottom-10 left-20 w-20 h-20 bg-blue-200 rounded-full z-0"
                  
                />

                <div className='flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-col py-10 gap-6'>
                    <div className='flex flex-col gap-2 w-full items-center z-10'>
                        <h1
                            className='font-bold max-w-lg text-center sm:text-5xl text-4xl'
                            
                        >
                            Your Smart Travel Planning Hub
                        </h1>

                    </div>
                    <span
                        className='text-lg text-gray-700 font-normal max-w-lg mx-auto z-10 text-center'
                     
                    >
                        Plan with precision, adjust with ease, and sync it all in real time-powered by our Living Itinerary Engine™.
                    </span>

                </div>
            </section>

            <section className='relative py-20 '>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-4'>
                    <div className='flex flex-wrap justify-center gap-4 mb-10'>
                        {
                            InfoCards.map((info, index) => {
                                return <div key={index} className='py-8 px-4 items-center gap-2 border-1 max-w-72 w-full shadow-sm bg-gray-50 border-gray-300 rounded-2xl flex flex-col ' data-aos="fade-in" data-aos-delay={ index * 100}>
                                    <img src={info.icon} alt={info.title} className='w-16' />
                                    <p className='mt-4 font-bold text-lg text-gray-800'>{info.title}</p>
                                    <p className='text-gray-500 text-sm'>{info.description}</p>
                                </div>
                            })
                        }
                    </div>



                    <p className='text-lg text-justify font-normal text-gray-500 mb-4' data-aos="fade-in" data-aos-delay="50">Build your perfect trip in just a few steps with Voyagio's intelligent Travel Hub. Whether you're mapping out a weekend getaway or a multi-city journey, our Al- powered system personalizes every detail-so you can stop planning and start experiencing.</p>
                    <p className='text-lg text-justify font-normal text-gray-500 mb-4' data-aos="fade-in" data-aos-delay="50">Everything updates in real time, including weather-based suggestions, schedule changes, and local recommendations. Sync with your mobile app and take your trip wherever you go.</p>

                </div>
            </section>
        </div>
    )
}

export default YourSmart
