
import React, { useState } from 'react'
import { getTrackBackground, Range } from 'react-range';
import SmallCarousel from '../components/SmallCarousel';
import { AppFeatures } from '../data/AppFeatures';
import { TopRestaurants } from '../data/TopRestaurants';
import { FaClock, FaHeart, FaMapMarked, FaMapMarkedAlt, FaRegStar, FaSearch } from 'react-icons/fa';
import { InfoCards } from '../data/InfoCards';
import { Deals } from '../data/Deals';
import { Experiences } from '../data/Experience';
const STEP = 100;
const MIN = 2000;
const MAX = 15000;


const Home = () => {
  const [values, setValues] = useState([2000, 15000]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-400"><FaRegStar className='w-4 ' /></span>
        ))}
      </>
    );
  };

  return (
    <div className='bg-gray-50'>
      {/* Hero section */}
      <section className="relative bg-cover bg-center bg-[url('/src/assets/Hero_bg.png')] min-h-screen px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">

          {/* Left: Form Section */}
          <div className=" p-6 md:p-8 rounded-xl lg:w-1/2 w-full max-w-2xl space-y-2">

            {/* Travel Style Dropdown */}
            <div className='bg-white p-6 rounded-2xl flex sm:flex-row flex-col w-auto'>
              <div className='flex flex-col w-full'>
                <span className='text-md text-gray-900 font-semibold'>Select Travel Style</span>
                <span className='text-sm text-gray-400'>Select all that interest you</span>
              </div>
              <div className="relative w-full">
                <select className="w-full appearance-none bg-gray-50 text-gray-800 font-medium px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option>Select</option>
                  <option>Adventure</option>
                  <option>Culture</option>
                  <option>Relaxation</option>
                </select>

                {/* Down Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-600">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Budget Slider */}
            <div className='bg-white p-6 rounded-2xl flex w-auto'>
              <div className='flex flex-col w-full justify-center'>
                <span className='text-md text-gray-900 font-semibold'>Budget</span>
              </div>
              <div className="w-full max-w-md">


                <Range
                  values={values}
                  step={STEP}
                  min={MIN}
                  max={MAX}
                  onChange={(vals) => setValues(vals)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '8px',
                        width: '100%',
                        background: getTrackBackground({
                          values,
                          colors: ['#e5e7eb', '#facc15', '#e5e7eb'],
                          min: MIN,
                          max: MAX,
                        }),
                        borderRadius: '9999px',
                      }}
                      className="relative mt-4 mb-6"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, index, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '24px',
                        width: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        border: '2px solid #facc15',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 0 2px rgba(0,0,0,0.2)',
                      }}
                    >
                      <div className="absolute -top-9 bg-white text-sm text-gray-800 font-semibold px-2 py-1 rounded shadow-md">
                        {values[index]}
                      </div>
                    </div>
                  )}
                />

                {/* Output (optional) */}
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{MIN}</span>
                  <span>{MAX}</span>
                </div>
              </div>
            </div>

            {/* No. of Peoples */}
            <div className='bg-white p-6 rounded-2xl flex items-center w-auto'>
              <label className="w-full block text-md  font-semibold mb-1">No. of peoples</label>

              <input
                type="number"
                placeholder="Enter number of peoples"
                className="p-3 border border-gray-300 rounded w-full focus:outline-none no-spinner focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Boarding Location */}
            <div className='bg-white p-6 space-y-3 rounded-2xl flex-col w-auto'>
              <div className='flex'>
                <div className='flex flex-col w-full'>
                  <span className='text-md text-gray-900 font-semibold'>Boarding</span>
                  <span className='text-sm text-gray-400'>Select the location</span>
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search a city, region"
                    className="p-3 pr-10 border border-gray-300 rounded w-full focus:outline-none"
                  />
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
              <div className='flex'>
                <div className='flex flex-col w-full'>
                  <span className='text-md text-gray-900 font-semibold'>Destination</span>
                  <span className='text-sm text-gray-400'>Select the location</span>
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search a city, region"
                    className="p-3 pr-10 border border-gray-300 rounded w-full focus:outline-none"
                  />
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Travel Period */}
            <div className='bg-white p-6 space-y-3 rounded-2xl flex justify-between items-center w-auto'>
              <label className="block text-sm font-semibold mb-1">Travel Period</label>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  className="w-1/2 gray text-gray-500  p-3 border border-gray-300 self rounded focus:outline-none "
                />

                <input
                  type="date"
                  className="w-1/2 p-3 border text-gray-500 border-gray-300 rounded focus:outline-none"
                />

              </div>
            </div>

            {/* Button */}
            <button type='submit' className="w-full mt-4 h-14 rounded-2xl py-3 bg-blue-600 text-white text-md font-medium  hover:bg-blue-700 transition-all cursor-pointer" >
              Generate Itinerary
            </button>
          </div>

          {/* Right: Mobile Images */}
          <div className="relative w-full h-full lg:w-1/2 flex justify-center items-center ">
            <img
              src="/src/assets/Hero_img.png"
              alt="App preview 1"
              className="w-full max-w-3xl"
            />

          </div>
        </div>
      </section>

      <section className='relative py-20  w-full flex flex-col justify-center items-center'>
        <div className='flex-col justify-center items-center'>
          <p className='text-3xl font-bold text-center'>Top Destination</p>
          <span className='text-gray-500'>Navigate the Globe with Confidence</span>
        </div>
        <div className='w-full'>
          <SmallCarousel />
        </div>

      </section>

      <section className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  w-full flex flex-col '>
        <h1 className='text-4xl font-bold'>App Feature</h1>
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

      {/* Top Restaurant cards */}
      <section className='relative py-20 bg-blue-200/35 '>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  w-full flex flex-col '>

          <h1 className='text-4xl font-bold'>Top Restaurants</h1>

          <div className='flex flex-wrap justify-center gap-4 mt-10 '>
            {
              TopRestaurants.map((restaurant, index) => {
                return (
                  <div key={index} className='flex-col cursor-pointer bg-white rounded-lg p-2 max-w-72 shadow-sm hover:shadow-md transition-all'>
                    <div className='h-56 object-fill '>

                      <img src={restaurant.image} alt={restaurant.name} className='-z-10 rounded-lg h-full' />
                    </div>
                    <div className='flex-col pt-4 px-2'>
                      <div className='flex justify-between'>
                        <div className='flex flex-col'>
                          <p className='text-lg font-semibold'>{restaurant.name}</p>
                          <p className='text-blue-500 font-semibold '>${restaurant.price}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-end'>
                          <div className='flex'>
                            {
                              renderStars(restaurant.rating)
                            }
                          </div>
                          <p className='text-gray-500 text-xs'>({restaurant.reviewCount})</p>
                        </div>
                      </div>
                      <p className='text-gray-500 mt-2  flex gap-1 items-baseline'><FaMapMarkedAlt className='w-4 items-center' />
                        <span className='text-xs'>{restaurant.address}</span></p>
                    </div>
                  </div>
                )
              }
              )
            }

          </div>
        </div>
      </section>

      <section className='relative py-20 '>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col'>
          <h1 className='text-4xl font-bold mb-8'>Your Smart Travel Planning Hub</h1>
          <p className='text-md font-normal text-gray-500 mb-4'>Plan with precision, adjust with ease, and sync it all in real time-powered by our Living Itinerary Engine™.</p>
          <p className='text-md font-normal text-gray-500 mb-4'>Build your perfect trip in just a few steps with Voyagio's intelligent Travel Hub. Whether you're mapping out a weekend getaway or a multi-city journey, our Al- powered system personalizes every detail-so you can stop planning and start experiencing.</p>
          <p className='text-md font-normal text-gray-500 mb-4'>Everything updates in real time, including weather-based suggestions, schedule changes, and local recommendations. Sync with your mobile app and take your trip wherever you go.</p>
          <div className='flex flex-wrap justify-center gap-4 mt-8'>
            {
              InfoCards.map((info, index) => {
                return <div key={index} className='py-8 px-4 items-center gap-2 border-1 max-w-72 w-full shadow-sm bg-gray-50 border-gray-300 rounded-2xl flex flex-col '>
                  <img src={info.icon} alt={info.title} className='w-16' />
                  <p className='mt-4 font-bold text-lg text-gray-800'>{info.title}</p>
                  <p className='text-gray-500 text-sm'>{info.description}</p>
                </div>
              })
            }
          </div>
          <div className='mt-20 flex gap-4 justify-center'>
            <button className='px-5 py-3 font-bold text-sm text-blue-50 transition-all rounded-full bg-blue-500 hover:bg-blue-50 outline-2 hover:text-blue-500 outline-blue-500 cursor-pointer'>Try the Travel Hub</button>
            <button className='px-5 py-3 font-bold text-sm text-blue-500 transition-all rounded-full bg-blue-50 hover:bg-blue-500 outline-2 hover:text-blue-50 outline-blue-500 cursor-pointer'>How it Works</button>
          </div>
        </div>
      </section>

      <section className='relative py-20 '>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col'>
          <h1 className='text-4xl font-bold mb-8'>Deals (Flights and Last-Minute)</h1>
          <div className='flex flex-wrap justify-center gap-8 mt-8'>
            {
              Deals.map((deal, index) => {
                return (
                  <div
                    key={deal.id}
                    className="bg-gray-50 rounded-lg border-1 border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 w-full max-w-sm"
                  >
                    {/* Airline Logo */}
                    <div className="flex items-center mb-4">
                      <img
                        src={deal.logo}
                        alt="Airline Logo"
                        className="h-8 object-contain"
                      />
                    </div>

                    {/* Flight Details Section */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {deal.from} → {deal.to}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          This {deal.day.charAt(0).toUpperCase() + deal.day.slice(1)} - {deal.duration} {deal.class}
                        </p>
                      </div>
                      <div className="ml-4">
                        <img
                          src={deal.image}
                          alt={deal.to}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </div>
                    </div>
                    <hr className='text-gray-300 mx-2' />

                    {/* Agent and Book Button */}
                    <div className="flex items-center justify-between mt-6">
                      <img
                        src={deal.agent}
                        alt="Booking Agent"
                        className="h-8 object-contain"
                      />
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200 cursor-pointer">
                        Book Now
                      </button>
                    </div>
                  </div>
                )

              })
            }

          </div>
        </div>

      </section>

      <section className='relative py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>Activities & Events</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {Experiences.map((experience) => (
              <div
                key={experience.id}
                className="flex flex-col bg-white rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-300 overflow-hidden group w-full max-w-72"
              >
                {/* Image Container with Heart Button */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleLike(experience.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200 shadow-md"
                  >
                    <FaHeart
                      size={20}
                      className={`transition-colors duration-200 text-gray-600`}
                    />
                  </button>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {experience.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {experience.description}
                  </p>

                  {/* Duration and Reviews */}
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <FaClock size={16} />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{experience.reviews} reviews</span>
                    </div>
                  </div>

                  {/* Tip Section */}
                  {experience.tip && (
                    <p className="text-sm text-gray-500">
                      Tip: {experience.tip}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Restaurant cards */}
      <section className='relative py-20 bg-blue-200/35 '>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  w-full flex flex-col '>

          <h1 className='text-4xl font-bold mb-4'>Explore Unique Stays</h1>
          <div className='flex flex-wrap justify-center gap-4 mt-10 '>
            {
              TopRestaurants.map((restaurant, index) => {
                return (
                  <div key={index} className='flex-col cursor-pointer bg-white rounded-lg p-2 max-w-72 shadow-sm hover:shadow-md transition-all'>
                    <div className='h-56 object-fill '>

                      <img src={restaurant.image} alt={restaurant.name} className='-z-10 rounded-lg h-full' />
                    </div>
                    <div className='flex-col pt-4 px-2'>
                      <div className='flex justify-between'>
                        <div className='flex flex-col'>
                          <p className='text-lg font-semibold'>{restaurant.name}</p>
                          <p className='text-blue-500 font-semibold '>${restaurant.price}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-end'>
                          <div className='flex'>
                            {
                              renderStars(restaurant.rating)
                            }
                          </div>
                          <p className='text-gray-500 text-xs'>({restaurant.reviewCount})</p>
                        </div>
                      </div>
                      <p className='text-gray-500 mt-2  flex gap-1 items-baseline'><FaMapMarkedAlt className='w-4 items-center' />
                        <span className='text-xs'>{restaurant.address}</span></p>
                    </div>
                  </div>
                )
              }
              )
            }

          </div>

        </div>
      </section>

      <section className='relative py-20  w-full flex flex-col justify-center items-center'>
        <div className='flex-col justify-center items-center'>
          <p className='text-3xl font-bold text-center'>Discover Your New Favorite Stay</p>
          <span className='text-gray-500'>Navigate the Globe with Confidence</span>
        </div>
        <div className='w-full'>
          <SmallCarousel />
        </div>

      </section>

    </div>

  )
}

export default Home
