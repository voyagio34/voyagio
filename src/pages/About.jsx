import React from 'react'

const stats = [
  { label: "Happy Clients", value: "168k" },
  { label: "Destinations", value: "+45k" },
  { label: "Global Branch", value: "+49" },
  { label: "Campaigns", value: "+26k" },
];
const About = () => {
    return (
        <div className='bg-gray-50 overflow-x-hidden'>
            <section className="relative bg-cover bg-center bg-blue-200/30 px-2 py-20 sm:px-6 lg:px-8 w-full">
                <div className="absolute sm:block hidden top-20 -left-20 w-46 h-46 bg-gray-200 rounded-full z-0" />
                <div className="absolute top-2 -right-10 w-50 h-50 bg-gray-200 rounded-full z-0" />
                <div className="absolute sm:bottom-5 bottom-10 sm:block hidden sm:right-20 -right-5 w-26 h-26 bg-blue-500/60 rounded-full z-0" />
                <div className="absolute  bottom-10 left-20 w-20 h-20 bg-blue-200 rounded-full z-0" />

                <div className='flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-col gap-6'>
                    <div className='flex flex-col gap-2 w-full items-center z-10'>
                        <h1 className='font-bold max-w-lg text-center sm:text-5xl text-4xl'>Empowering Smarter </h1>
                        <h1 className='font-bold max-w-lg text-center sm:text-5xl text-4xl'>Travel Solutions </h1>
                    </div>
                    <span className='text-lg text-gray-700 font-normal max-w-lg mx-auto z-10 text-center'>
                        Revolutionizing the way you plan and experience travel with innovative Al technology.
                    </span>
                    <button className="px-10 py-3 w-46 mx-auto cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-full z-10 text-gray-50  font-semibold transition-colors duration-300">
                        Join Waitlist
                    </button>
                </div>

            </section>

            <section className='relative py-20 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full' >
                <div className="flex gap-10 justify-between flex-col lg:flex-row ">
                    <div className="flex flex-3/5 flex-col gap-4 px-10 ">
                        <h2 className='text-4xl font-bold text-gray-900 mt-10'>Our Mission</h2>
                        <p className='text-lg text-gray-700 font-normal text-justify'>
                            At Voyagio Al, we aim to similify and enhance your travel planning by hamessing the power of artificial intelligence. We strive to provide personalized, seamless, and cost-effective travel experiences.
                        </p>
                        <h2 className='text-4xl font-bold text-gray-900 mt-10'>How Voyagio Al Works</h2>
                        <p className='text-lg text-gray-700 font-normal text-justify'>
                            Voyagio Al leverages curting-edge Al algorithms to analyze your preferences and  needs, delivering tailored recommendations and real-time insights, Our technology ensures that your travel plans are efficient.
                        </p>
                    </div>

                    <div className='flex-2/5 justify-end w-full'>
                        <img src="/about1.png" alt="about1" className='relative z-10 w-full bottom-5 right-0' />
                    </div>
                </div>
            </section>

            <section className='relative py-20 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full' >
                <div className="flex gap-10 justify-center flex-col-reverse  lg:flex-row ">
                    <div className='flex-2/5 flex justify-center px-4'>
                        <img src="/about2.png" alt="about2" className='sm:max-w-lg w-full' />
                    </div>
                    <div className='flex-3/5 flex flex-col gap-10 sm:px-10 px-4'>
                        <h2 className='text-4xl font-bold text-gray-900 mt-10'>Milestones</h2>
                        <div className="flex flex-col gap-4">
                            <span className='p-6 bg-orange-300/30 rounded-xl text-md font-bold'>Launched Voyagio Al beta to rave reviews</span>
                            <span className='p-6 bg-green-300/30 rounded-xl text-md font-bold'>Reached 50 000 registered users in record time</span>
                            <span className='p-6 bg-blue-300/30 rounded-xl text-md font-bold'>Formed strategic partnerships with leading travel providers</span>
                            <span className='p-6 bg-pink-300/30 rounded-xl text-md font-bold'>Featured in top tech and travel publications</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-20 max-w-7xl px-2  mx-auto sm:px-6 lg:px-8 w-full">

                <div
                    className="flex justify-around bg-black min-h-72 text-white rounded-3xl px-6 py-10 lg:px-20 overflow-hidden"
                    style={{
                        backgroundImage: `url('/about3.png')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-6 justify-center text-center">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col  items-center justify-center relative">
                                <h3 className="text-2xl lg:text-3xl font-bold">{stat.value}</h3>
                                <p className="text-sm md:text-base text-gray-300">{stat.label}</p>

                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
