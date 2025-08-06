import React from 'react'
import { AppFeatures } from '../data/AppFeatures'

const Features = () => {
    return (
        <div className='bg-gray-50'>
            <section className="relative overflow-x-hidden bg-cover bg-center bg-blue-200/30 px-4 py-20 sm:px-6 lg:px-8 w-full">
                <div className="absolute top-20 -left-20 w-46 h-46 bg-gray-200 rounded-full z-0" />
                <div className="absolute sm:block hidden top-2 right-4 w-50 h-50 bg-gray-200 rounded-full z-0" />
                <div className="absolute sm:bottom-20 bottom-10 sm:right-20 -right-5 w-26 h-26 bg-blue-500/60 rounded-full z-0" />
                <div className="absolute sm:block hidden bottom-10 left-10 w-20 h-20 bg-blue-200 rounded-full z-0" />

                <div className='flex justify-center items-center max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8  md:flex-row flex-col'>
                    <div className='flex flex-col z-10'>

                        <h1 className='font-bold sm:text-5xl text-4xl'>Features</h1>
                        <span className='ml-1 font-normal text-lg text-gray-700 mt-2'>
                            Home / Features
                        </span>
                    </div>
                    <div className='w-full flex z-10 justify-center'>
                        <img src="/FeaturesBg.webp" alt="Features" />
                    </div>
                </div>

            </section>

            <section className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  w-full flex flex-col '>
                {/* <h1 className='sm:text-5xl text-4xl font-bold'>App Feature</h1> */}
                <div className='flex flex-wrap justify-center sm:space-x-10 space-x-0 mt-10'>
                    {
                        AppFeatures.map((feature, index) => {
                            return (
                                <div key={index} className='flex-col max-w-84 mx-4'>
                                    <img src={feature.img} alt={feature.title} className='-z-10' />
                                    <div className='relative bottom-26 py-2 z-10 bg-gray-50'>
                                        <p className='text-2xl font-bold'>{feature.title}</p>
                                        <span className='text-gray-500 text-sm space-y-0 flex'>{feature.desc}</span>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }

                </div>
            </section>
        </div>
    )
}

export default Features
