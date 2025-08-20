import { useEffect, useRef, useState } from 'react'
import { getTrackBackground, Range } from 'react-range';
import SmallCarousel from '../components/SmallCarousel';
import { AppFeatures } from '../data/AppFeatures';
import { TopRestaurants } from '../data/TopRestaurants';
import { FaArrowRight, FaCalendarAlt, FaClock, FaHeart, FaMapMarkedAlt, FaRegClock, FaSearch, FaStar } from 'react-icons/fa';
import { InfoCards } from '../data/InfoCards';
import { Deals } from '../data/Deals';
import { Experiences } from '../data/Experience';
import { images, steps } from '../data/Steps';
import { FaCircleLeft, FaCircleRight, FaRegMessage } from 'react-icons/fa6';
import { testimonialsData } from '../data/Reviews';
import { blogPosts } from '../data/BlogPosts';
import { Mail, X } from 'lucide-react';
import OnboardingModal from '../components/OnboardModal';
import DestinationModal from '../components/DestinationModal';
import { Link, useNavigate } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import toast from 'react-hot-toast';
import axios from 'axios';
import Select from "react-select";
import RoundLoader from '../components/RoundLoader';
import { useAuth } from '../contexts/AuthContext';
import { AuthRequiredError } from '../lib/CustomErrors/AuthRequiredError';


const STEP = 100;
const MIN = 2000;
const MAX = 20000;
const LIBRARIES = ['places'];

const Home = () => {
  const [values, setValues] = useState([MIN, MAX]);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [travelStyle, setTravelStyle] = useState([]);
  const [people, setPeople] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [onboardingPlace, setOnboardingPlace] = useState('');
  const [destinationPlace, setDestinationPlace] = useState('');
  const [onboardingLocation, setOnboardingLocation] = useState({ lat: 28.6139, lng: 77.2090 });
  const [destinationLocation, setDestinationLocation] = useState({ lat: 28.6139, lng: 77.2090 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useNavigate();
  const onboardingInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  const onboardingAutocompleteRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);
  const { session } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false)

  const TRAVEL_OPTIONS = [
    { value: "adventure", label: "Adventure" },
    { value: "wellness", label: "Wellness" },
    { value: "culture", label: "Culture" },
    { value: "relaxation", label: "Relaxation" },
    { value: "shopping", label: "Shopping" },
    { value: "relaxed", label: "Relaxed" },
    { value: "luxury", label: "Luxury" },
    { value: "gastronomy", label: "Gastronomy" },
    { value: "wine", label: "Wine" },
    { value: "photospots", label: "Photospots" },
    { value: "spiritual", label: "Spiritual" }
  ];




  // Use useJsApiLoader for Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES
  });

  // Initialize autocomplete when Google Maps is loaded
  useEffect(() => {
    if (isLoaded) {
      initializeAutocomplete();
    }
  }, [isLoaded]);

  const initializeAutocomplete = () => {
    if (!window.google?.maps?.places?.PlaceAutocompleteElement) {
      console.error('Google Maps Places Autocomplete is not available');
      return;
    }

    try {
      // Initialize onboarding autocomplete
      if (onboardingInputRef.current && !onboardingAutocompleteRef.current) {
        onboardingAutocompleteRef.current = new window.google.maps.places.Autocomplete(
          onboardingInputRef.current,
          {
            types: ['(cities)'],
            fields: ['place_id', 'geometry', 'name', 'formatted_address']
          }
        );

        onboardingAutocompleteRef.current.addListener('place_changed', () => {
          const place = onboardingAutocompleteRef.current.getPlace();

          if (place && place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const locationName = place.formatted_address || place.name || '';


            setOnboardingLocation({ lat, lng });
            setOnboardingPlace(locationName);
            if (onboardingInputRef.current) {
              onboardingInputRef.current.value = locationName;
            }
          }
        });
      }

      // Initialize destination autocomplete
      if (destinationInputRef.current && !destinationAutocompleteRef.current) {
        destinationAutocompleteRef.current = new window.google.maps.places.Autocomplete(
          destinationInputRef.current,
          {
            types: ['(cities)'],
            fields: ['place_id', 'geometry', 'name', 'formatted_address']
          }
        );

        destinationAutocompleteRef.current.addListener('place_changed', () => {
          const place = destinationAutocompleteRef.current.getPlace();
          // 
          // 

          if (place && place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const locationName = place.formatted_address || place.name || '';

            // 

            setDestinationLocation({ lat, lng });
            setDestinationPlace(locationName);
            if (destinationInputRef.current) {
              destinationInputRef.current.value = locationName;
            }
          }
        });
      }
    } catch (error) {
      console.error('Error initializing autocomplete:', error);
    }
  };


  const debugLocations = () => {
    console.table({
      'Onboarding': {
        place: onboardingPlace,
        lat: onboardingLocation.lat,
        lng: onboardingLocation.lng
      },
      'Destination': {
        place: destinationPlace,
        lat: destinationLocation.lat,
        lng: destinationLocation.lng
      }
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (onboardingAutocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(onboardingAutocompleteRef.current);
      }
      if (destinationAutocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(destinationAutocompleteRef.current);
      }
    };
  }, []);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 3 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev >= testimonialsData.length - 3 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };

  const getVisibleTestimonials = () => {
    const testimonials = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonialsData.length;
      testimonials.push(testimonialsData[index]);
    }
    return testimonials;
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <FaStar
        key={index}
        size={16}
        className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  const scrollToHowitworks = () => {
    const howSection = document.getElementById('howitworks');
    if (howSection) {
      howSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'cultural':
        return 'bg-purple-100 text-purple-800';
      case 'travel':
        return 'bg-orange-100 text-orange-800';
      case 'discovery':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleLike = (experienceId) => {
    // Implement like functionality if needed

  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    const toastId = toast.loading("Generating itinerary…");

    if (travelStyle == "") {
      toast.error("Please select a travel style", { id: toastId });
      setIsSubmitting(false);
      return;
    }
    if (!destinationPlace) {
      toast.error("Please select a destination", { id: toastId });
      setIsSubmitting(false);
      return;
    }

    const location = destinationPlace;
    const parts = location.split(",").map(part => part.trim());
    const region = parts[1];

    const travelStyles = travelStyle.join(",");

    const formData = {
      budgetMax: values[1],
      travelStyles,
      budgetMin: values[0],
      preferredRegion: region || null,
      endDate,
      startDate,
      destination: destinationPlace,
      energylevel: 5,
      explorationRadius: 50000,
      paceType: 4,
      budgetRange: "medium",
      startLocation: onboardingPlace
    }


    try {
      if (!session?.user) {
        setIsSubmitting(false)
        throw new AuthRequiredError("Please Login First!");
      }

      const response = await axios.post(`${import.meta.env.VITE_BUILDSHIP_API_URL}/api/getTripDestination`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.data.length > 0) {
        throw new Error(`No any data available for selected place!`);
      }

      toast.success("Places fetched according to destination!", { id: toastId });
      router("/generate-itinerary", { state: { response: response.data, formData: formData } });
    }
    catch (error) {
      console.log(error)
      if (error.name == "AxiosError") {
        if (error.code == "ERR_BAD_RESPONSE") {
          toast.error("Not enough places found!", { id: toastId });
        }
        else {
          toast.error("Server failed, try again later!", { id: toastId });
        }
      }
      else if (error.name == "AuthRequiredError") {
        toast.error("Please Login First!", { id: toastId });
        router("/signin");
      }
      else {
        toast.error(error.message, { id: toastId });
      }

    }
    finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return (
      <RoundLoader />
    )
  }

  return (
    <div className='bg-gray-50 overflow-x-hidden '>
      {/* Hero section */}
      <section className="relative bg-cover bg-center bg-[url('/Hero_bg.webp')] min-h-screen px-4 py-16 sm:px-6 lg:px-8 w-full" data-aos="fade-in">
        <div className="w-full max-w-7xl  mx-auto flex flex-col xl:flex-row justify-around items-center gap-12">

          {/* Left: Form Section */}
          <form onSubmit={handleGenerate} className="rounded-xl lg:w-1/2 w-full max-w-lg space-y-2"
            data-aos="fade-right"
            data-aos-delay="200"
          >

            {/* Travel Style Dropdown */}
            <div className='bg-white px-6 py-4 rounded-2xl flex sm:flex-row flex-col w-auto'>
              <div className='flex flex-col w-full sm:mb-0 mb-4'>
                <span className='text-md text-gray-900 font-semibold'>Select Travel Style</span>
                <span className='text-sm text-gray-400'>Select all that interest you</span>
              </div>

              <div className="w-full">
                <Select
                  isMulti
                  isDisabled={isSubmitting}
                  name="travelStyle"
                  options={TRAVEL_OPTIONS}
                  placeholder="Select one or more…"
                  closeMenuOnSelect={false}
                  // map array of strings <-> array of option objects
                  value={TRAVEL_OPTIONS.filter(o => travelStyle.includes(o.value))}
                  onChange={(selected) => setTravelStyle((selected || []).map(o => o.value))}
                  className="react-select-container"
                  classNamePrefix="rs"
                  // Tailwind-friendly classNames API (v5.7+)
                  classNames={{
                    control: ({ isFocused, isDisabled }) =>
                      `rounded-2xl border ${isFocused ? 'ring-2 ring-blue-400 border-blue-300' : 'border-gray-200'} bg-gray-50 ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} px-2`,
                    multiValue: () => "bg-blue-100 text-blue-700 rounded-md",
                    multiValueLabel: () => "text-sm px-1",
                    multiValueRemove: () => "hover:bg-blue-200 rounded-md",
                    placeholder: () => "text-gray-400",
                    input: () => "text-gray-800",
                    menu: () => "mt-2 border border-gray-200 shadow-lg rounded-2xl overflow-hidden",
                    option: ({ isFocused, isSelected }) =>
                      `px-3 py-2 text-sm cursor-pointer ${isSelected ? 'bg-blue-100 text-blue-700' : isFocused ? 'bg-gray-50' : ''}`,
                  }}
                  // compact styles tweak (optional)
                  styles={{
                    control: (base) => ({ ...base, minHeight: 48, borderRadius: 16 }),
                    menu: (base) => ({ ...base, borderRadius: 16 }),
                  }}
                />

                {/* Tiny count badge (optional) */}
                {travelStyle.length > 0 && (
                  <div className="mt-2 text-xs inline-flex items-center bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {travelStyle.length} selected
                  </div>
                )}
              </div>
            </div>


            {/* Budget Slider */}
            <div className='bg-white px-6 py-4 rounded-2xl flex flex-row w-auto'>
              <div className='flex-2/5 flex items-center  w-full justify-start'>
                <span className='text-md text-gray-900 font-semibold'>Budget</span>
              </div>
              <div className="w-full flex flex-3/5 items-end max-w-md">


                <Range
                  values={values}
                  disabled={isSubmitting}
                  step={STEP}
                  min={MIN}
                  max={MAX}
                  onChange={(vals) => setValues(vals)}
                  renderTrack={({ props, children }) => {
                    // Extract key from props
                    const { key, ...trackProps } = props;
                    return (
                      <div
                        key={key}
                        {...trackProps}
                        style={{
                          ...trackProps.style,
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
                    );
                  }}
                  renderThumb={({ props, index, isDragged }) => {
                    // Extract key from props
                    const { key, ...thumbProps } = props;
                    return (
                      <div
                        key={key}
                        {...thumbProps}
                        style={{
                          ...thumbProps.style,
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
                        <div className="absolute cursor-pointer -top-9 bg-white text-sm text-gray-800 font-semibold px-2 py-1 rounded shadow-md">
                          ${values[index].toLocaleString()}
                        </div>
                      </div>
                    );
                  }}
                />


              </div>
            </div>

            {/* No. of Peoples */}
            <div className='bg-white px-6 py-4 rounded-2xl flex sm:flex-row flex-col items-center w-auto'>
              <label className="w-full block text-md  font-semibold mb-1">No. of peoples</label>

              <input
                type="number"
                name="people"
                required
                value={people}
                disabled={isSubmitting}
                onChange={(e) => setPeople(e.target.value)}
                placeholder="Enter number of peoples"
                className="p-3 border border-gray-300 rounded w-full focus:outline-none no-spinner focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Location */}
            <div className='bg-white px-6 py-4 space-y-3 rounded-2xl flex-col w-auto'>
              {/* Boarding Location */}
              <div className='flex sm:flex-row flex-col gap-2'>
                <div className='flex flex-col w-full'>
                  <span className='text-md text-gray-900 font-semibold'>Boarding</span>
                  <span className='text-sm text-gray-400'>Select the location</span>
                </div>
                <div className='flex w-full flex-row gap-2'>
                  <div className="relative w-full">
                    <input
                      ref={onboardingInputRef}
                      type="text"
                      id='onboard'
                      required
                      placeholder="Search a city, region"
                      className="p-3 pr-10 border min-w-4xs border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      defaultValue={onboardingPlace}
                      disabled={!isLoaded || isSubmitting}
                    />
                    {onboardingPlace ? (
                      <button
                        type="button"
                        onClick={() => {

                          setOnboardingPlace('');
                          setOnboardingLocation({ lat: 51.1784, lng: -115.5708 });
                          if (onboardingInputRef.current) {
                            onboardingInputRef.current.value = '';
                          }
                        }}
                        className={`absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 px-2 py-2 hover:text-gray-600 transition-all cursor-pointer z-30 ${isSubmitting ? " hidden" : " block"}`}
                        title="Clear location"
                      >
                        <X className='w-5 h-5' />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className='absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none px-2 py-2'
                        title="Search location"
                      >
                        <FaSearch className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className='flex items-center'>
                    <FaMapMarkedAlt
                      className='w-8 h-6 text-blue-500 cursor-pointer hover:text-blue-600 transition-all'
                      onClick={() => {
                        if (!isSubmitting) setOnboardingOpen(true)
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Destination Location */}
              <div className='flex sm:flex-row flex-col gap-2'>
                <div className='flex flex-col w-full'>
                  <span className='text-md text-gray-900 font-semibold'>Destination</span>
                  <span className='text-sm text-gray-400'>Select the location</span>
                </div>
                <div className='flex w-full flex-row gap-2'>
                  <div className="relative w-full">
                    <input
                      ref={destinationInputRef}
                      type="text"
                      required
                      id='destination'
                      placeholder="Search a city, region"
                      className="p-3 pr-10 border min-w-4xs border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      defaultValue={destinationPlace}
                      disabled={!isLoaded || isSubmitting}
                    />
                    {destinationPlace ? (
                      <button
                        type="button"
                        onClick={() => {

                          setDestinationPlace('');
                          setDestinationLocation({ lat: 51.1784, lng: -115.5708 });
                          if (destinationInputRef.current) {
                            destinationInputRef.current.value = '';
                          }
                        }}
                        className={`absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 px-2 py-2 hover:text-gray-600 transition-all cursor-pointer z-30 ${isSubmitting ? " hidden" : " block"}`}
                        title="Clear location"
                      >
                        <X className={`h-5 w-5`} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className='absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none px-2 py-2'
                        title="Search location"
                      >
                        <FaSearch className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className='flex items-center'>
                    <FaMapMarkedAlt
                      className='w-8 h-6 text-blue-500 cursor-pointer hover:text-blue-600 transition-all'
                      onClick={() => {
                        if (!isSubmitting) setDestinationOpen(true)
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Show loading message if maps not loaded */}
              {!isLoaded && (
                <p className="text-sm text-gray-500 text-center">Loading location search...</p>
              )}
            </div>

            {/* Travel Period */}
            <div className="bg-white px-6 py-4 space-y-3 rounded-2xl flex flex-col w-auto">
              <label className="block text-md font-semibold text-gray-900">Travel Period</label>

              <div className="flex sm:flex-row flex-col w-full items-start sm:items-center gap-4">

                {/* Start Date */}
                <div className="flex flex-col w-full sm:w-1/2">
                  <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <div className="relative w-full">
                    <input
                      type="date"
                      name='startDate'
                      required
                      disabled={isSubmitting}
                      value={startDate}
                      min={new Date().toISOString().split("T")[0]}
                      max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} onChange={(e) => {
                        const value = e.target.value;
                        setStartDate(value);

                        // Reset endDate if it's before new startDate
                        if (endDate && value && new Date(endDate) <= new Date(value)) {
                          setEndDate("");
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded text-gray-500 focus:outline-blue-400"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div className="flex flex-col w-full sm:w-1/2">
                  <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <div className="relative w-full">
                    <input
                      type="date"
                      name='endDate'
                      value={endDate}
                      disabled={isSubmitting}
                      required
                      min={startDate || new Date().toISOString().split("T")[0]}
                      max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded text-gray-500 focus:outline-blue-400"
                    />
                  </div>
                </div>

              </div>
            </div>


            {/* Button */}
            <button type='submit' className={`w-full mt-4 h-14 rounded-2xl py-3 bg-blue-500 text-white text-md font-bold cursor-pointer transition-all ${isSubmitting ? "opacity-70" : "opacity-100 curosor-pointer hover:bg-blue-600"}`} disabled={isSubmitting}>
              {isSubmitting ? "Generating Itinerary..." : "Generate Itinerary"}
            </button>
          </form>

          {/* Right: Mobile Images */}
          <div className="relative w-full h-full lg:w-1/2 flex justify-center items-center "
            data-aos="fade-right"
            data-aos-delay="200">
            <img
              src="/Hero_img.webp"
              alt="App preview 1"
              className="w-full max-w-4xl"
            />

          </div>
        </div>

        <OnboardingModal
          isOpen={onboardingOpen}
          onClose={() => setOnboardingOpen(false)}
          location={onboardingLocation}
          setLocation={(loc) => {
            // 
            setOnboardingLocation(loc);
            if (onboardingInputRef.current) {
              onboardingInputRef.current.value = onboardingPlace;
            }
          }}
          defaultValue={onboardingPlace}
          onConfirm={(place) => {
            // 
            setOnboardingPlace(place);
            if (onboardingInputRef.current) {
              onboardingInputRef.current.value = place;
            }
          }}
        />

        <DestinationModal
          isOpen={destinationOpen}
          onClose={() => setDestinationOpen(false)}
          location={destinationLocation}
          setLocation={(loc) => {
            // 
            setDestinationLocation(loc);
            if (destinationInputRef.current) {
              destinationInputRef.current.value = destinationPlace;
            }
          }}
          defaultValue={destinationPlace}
          onConfirm={(place) => {
            // 
            setDestinationPlace(place);
            if (destinationInputRef.current) {
              destinationInputRef.current.value = place;
            }
          }}
        />

      </section>

      <section className='relative py-20  w-full flex flex-col justify-center items-center'>
        <div className='flex-col justify-center items-center' data-aos="fade-right">
          <p className='sm:text-4xl text-3xl font-bold text-center'>Top Destination</p>
          <span className='text-gray-500'>Navigate the Globe with Confidence</span>
        </div>
        <div className='w-full'>
          <SmallCarousel />
        </div>

      </section>

      <section className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  w-full flex flex-col '>
        <h1 className='sm:text-5xl text-4xl font-bold' data-aos="fade-right">App Feature</h1>
        <div className='flex flex-wrap justify-center sm:space-x-10 space-x-0 mt-10' >
          {
            AppFeatures.map((feature, index) => {
              return (
                <div key={index}
                  className='flex-col max-w-84 mx-4'
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
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
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  w-full flex flex-col ' data-aos="fade-right">

          <h1 className='sm:text-5xl text-4xl font-bold mb-10' data-aos="fade-right">Top Restaurants</h1>

          <div className='flex flex-wrap justify-center gap-4 mt-10 '>
            {
              TopRestaurants.map((restaurant, index) => {
                return (
                  <div key={index} className='flex-col cursor-pointer bg-white rounded-lg p-2 max-w-72 shadow-sm hover:shadow-md transition-all'
                    data-aos="fade-right"
                    data-aos-delay={index * 100}
                    data-aos-anchor-placement="center-bottom">
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
                      <p className='text-gray-500 mt-2  flex gap-1 items-baseline'>
                        <FaMapMarkedAlt className='w-4 items-center' />
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
          <h1 className='sm:text-5xl text-4xl font-bold mb-8' data-aos="fade-right">Your Smart Travel Planning Hub</h1>
          <p className='text-md font-normal text-gray-500 mb-4' data-aos="fade-right" data-aos-delay="50">Plan with precision, adjust with ease, and sync it all in real time-powered by our Living Itinerary Engine™.</p>
          <p className='text-md font-normal text-gray-500 mb-4' data-aos="fade-right" data-aos-delay="50">Build your perfect trip in just a few steps with Voyagio's intelligent Travel Hub. Whether you're mapping out a weekend getaway or a multi-city journey, our Al- powered system personalizes every detail-so you can stop planning and start experiencing.</p>
          <p className='text-md font-normal text-gray-500 mb-4' data-aos="fade-right" data-aos-delay="50">Everything updates in real time, including weather-based suggestions, schedule changes, and local recommendations. Sync with your mobile app and take your trip wherever you go.</p>
          <div className='flex flex-wrap justify-center gap-4 mt-8'>
            {
              InfoCards.map((info, index) => {
                return <div key={index} className='py-8 px-4 items-center gap-2 border-1 max-w-72 w-full shadow-sm bg-gray-50 border-gray-300 rounded-2xl flex flex-col ' data-aos="fade-right" data-aos-delay={100 + index * 100}>
                  <img src={info.icon} alt={info.title} className='w-16' />
                  <p className='mt-4 font-bold text-lg text-gray-800'>{info.title}</p>
                  <p className='text-gray-500 text-sm'>{info.description}</p>
                </div>
              })
            }
          </div>
          <div className='mt-20 flex gap-4 justify-center'>
            <Link to='/travelhub'
              data-aos="fade-right"
              data-aos-delay={250}
              className='px-5 py-3 font-bold text-sm text-blue-50 transition-all rounded-full bg-blue-500 hover:bg-blue-50 outline-2 hover:text-blue-500 outline-blue-500 cursor-pointer'>Try the Travel Hub</Link>
            <button
              onClick={scrollToHowitworks}
              data-aos="fade-right"
              data-aos-delay={300}
              className='px-5 py-3 font-bold text-sm text-blue-500 transition-all rounded-full bg-blue-50 hover:bg-blue-500 outline-2 hover:text-blue-50 outline-blue-500 cursor-pointer'>How it Works</button>
          </div>
        </div>
      </section>

      <section className='relative py-20 '>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col'>
          <h1 className='sm:text-5xl text-4xl font-bold mb-8' data-aos="fade-right">Deals (Flights and Last-Minute)</h1>
          <div className='flex flex-wrap justify-center gap-8 mt-8'>
            {
              Deals.map((deal, index) => {
                return (
                  <div
                    key={deal.id}
                    className="bg-white rounded-lg border-1 border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 w-full max-w-sm"
                    data-aos="fade-right"
                    data-aos-delay={100 + index * 100}
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
          <h2 className='sm:text-5xl text-4xl font-bold text-gray-900 mb-4' data-aos="fade-right">Activities & Events</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {Experiences.map((experience, index) => (
              <div
                key={experience.id}
                className="flex flex-col bg-white rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all  duration-300 overflow-hidden group w-full max-w-72"
                data-aos="fade-right"
                data-aos-delay={100 + index * 100}
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

      {/* Unique stays cards */}
      <section className='relative py-20 bg-blue-200/35 ' >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  w-full flex flex-col ' data-aos="fade-right">

          <h1 className='sm:text-5xl text-4xl font-bold mb-10' data-aos="fade-right">Explore Unique Stays</h1>
          <div className='flex flex-wrap justify-center gap-4 mt-10 '>
            {
              TopRestaurants.map((restaurant, index) => {
                return (
                  <div key={index} className='flex-col cursor-pointer bg-white rounded-lg p-2 max-w-72 shadow-sm hover:shadow-md transition-all' data-aos="fade-right" data-aos-delay={index * 100}>
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
        <div className='flex flex-col justify-center items-center' data-aos="fade-right">
          <p className='sm:text-4xl text-3xl font-bold text-center'>Discover Your New Favorite Stay</p>
          <span className='text-gray-500 text-center flex   items-center'>Navigate the Globe with Confidence</span>
        </div>
        <div className='w-full'>
          <SmallCarousel />
        </div>

      </section>

      <section className="relative py-20 w-full" id='howitworks'>
        <div className='max-w-7xl mx-auto px-4  items-center  sm:px-6 lg:px-8  w-full flex flex-col ' data-aos="fade-right">
          <h1 className='sm:text-5xl text-4xl font-bold mb-4 '>How it Works</h1>
          <span className='text-gray-500 text-center flex items-center mb-14'>Competitive fares for your route-specific searches.</span>
          <div className="flex flex-col lg:flex-row gap-8 lg:items-start mt-10">
            {/* Left Side - Images */}
            <div className="grid grid-cols-1 gap-4" data-aos="fade-right" data-aos-delay="200">
              {/* Main Large Image */}
              <div className="col-span-1">
                <img
                  src={images[0].src}
                  alt={images[0].alt}
                  className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* Two Smaller Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <img
                    src={images[1].src}
                    alt={images[1].alt}
                    className="w-full h-60 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="col-span-1 relative">
                  <img
                    src={images[2].src}
                    alt={images[2].alt}
                    className="w-60 h-40 object-cover rounded-2xl shadow-lg"
                  />
                  {/* Wave Pattern Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-2xl">
                    <img src="/how4.webp" alt="wave" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Steps */}
            <div className="flex flex-col gap-6 overflow-y-hidden lg:w-1/2" data-aos="fade-right" data-aos-delay={100}>
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`${step.bgColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer duration-300`}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <img src={step.icon} alt="icon" className='w-6' />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='relative bg-blue-200/35 overflow-x-hidden py-20 w-full' data-aos="fade-in">
        <img src="/testbg.webp" alt="bg" className='absolute bottom-0 max-w-64 left-2' data-aos="fade-right" />
        <div className='max-w-7xl mx-auto px-4  items-start  sm:px-6 lg:px-8  w-full flex flex-col '>
          <div className='flex flex-row justify-between w-full h-full items-baseline'>
            <div className="flex flex-col overflow-y-hidden" data-aos="fade-right" data-aos-delay="100">

              <h2 className='sm:text-5xl text-4xl  font-bold mb-4'>Social Proof / Testimonials</h2>
              <p className='text-gray-500 mb-4 text-md '>What our clients are saying about us?</p>
            </div>
            <div className='flex flex-row gap-2' data-aos="fade-right" data-aos-delay="100">
              <FaCircleLeft className='w-8 h-8 text-gray-700 cursor-pointer hover:text-gray-600 transition-all' aria-labelledby='Previous Testimonial' onClick={handlePrevious} />
              <FaCircleRight className='w-8 h-8 text-gray-700 cursor-pointer hover:text-gray-600 transition-all' aria-labelledby='Previous Testimonial' onClick={handleNext} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                data-aos="fade-right"
                data-aos-delay={100 + index * 100}
                className={`bg-gray-50 rounded-2xl shadow-lg p-6 lg:p-8 transform transition-all duration-300 hover:shadow-xl ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {testimonial.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-4">
                  {testimonial.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.author.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.author.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className='relative mx-auto py-20 overflow-x-hidden w-full'>
        <div className='max-w-7xl mx-auto  w-full flex flex-col items-start  '>
          <div className="flex flex-col w-full md:flex-row overflow-hidden justify-between items-start md:items-center mb-12">
            <div data-aos="fade-right" className=" px-4 sm:px-6 lg:px-8 " >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Travel Insights & Guides
              </h2>
              <p className="text-gray-600 text-lg">
                Embark on a journey like never before with Travila – your
                ultimate travel companion.
              </p>
            </div>

            <button className="mt-6 px-6 mx-4 sm:mx-6 lg:mx-8 md:mt-0 bg-black text-white py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors duration-200 group cursor-pointer " data-aos="fade-right" data-aos-delay="100">
              View More
              <FaArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 gap-8 px-4 mx-auto">
            {blogPosts.map((post, index) => (
              <article key={post.id} className="bg-gray-50 cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group max-w-96 mx-auto " data-aos="fade-right" data-aos-delay={index * 100}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <span className={`absolute top-4 font-semibold left-4 px-4 py-1.5 rounded-full text-sm ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between">
                  {/* Meta Information */}
                  <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-4 gap-1 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRegClock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRegMessage size={16} />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2  transition-colors duration-200">
                    {post.title}
                  </h3>

                  <div className="flex sm:flex-row flex-col gap-6 h-full sm:items-center  justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {post.author.name}
                      </span>
                    </div>

                    <button className="text-sm font-semibold py-3 bg-gray-200  text-gray-700 hover:bg-gray-300 rounded-full transition-all duration-200 cursor-pointer px-4">
                      {post.excerpt}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </section>

      <section className='relative py-20 md:px-20 sm:px-10 px-4'>
        <div className='bg-red-200/30 relative max-w-7xl mx-auto rounded-2xl w-full' data-aos="fade-up">
          <div className='flex flex-col md:px-20 px-10 py-24'>
            <img src="/rightbottom.webp" alt="arrow" className=' absolute w-25 bottom-5 lg:right-50 sm:right-20 right-10' />
            <img src="/rightbottom.webp" alt="arrow" className=' absolute w-40 bottom-15 lg:right-30 sm:right-10 right-5' />
            <img src="/downloadbg.webp" alt="arrow" className='absolute md:w-1/2 w-full bottom-0 right-0' />

            <div className='flex sm:flex-row flex-col sm:items-center sm:justify-start items-center justify-center'>
              <div className="flex flex-col">
                <h2 className='lg:text-5xl text-4xl font-bold mb-2'>
                  Discover Seamless
                  <br />Travel with
                  <br />Voyagio AI
                </h2>
                <p className='text-gray-500 font-medium'>
                  Embark on a journey like never before with Travila – your <br />ultimate travel companion.
                </p>
              </div>
              <img src="/download1.webp" alt="download mobile" className='w-34 -rotate-12 ms-10' />

            </div>
            <div className="flex md:flex-row flex-col gap-4 mt-14">

              <img src="/playstore.webp" alt="playstore" className='w-40' />
              <img src="/appstore.webp" alt="appstore" className='w-40' />

            </div>
          </div>

        </div>
      </section>

      <section className='relative py-20 lg:px-20 md:px-10 px-4 overflow-y-hidden'>
        <div className='bg-gray-200/50 relative max-w-6xl mx-auto rounded-2xl py-10 w-full' data-aos="fade-up">
          <div className="flex flex-col items-center md:px-20 sm:px-10 px-4 py-20">
            <h2 className='text-blue-600 sm:text-2xl text-xl text-center font-medium tracking-widest mb-2' data-aos="fade-up" >SUBSCRIBE TO OUR NEWSLETTER</h2>
            <h2 className='text-gray-900 sm:text-4xl text-3xl text-center font-semibold' data-aos="fade-up" data-aos-delay="100">Prepare you self and let’s explore the <br className='sm:block hidden' /> beautiful of the world</h2>
            <div className='flex sm:flex-row flex-col sm:gap-0 gap-4 items-center pt-20 w-full' data-aos="fade-up" data-aos-delay="200">
              <div className='flex w-full items-center' >

                <Mail className='text-gray-300 sm:block hidden translate-x-10' />
                <input type="email" placeholder='Your email' className='bg-white text-gray-500 sm:ps-14 ps-4 rounded-2xl shadow-md p-4 w-full focus:outline-none focus:ring-1 focus:ring-blue-400' />
              </div>
              <button className='cursor-pointer hover:bg-blue-600 transition-all bg-blue-500 text-white font-semibold p-4 w-full sm:w-auto rounded-2xl mx-2'>Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Home
