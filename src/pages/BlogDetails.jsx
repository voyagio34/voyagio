import React from 'react'
import { FaArrowRight, FaCalendarAlt, FaCity, FaNewspaper, FaPlaneDeparture, FaRegClock, FaUmbrellaBeach } from 'react-icons/fa';
import { FaBowlFood, FaCow, FaRegMessage } from 'react-icons/fa6';

const categories = [
    { icon: <FaCity />, name: 'City Tour' },
    { icon: <FaUmbrellaBeach/>, name: 'Beach Tour' },
    { icon: <FaCow /> , name: 'Wildlife Tour' },
    { icon: <FaNewspaper />, name: 'News & Tips' },
    { icon: <FaPlaneDeparture />, name: 'Adventure Tours' },
    { icon: <FaBowlFood />, name: 'Food Tours' },
];

const recentPosts = [
    {
        id: 1,
        title: 'Top 10 Travel Hacks for Budget-Conscious Adventurers',
        date: '19 Sep 2024',
        image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=100&h=100&fit=crop'
    },
    {
        id: 2,
        title: 'Top 10 Travel Hacks for Budget-Conscious Adventurers',
        date: '19 Sep 2024',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=100&h=100&fit=crop'
    },
    {
        id: 3,
        title: 'Top 10 Travel Hacks for Budget-Conscious Adventurers',
        date: '19 Sep 2024',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=100&h=100&fit=crop'
    },
    {
        id: 4,
        title: 'Top 10 Travel Hacks for Budget-Conscious Adventurers',
        date: '19 Sep 2024',
        image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=100&h=100&fit=crop'
    }
];

const blogPosts = [
    {
        id: 1,
        title: 'Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey',
        date: '18 Sep 2024',
        readTime: '6 mins',
        comments: 16,
        author: 'Jimmy Dave',
        image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        title: 'Top 10 Travel Hacks for Budget-Conscious Adventurers',
        date: '18 Sep 2024',
        readTime: '6 mins',
        comments: 26,
        author: 'Jimmy Dave',
        image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        title: 'Discovering Hidden Gems: 10 Off-the-Beaten-Path Travel Tips',
        date: '18 Sep 2024',
        readTime: '6 mins',
        comments: 28,
        author: 'Jimmy Dave',
        image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop'
    }
];


function BlogDetails() {
    return (
        <div className='bg-gray-50'>
            <section className="relative overflow-x-hidden bg-cover bg-center bg-blue-200/30 px-4 py-20 sm:px-6 lg:px-8 w-full" data-aos="fade-in">
                <div
                    className="absolute top-20 -left-20 w-46 h-46 bg-gray-200 rounded-full z-0"
                    data-aos="fade-right"
                    data-aos-duration="1500"
                />
                <div
                    className="absolute sm:block hidden top-2 right-4 w-50 h-50 bg-gray-200 rounded-full z-0"
                    data-aos="fade-left"
                    data-aos-duration="1500"
                />
                <div
                    className="absolute sm:bottom-20 bottom-10 sm:right-20 -right-5 w-26 h-26 bg-blue-500/60 rounded-full z-0"
                    data-aos="fade-left"
                    data-aos-delay="500"
                />
                <div
                    className="absolute sm:block hidden bottom-10 left-10 w-20 h-20 bg-blue-200 rounded-full z-0"
                    data-aos="fade-right"
                    data-aos-delay="300"
                />

                <div className='flex md:items-center py-20 items-start max-w-7xl sm:mx-auto px-4 sm:px-6 lg:px-8 md:flex-row flex-col gap-8'>
                    <div
                        className='flex flex-1/2 flex-col z-10'
                        data-aos="fade-right"
                        data-aos-duration="800"
                    >
                        <h1 className='font-bold flex sm:text-5xl text-4xl'>
                            Blog
                            <span className='ml-4 text-blue-500'>Details</span>
                        </h1>
                        <span className='ml-1 font-normal text-lg text-gray-700 mt-2'>
                            Home / Blog
                        </span>
                    </div>
                    <div
                        className='w-full flex-1/2 flex z-10 justify-end'
                        data-aos="fade-left"

                    >
                        <img src="/FeaturesBg.webp" alt="Features" />
                    </div>
                </div>
            </section>

            <section className="min-h-screen ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Main Article */}
                    <article
                        className="rounded-2xl overflow-hidden mb-10"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        <img
                            src="/blog3.webp"
                            alt="Travel Journey"
                            className="w-full h-full rounded-2xl sm:h-96 object-cover"
                            data-aos="fade-up"

                        />

                        <div
                            className="flex flex-wrap gap-4 sm:gap-6 pt-6 text-md text-gray-600"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <span className="flex items-center gap-2">
                                <FaCalendarAlt className="w-4 h-4" />
                                10 Aug 2025
                            </span>
                            <span className="flex items-center gap-2">
                                <FaRegClock className="w-4 h-4" />
                                6 mins
                            </span>
                            <span className="flex items-center gap-2">
                                <FaRegMessage className="w-4 h-4" />
                                16 comments
                            </span>
                        </div>

                        <div className=" py-6"
                            data-aos="fade-up"
                            data-aos-delay="200">
                            <h1
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-900"

                            >
                                Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey
                            </h1>
                            <p
                                className="text-gray-600 text-justify leading-relaxed mb-4"

                            >
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                            <p
                                className="text-gray-600 text-justify leading-relaxed"

                            >
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </article>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div
                                className=" rounded-2xl  "
                                data-aos="fade-up"
                                data-aos-duration="800"
                            >
                                <h2
                                    className="text-2xl font-bold mb-6 text-gray-900"
                                    data-aos="fade-up"
                                >
                                    Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey
                                </h2>
                                <img
                                    src="/blog3.webp"
                                    alt="Travel Journey"
                                    className="w-full h-full rounded-2xl sm:h-96 mb-10 object-cover"
                                    data-aos="fade-up"
                                    data-aos-delay="50"

                                />

                                <p
                                    className="text-gray-600 text-justify leading-relaxed mb-4"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>

                                <p
                                    className="text-gray-600 text-justify leading-relaxed mb-4"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem ipsum.
                                </p>

                                <p
                                    className="text-gray-600 text-justify leading-relaxed"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <div
                                className=" rounded-2xl sm:px-6 px-2 py-6 sticky top-8"
                                data-aos="fade-up"
                                data-aos-duration="800"

                            >
                                <h2
                                    className="text-xl font-bold mb-6 text-gray-900"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    Categories :
                                </h2>
                                <ul className="space-y-1">
                                    {categories.map((category, index) => (
                                        <li
                                            key={index}
                                            className="flex flex-row items-center gap-3 py-3 sm:px-4 border-b border-gray-100 last:border-0 cursor-pointer group"
                                            data-aos="fade-in"
                                            data-aos-delay={400 + (index * 50)}
                                        >
                                            <span className="text-xl  group-hover:text-blue-500 group-hover:translate-x-1 duration-200  ">{category.icon}</span>
                                            <span className="text-md font-medium  group-hover:text-blue-500 group-hover:translate-x-1 duration-200  ">{category.name}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Recent Posts */}
                                <div className="mt-8">
                                    <h3
                                        className="text-lg font-bold mb-6 text-gray-900"
                                        data-aos="fade-up"
                                        data-aos-delay="700"
                                    >
                                        Recent Posts :
                                    </h3>
                                    <div className="space-y-4">
                                        {recentPosts.map((post, index) => (
                                            <div
                                                key={post.id}
                                                className="flex flex-row gap-3 transition-all group hover:translate-x-1 duration-200 cursor-pointer"
                                                data-aos="fade-up"
                                                data-aos-delay={800 + (index * 100)}
                                            >
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0  group-hover:translate-x-1 duration-200  "
                                                />
                                                <div className="flex-1 group-hover:text-blue-500 group-hover:translate-x-1 duration-200  ">
                                                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600  transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>


                    <div className='relative py-20'>
                        <div className="flex sm:flex-row flex-col justify-between sm:items-center mb-8">
                            <div className='flex flex-col gap-2'>

                                <h2
                                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                                    data-aos="fade-up"
                                >
                                    Our Blogs
                                </h2>
                                <p
                                    className="text-gray-600 text-justify leading-relaxed"
                                    data-aos="fade-up"

                                >
                                    Lorem ipsum is simply dummy text of the printing and typesetting industry.
                                </p>
                            </div>

                            <button
                                className="mt-6 md:mt-0 bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors duration-200 max-w-40 justify-center group cursor-pointer"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                View More
                                <FaArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
                            {blogPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className=" rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                                    data-aos="fade-up"
                                    data-aos-delay={100 + (index * 100)}
                                    data-aos-duration="800"
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-5">
                                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt className="w-3 h-3" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaRegClock className="w-3 h-3" />
                                                {post.readTime}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaRegMessage className="w-3 h-3" />
                                                {post.comments} comments
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <div className="flex justify-between items-center pt-4 border-t">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                                                    <img src='/agent.webp' alt='user'/> 
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{post.author}</span>
                                            </div>
                                            <button className="text-sm bg-gray-200 px-4 py-2 rounded-full font-semibold  text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                                                Keep Reading
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="relative bg-gray-200 py-10"
                data-aos="fade-in"
            >
                <div className='max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between gap-8'>
                    <div className='flex flex-col'>
                        <span
                            className="text-lg text-blue-500 font-bold"
                            data-aos="fade-right"
                        >
                            🌍 Download the Voyagio AI™ App
                        </span>
                        <span
                            className="text-md max-w-lg mt-2 px-1 text-gray-700 font-medium"
                            data-aos="fade-right"

                        >
                            Plan, personalize, and book your entire trip in seconds with the power of AI — all from one smart, seamless app.
                        </span>
                    </div>
                    <div
                        className="flex flex-col items-center gap-2"
                        data-aos="fade-left"

                    >
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

export default BlogDetails