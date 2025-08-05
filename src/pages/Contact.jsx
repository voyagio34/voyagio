import React from 'react'
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

const Contact = () => {
    return (
        <div className='bg-gray-50'>
            <section className="relative overflow-x-hidden bg-cover bg-center bg-blue-200/30 px-4 py-20 sm:px-6 lg:px-8 w-full">
                <div className="absolute top-20 -left-20 w-46 h-46 bg-gray-200 rounded-full z-0" />
                <div className="absolute sm:block hidden top-2 right-4 w-50 h-50 bg-gray-200 rounded-full z-0" />
                <div className="absolute sm:bottom-20 bottom-10 sm:right-20 -right-5 w-26 h-26 bg-blue-500/60 rounded-full z-0" />
                <div className="absolute sm:block hidden bottom-10 left-10 w-20 h-20 bg-blue-200 rounded-full z-0" />

                <div className='flex md:items-center items-start max-w-7xl  sm:mx-auto px-4 sm:px-6 lg:px-8  md:flex-row flex-col gap-8'>
                    <div className='flex flex-col z-10'>

                        <h1 className='font-bold flex sm:text-5xl text-4xl'>
                            Contact
                            <span className='ml-4 text-blue-500'>Us</span>
                        </h1>
                        <span className='ml-1 font-normal text-lg text-gray-700 mt-2'>
                            Home / Contact Us
                        </span>
                    </div>
                    <div className='w-full flex z-10 justify-end'>
                        <img src="/FeaturesBg.png" alt="Features" />
                    </div>
                </div>
            </section>

            <section className='relative py-20'>

                <div className="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto flex flex-col lg:flex-row gap-8">

                    {/* Left: Contact Info */}
                    <div className="bg-white shadow-md py-10 p-6 rounded-xl w-full lg:w-1/3 space-y-8">
                        {/* Call */}
                        <div className="flex flex-col gap-4 items-start">
                            <div className="flex items-center gap-4">

                                <div className="bg-blue-500 text-white p-3 rounded-full text-lg">
                                    <FaPhoneAlt />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Call To Us</h3>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className="text-md text-gray-600 ">We are available 24/7, 7 days a week.</p>
                                <p className="text-md text-gray-600  font-medium">Phone: +8801611112222</p>
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        {/* Email */}
                        <div className="flex flex-col gap-4 items-start">
                            <div className="flex items-center gap-4">

                                <div className="bg-blue-500 text-white p-3 rounded-full text-lg">
                                    <FaEnvelope />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Write To US</h3>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className="text-md text-gray-600 ">
                                    Fill out our form and we will contact you within 24 hours.
                                </p>
                                <p className="text-md text-gray-600">Email: customer@exclusive.com</p>
                                <p className="text-md text-gray-600">Email: support@exclusive.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="bg-white py-10 shadow-md p-6 rounded-xl w-full lg:w-2/3">
                        <form className="space-y-6">
                            {/* Top 3 Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your Name *"
                                    className="w-full px-4 py-3 rounded bg-gray-100 text-sm focus:outline-blue-400"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email *"
                                    className="w-full px-4 py-3 rounded bg-gray-100 text-sm focus:outline-blue-400"
                                />
                                <input
                                    type="tel"
                                    placeholder="Your Phone *"
                                    className="w-full px-4 py-3 rounded bg-gray-100 text-sm focus:outline-blue-400"
                                />
                            </div>

                            {/* Message */}
                            <textarea
                                placeholder="Your Message"
                                rows="6"
                                className="w-full px-4 py-3 rounded bg-gray-100 text-sm resize-none focus:outline-blue-400"
                            ></textarea>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
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
                            <img src="/appstore.png" alt="appstore" className='h-10' />
                            <img src="/qrcode.png" alt="qrcode" className='h-10' />
                        </div>
                        <div className="flex gap-4">
                            <img src="/playstore.png" alt="appstore" className='h-10' />
                            <img src="/qrcode.png" alt="qrcode" className='h-10' />
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Contact
