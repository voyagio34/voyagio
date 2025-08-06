import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const categories = ['All', 'Destination', 'Tips', 'Itineraies', 'Deals', 'AI Travel'];
const data = [
    {
        img: '/th1.webp',
        title: 'Exploring the Arnalfi Coast: A Complete Guide',
        desc: "Discover the best places to visit, eat, and stay along italy's stunning Amalfi Coast...."
    },
    {
        img: '/th1.webp',
        title: 'Exploring the Arnalfi Coast: A Complete Guide',
        desc: "Discover the best places to visit, eat, and stay along italy's stunning Amalfi Coast...."
    },
    {
        img: '/th1.webp',
        title: 'Exploring the Arnalfi Coast: A Complete Guide',
        desc: "Discover the best places to visit, eat, and stay along italy's stunning Amalfi Coast...."
    },
    {
        img: '/th1.webp',
        title: 'Exploring the Arnalfi Coast: A Complete Guide',
        desc: "Discover the best places to visit, eat, and stay along italy's stunning Amalfi Coast...."
    },
    {
        img: '/th1.webp',
        title: 'Exploring the Arnalfi Coast: A Complete Guide',
        desc: "Discover the best places to visit, eat, and stay along italy's stunning Amalfi Coast...."
    },
    {
        img: '/th1.webp',
        title: 'Exploring the Arnalfi Coast: A Complete Guide',
        desc: "Discover the best places to visit, eat, and stay along italy's stunning Amalfi Coast...."
    },
    {
        img: '/th1.webp',
        title: 'Exploring the Arnalfi Coast: A Complete Guide',
        desc: "Discover the best places to visit, eat, and stay along italy's stunning Amalfi Coast...."
    },
]
const TravelHub = () => {

    const [currentCategory, setCurrentCategory] = useState('All')
    return (
        <div className='bg-gray-50'>
            <section className="relative overflow-x-hidden bg-cover bg-center bg-blue-200/30 px-4 py-20 sm:px-6 lg:px-8 w-full">
                <div className="absolute top-20 -left-20 w-46 h-46 bg-gray-200 rounded-full z-0" />
                <div className="absolute sm:block hidden top-2 right-4 w-50 h-50 bg-gray-200 rounded-full z-0" />
                <div className="absolute sm:bottom-20 bottom-10 sm:right-20 -right-5 w-26 h-26 bg-blue-500/60 rounded-full z-0" />
                <div className="absolute sm:block hidden bottom-10 left-10 w-20 h-20 bg-blue-200 rounded-full z-0" />

                <div className='flex md:items-center items-start max-w-7xl  sm:mx-auto px-4 sm:px-6 lg:px-8  md:flex-row flex-col gap-8'>
                    <div className='flex flex-1/2 flex-col z-10'>
                        <h1 className='font-bold flex sm:text-5xl text-4xl'>
                            Travel
                            <span className='ml-4 text-blue-500'>Hub</span>
                        </h1>
                        <span className='ml-1 font-normal text-lg text-gray-700 mt-2'>
                            Get the latest travel tips, itineraries, guides and insights.
                        </span>
                        <div className='flex mt-4 items-center bg-white rounded-md px-4'>
                            <FaSearch className='w-5 h-5 text-gray-400 ' />
                            <input type="text"
                                placeholder='Search articles...'
                                className='bg-transparent p-4 w-full focus:outline-none'
                            />
                        </div>
                        <div className='flex flex-row flex-wrap gap-2 mt-4'>
                            {categories.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => setCurrentCategory(item)} className={`rounded-md transition-all cursor-pointer font-semibold p-4 ${currentCategory == item ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} `}>
                                        <span>{item}</span>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div className='w-full flex-1/2 flex z-10 justify-end'>
                        <img src="/FeaturesBg.webp" alt="Features" />
                    </div>
                </div>
            </section>

            <section className="relative py-20 ">
                <div className='flex justify-center max-w-7xl  sm:mx-auto px-4 sm:px-6 lg:px-8 flex-row flex-wrap gap-8'>
                    {
                        data.map((data, index) => {
                            return (
                                <div key={index} className=" cursor-pointer flex flex-col items-start justify-start rounded-md bg max-w-md white shadow-md transition-all hover:shadow-lg">
                                    <img src={data.img} alt={data.title} />
                                    <div className='flex flex-col px-4 py-4 gap-2'>

                                        <h2 className="text-lg font-bold text-gray-800 ">
                                            {data.title}
                                        </h2>
                                        <p className="text-sm text-gray-600">{data.desc}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <section className="relative bg-gray-200 py-10 ">
                <div className='max-w-7xl px-4  mx-auto sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between gap-8'>
                    <div className='flex flex-col'>
                        <span className="text-lg  text-blue-500 font-bold">
                            🌍 Download the Voyagio AI™ App
                        </span>
                        <span className="text-md max-w-lg mt-2 px-1 text-gray-700 font-medium">
                            Plan, personalize, and book your entire trip in seconds with the power of AI — all from one smart, seamless app.
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-4">
                            <img src="/appstore.webp" alt="appstore" className='h-10' />
                            <img src="/qrcode.webp" alt="qrcode" className='h-10' />
                        </div>
                        <div className="flex gap-4">
                            <img src="/playstore.webp" alt="appstore" className='h-10' />
                            <img src="/qrcode.webp" alt="qrcode" className='h-10' />
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default TravelHub
