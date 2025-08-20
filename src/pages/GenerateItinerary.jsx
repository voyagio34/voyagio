import { useEffect, useState, useMemo } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar, FaPlus, FaCheck } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import RoundLoader from '../components/RoundLoader';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { usePlan } from '../contexts/PlanContext';
import axios from 'axios';
// import axios from 'axios';

// --- ONE small normalizer (handles arrays, common containers, and object maps) ---
const normalizeStateToArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  // common containers from various pages/APIs
  for (const key of ['results', 'activities', 'data', 'places', 'items']) {
    if (Array.isArray(value[key])) return value[key];
  }

  // object map (id -> item)
  if (typeof value === 'object') {
    const vals = Object.values(value);
    if (Array.isArray(vals) && vals.length) return vals;
  }

  return [];
};

function GenerateItinerary() {
  const INITIAL_VISIBLE = 6;
  const LOAD_MORE_STEP = 6;

  const router = useNavigate();
  const { state } = useLocation();
  const { session } = useAuth();
  const { setDraftPlan } = usePlan();

  const [likedItems, setLikedItems] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({});
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    window.scrollTo(0, 0);
    if(!state || !state?.response){
      router("/");
      return;
    }
    const normalized = normalizeStateToArray(state.response);
    if (!normalized.length) {
      router('/');
      return;
    }
    setFormData(state.formData);
    setActivities(normalized);
  }, [state, router]);

  useEffect(() => {
    console.log(state)
  }, [])

  const displayedActivities = useMemo(
    () => (Array.isArray(activities) ? activities.slice(0, visibleCount) : []),
    [activities, visibleCount]
  );

  const toggleLike = (data) =>
    setLikedItems((prev) => prev.some(item => item.place_id === data.place_id)
      ? prev.filter((x) => x.place_id !== data.place_id)
      : [...prev, data]
    );  // const toggleLike = (id) =>
  //   setLikedItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleAdded = (data) =>
    setAddedItems((prev) => prev.some(item => item.place_id === data.place_id)
      ? prev.filter((x) => x.place_id !== data.place_id)
      : [...prev, data]
    );
  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!session?.user) {
      setLoading(false);
      toast.error('Please Login First!');
      return;
    }

    // filter only selected activities (guard if no place_id; fallback to name)
    const selectedData = addedItems.map((item) => ({
      name: item.name,
      formatted_address: item.formatted_address,
      reference: item.reference
    }));

    const toastId = toast.loading('Generating Trip Plans...');
    try {
      const data = {
        location_name: formData.destination,
        start_date: formData.startDate ,
        end_date: formData.endDate,
        travel_styles: formData.travelStyles,
        added_places: selectedData
      }

      console.log(data)
      // TODO: call your backend with selectedData to generate a real plan
      const response = await axios.post(`${import.meta.env.VITE_BUILDSHIP_API_URL}/generatePlan`, data, {
      // const response = await axios.post(`https://xsng2q.buildship.run/generate`, data, {
        headers: "application/json"
      })
      if (!response) {
        throw new Error("Something went wrong");
      }
      const result = await response.data;
      console.log(response)
      await setDraftPlan(result.data); 
      toast.success('Your Plans Generated!', { id: toastId });
      router('/plan');
    } catch (error) {
      console.error({error});
      toast.error(error?.message || 'Something went wrong!', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating = 0) => {
    const safe = Math.max(0, Math.min(5, Number(rating) || 0));
    const rounded = Math.round(safe * 2) / 2;
    const full = Math.floor(rounded);
    const half = rounded % 1 ? 1 : 0;
    const empty = 5 - full - half;
    return (
      <>
        {[...Array(full)].map((_, i) => <FaStar key={`f-${i}`} className="w-4 h-4 text-yellow-400" />)}
        {half === 1 && <FaStarHalfAlt className="w-4 h-4 text-yellow-400" />}
        {[...Array(empty)].map((_, i) => <FaRegStar key={`e-${i}`} className="w-4 h-4 text-yellow-400" />)}
      </>
    );
  };

  if (loading) return <RoundLoader />;

  const truncate = (s = '', n = 70) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

  return (
    <div className="relative bg-gray-50 sm:px-4 sm:py-20 lg:px-8 min-h-screen">
      <section className="relative max-w-7xl mx-auto pt-4 px-4 bg-white shadow-lg w-full rounded-lg" data-aos="fade-right">
        <div className="flex md:flex-row flex-col md:justify-between gap-4 items-start my-4 p-4" data-aos="fade-in" data-aos-delay="100">
          <FaArrowLeftLong className="w-6 h-6 flex-1/10 text-gray-700 my-2 cursor-pointer hover:-translate-x-1" onClick={() => router('/')} />
          <div className="flex flex-8/10 flex-col gap-2 md:items-center sm:mb-8">
            <h1 className="sm:text-4xl text-3xl text-gray-800 font-semibold">Suggested Activities</h1>
          </div>
          <div className="flex flex-1/10" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap sm:mx-3 mb-2">
            {displayedActivities.length > 0 ? (
              displayedActivities.map((activity, index) => (
                <div key={activity.place_id ?? activity.name ?? index} className="w-full transition-all md:w-1/2 lg:w-1/3 px-2 mb-6">
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="relative">
                      <img
                        loading="lazy"
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${activity.photos?.[0]?.photo_reference}&key=${import.meta.env.VITE_REACT_GOOGLE_PHOTO_API_KEY}`}
                        alt={activity.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => { e.currentTarget.src = "/placeholder.webp"; }}
                      />
                      <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-white text-sm font-medium bg-blue-500 capitalize">
                        {activity.types?.[0]?.replaceAll('_', ' ') || 'place'}
                      </div>
                      <button
                        onClick={() => toggleLike(activity)}
                        className="absolute top-4 cursor-pointer right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                      >
                        {likedItems.some(item => item.place_id === (activity.place_id ?? activity.name)) ? (
                          <FaHeart className="w-5 h-5 text-red-500" />
                        ) : (
                          <FaRegHeart className="w-5 h-5 text-gray-700" />
                        )}
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-1">{truncate(activity.formatted_address, 150)}</p>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {(activity.types || []).map((type, i) => (
                          <div key={i} className="text-xs border border-blue-500 capitalize text-blue-500 px-2 py-1 rounded-full">
                            {type.replaceAll('_', ' ')}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center gap-6 text-sm text-gray-500 mb-4">
                        <div className="rounded-full flex items-center gap-1" title={`${activity.rating ?? 0} / 5`}>
                          {renderStars(activity.rating)}
                          <span className="font-medium">{(activity.rating ?? 0).toFixed(1)}</span>
                        </div>
                        <span>{activity.user_ratings_total} reviews</span>
                      </div>

                      <button
                        onClick={() => toggleAdded(activity)}
                        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex border border-blue-500 items-center justify-center gap-2 cursor-pointer ${addedItems.some(item => item.place_id === (activity.place_id ?? activity.name))
                          ? 'bg-blue-500 text-blue-50 hover:bg-blue-600'
                          : 'bg-white text-blue-500 hover:bg-blue-50'
                          }`}
                      >
                        {addedItems.some(item => item.place_id === (activity.place_id ?? activity.name)) ? <FaCheck className="w-4 h-4" /> : <FaPlus className="w-4 h-4" />}
                        {addedItems.some(item => item.place_id === (activity.place_id ?? activity.name)) ? 'Added to itinerary' : 'Add to itinerary'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-48 w-full">
                <h1 className="text-2xl font-semibold text-gray-700">No activities found</h1>
              </div>
            )}
          </div>

          {/* Pagination */}
          {Array.isArray(activities) && activities.length > INITIAL_VISIBLE && (
            <div className="flex items-center justify-center gap-3 pb-6">
              {visibleCount < activities.length && (
                <button
                  onClick={() => setVisibleCount((c) => Math.min(c + LOAD_MORE_STEP, activities.length))}
                  className="px-5 py-3 cursor-pointer transition-all rounded-xl border border-blue-500 text-blue-600 bg-white hover:bg-blue-50"
                >
                  View more ({activities.length - visibleCount} left)
                </button>
              )}
              {visibleCount > INITIAL_VISIBLE && (
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setVisibleCount(INITIAL_VISIBLE);
                  }}
                  className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                >
                  Show less
                </button>
              )}
            </div>
          )}

          {/* Generate plan */}
          <div className="flex justify-center pb-10">
            <button
              onClick={handleGenerate}
              className="relative max-w-lg w-full cursor-pointer transition-all bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl"
            >
              {loading ? 'Generating plans..' : 'Generate My Trip Plan'}
              {addedItems.length > 0 && (
                <span className="absolute -top-2 -right-2 h-6 min-w-6 px-1.5 rounded-full bg-white text-blue-600 text-xs font-bold flex items-center justify-center shadow ring-1 ring-blue-200">
                  {addedItems.length > 9 ? '9+' : addedItems.length} Selected
                </span>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GenerateItinerary;
