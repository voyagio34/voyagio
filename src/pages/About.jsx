import React, { useState, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { agents } from '../data/Agents'
import { stats } from '../data/Stats'
import { FaFacebookF, FaInstagram, FaStar, FaTwitter, FaWhatsapp } from 'react-icons/fa'

const About = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef] = useKeenSlider({
        loop: true,
        slides: {
            perView: 1,
            spacing: 15,
        },
        breakpoints: {
            '(min-width: 640px)': {
                slides: { perView: 2, spacing: 15 },
            },
            '(min-width: 1024px)': {
                slides: { perView: 3, spacing: 15 },
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        renderMode: 'performance',
        drag: true,
        autoplay: true,
    });

    // autoplay workaround
    const timer = useRef();
    const [paused, setPaused] = useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!paused && sliderRef.current) {
                sliderRef.current.next();
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [paused]);

    return (
        <div className='bg-gray-50 overflow-x-hidden'>
            <section className="relative bg-cover bg-center bg-blue-200/30 px-2 py-20 sm:px-6 lg:px-8 w-full" data-aos="fade-in">
                <div
                    className="absolute sm:block hidden top-20 -left-20 w-46 h-46 bg-gray-200 rounded-full z-0"
                    data-aos="fade-right"
                    data-aos-duration="1500"
                />
                <div
                    className="absolute top-2 -right-10 w-50 h-50 bg-gray-200 rounded-full z-0"
                    data-aos="fade-left"
                    data-aos-duration="1500"
                />
                <div
                    className="absolute sm:bottom-5 bottom-10 sm:block hidden sm:right-20 -right-5 w-26 h-26 bg-blue-500/60 rounded-full z-0"
                    data-aos="fade-left"
                    data-aos-delay="500"
                />
                <div
                    className="absolute bottom-10 left-20 w-20 h-20 bg-blue-200 rounded-full z-0"
                    data-aos="fade-right"
                    data-aos-delay="300"
                />

                <div className='flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-col gap-6'>
                    <div className='flex flex-col gap-2 w-full items-center z-10'>
                        <h1
                            className='font-bold max-w-lg text-center sm:text-5xl text-4xl'
                            data-aos="zoom-in"
                            data-aos-duration="800"
                        >
                            Empowering Smarter
                        </h1>
                        <h1
                            className='font-bold max-w-lg text-center sm:text-5xl text-4xl'
                            data-aos="zoom-in"
                            data-aos-duration="800"
                        >
                            Travel Solutions
                        </h1>
                    </div>
                    <span
                        className='text-lg text-gray-700 font-normal max-w-lg mx-auto z-10 text-center'
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        Revolutionizing the way you plan and experience travel with innovative Al technology.
                    </span>
                    <button
                        className="px-10 py-3 w-46 mx-auto cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-full z-10 text-gray-50 font-semibold transition-colors duration-300"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        Join Waitlist
                    </button>
                </div>
            </section>

            <section className='relative py-20 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full'>
                <div className="flex gap-10 justify-between flex-col lg:flex-row">
                    <div
                        className="flex flex-3/5 flex-col gap-4 px-10"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <h2
                            className='text-4xl font-bold text-gray-900 mt-10'

                        >
                            Our Mission
                        </h2>
                        <p
                            className='text-lg text-gray-700 font-normal text-justify'

                        >
                            At Voyagio Al, we aim to similify and enhance your travel planning by hamessing the power of artificial intelligence. We strive to provide personalized, seamless, and cost-effective travel experiences.
                        </p>
                        <h2
                            className='text-4xl font-bold text-gray-900 mt-10'

                        >
                            How Voyagio Al Works
                        </h2>
                        <p
                            className='text-lg text-gray-700 font-normal text-justify'

                        >
                            Voyagio Al leverages curting-edge Al algorithms to analyze your preferences and needs, delivering tailored recommendations and real-time insights, Our technology ensures that your travel plans are efficient.
                        </p>
                    </div>

                    <div
                        className='flex-2/5 flex w-full'
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                    >
                        <img src="/about1.webp" alt="about1" className='relative z-10 w-full bottom-5 right-0' />
                    </div>
                </div>
            </section>

            <section className='relative py-20 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full'>
                <div className="flex gap-10 justify-center flex-col-reverse lg:flex-row">
                    <div
                        className='flex-2/5 flex justify-center px-4'
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <img src="/about2.webp" alt="about2" className='sm:max-w-lg w-full' />
                    </div>
                    <div className='flex-3/5 flex flex-col gap-10 sm:px-10 px-4'>
                        <h2
                            className='text-4xl font-bold text-gray-900 sm:mt-10'
                            data-aos="fade-up"
                            data-aos-duration="800"
                        >
                            Milestones
                        </h2>
                        <div className="flex flex-col gap-4">
                            <span
                                className='p-6 bg-orange-300/30 rounded-xl text-md font-bold'
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                Launched Voyagio Al beta to rave reviews
                            </span>
                            <span
                                className='p-6 bg-green-300/30 rounded-xl text-md font-bold'
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                Reached 50 000 registered users in record time
                            </span>
                            <span
                                className='p-6 bg-blue-300/30 rounded-xl text-md font-bold'
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >
                                Formed strategic partnerships with leading travel providers
                            </span>
                            <span
                                className='p-6 bg-pink-300/30 rounded-xl text-md font-bold'
                                data-aos="fade-up"
                                data-aos-delay="400"
                            >
                                Featured in top tech and travel publications
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="relative py-20 max-w-7xl px-2 mx-auto sm:px-6 lg:px-8 w-full"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <div
                    className="flex justify-around bg-black min-h-72 text-white rounded-3xl px-6 py-10 lg:px-20 overflow-hidden"
                    style={{
                        backgroundImage: `url('/about3.webp')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-14 gap-y-6 justify-center text-center overflow-hidden">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-center relative"
                                data-aos="fade-up"
                                data-aos-delay={idx * 100}
                            >
                                <h3
                                    className="text-2xl md:text-3xl lg:text-4xl font-bold"
                                    data-aos="counter"
                                >
                                    {stat.value}
                                </h3>
                                <p className="text-sm md:text-base text-gray-300">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="relative overflow-hidden py-20 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto w-full"
            >
                <div className="flex flex-col items-start">
                    <h2
                        className="text-4xl font-bold text-gray-900 mt-10"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        Our Team
                    </h2>

                    {/* Carousel */}
                    <div
                        ref={sliderRef}
                        className="keen-slider mt-16"
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-duration="1000"
                    >
                        {agents.map((agent, index) => (
                            <div key={index} className="keen-slider__slide p-2">
                                <div className="bg-white shadow-md rounded-xl p-6 flex flex-row items-center text-start gap-4">
                                    <img
                                        src={agent.image}
                                        alt={agent.name}
                                        className="w-32 h-32 rounded-full object-cover bg-gray-200"
                                    />
                                    <div className="flex flex-col items-start justify-start">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                                            <p className="text-blue-500 text-sm font-semibold">{agent.role}</p>
                                            <div className="flex text-sm text-gray-400 font-medium mt-1">
                                                <FaStar className="text-yellow-400 mr-1" />
                                                ({agent.rating} Ratings)
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <SocialIcon icon={<FaFacebookF />} />
                                            <SocialIcon icon={<FaTwitter />} />
                                            <SocialIcon icon={<FaWhatsapp />} />
                                            <SocialIcon icon={<FaInstagram />} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots/Indicators */}
                    <div
                        className="flex mx-auto min-h-8 items-end gap-2 mt-6"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {agents.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => sliderRef.current?.moveToIdx(idx)}
                                className={`w-1 rounded-full transition-all ${currentSlide === idx ? 'h-8 bg-blue-600' : 'bg-blue-300 h-3'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="relative bg-gray-200 py-20 mt-20"
                data-aos="fade-in"
            >
                <div className='max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between gap-8'>
                    <div
                        className='flex flex-col'
                    >
                        <span className="text-lg text-blue-500 font-bold" data-aos="fade-right">
                            🌍 Download the Voyagio AI™ App
                        </span>
                        <span className="text-md max-w-lg mt-2 px-1 text-gray-700 font-medium" data-aos="fade-right" data-aos-delay="200">
                            Plan, personalize, and book your entire trip in seconds with the power of AI — all from one smart, seamless app.
                        </span>
                    </div>
                    <div
                        className="flex flex-col items-center gap-2"
                        data-aos="fade-left" data-aos-delay="200"
                    >
                        <div className="flex gap-4">
                            <img
                                src="/appstore.webp"
                                alt="appstore"
                                className='h-10'
                            />
                            <img
                                src="/qrcode.webp"
                                alt="qrcode"
                                className='h-10'
                            />
                        </div>
                        <div className="flex gap-4">
                            <img
                                src="/playstore.webp"
                                alt="appstore"
                                className='h-10'
                            />
                            <img
                                src="/qrcode.webp"
                                alt="qrcode"
                                className='h-10'
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const SocialIcon = ({ icon }) => (
    <div className="w-9 h-9 flex items-center cursor-pointer justify-center rounded-full bg-white outline-1 shadow-md outline-gray-400 text-gray-400 hover:text-white hover:bg-blue-500 transition">
        {icon}
    </div>
);

export default About