import React, { useEffect, useMemo, useState } from 'react';
import { FaArrowLeftLong, FaRepeat, FaChevronUp } from 'react-icons/fa6';
import {
    FaHiking, FaUtensils, FaCamera, FaUmbrellaBeach,
    FaCalendarAlt, FaListUl, FaCoffee, FaShoppingBag, FaUniversity, FaTree
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { usePlan } from '../contexts/PlanContext';
import { useAuth } from '../contexts/AuthContext';
import { demoItinerary } from '../data/DemoItinerary'; // keep as fallback if no draft
import RoundLoader from '../components/RoundLoader';

function PlanDetails() {
    const router = useNavigate();
    const [expandedDays, setExpandedDays] = useState({ 1: true });
    const [isLoading, setIsLoading] = useState(true)
    const { draftPlan } = usePlan();
    const { session } = useAuth();

    useEffect(() => {
        setIsLoading(false)
        console.log(draftPlan)
    }, [draftPlan])
    // Use draft plan if present; otherwise render the demo data
    const looksLikeItinerary = (obj) =>
        obj && typeof obj === 'object' &&
        Object.values(obj).some(d => Array.isArray(d?.activities));

    // Prefer draftPlan.data; if someone accidentally set draftPlan itself to an itinerary,
    // we still handle it; otherwise fall back to demoItinerary.
    const data = looksLikeItinerary(draftPlan?.data) ? draftPlan.data : looksLikeItinerary(draftPlan) ? draftPlan : demoItinerary;

    const planTitle = draftPlan?.title || 'Trip Plan';
    const planDates = draftPlan?.dates || '';

    const toggleDay = (dayId) => {
        setExpandedDays(prev => ({ ...prev, [dayId]: !prev[dayId] }));
    };

    // Icon + color (text-* class); use border-current so the border matches text color
    const pickVisuals = (title = '', location = '', description = '') => {
        const text = `${title} ${location} ${description}`.toLowerCase();
        if (/coffee|cafe|brunch/.test(text)) return { icon: <FaCoffee className="w-5 h-5" />, color: 'text-blue-500' };
        if (/lunch|dinner|restaurant|ristorante/.test(text)) return { icon: <FaUtensils className="w-5 h-5" />, color: 'text-yellow-500' };
        if (/beach/.test(text)) return { icon: <FaUmbrellaBeach className="w-5 h-5" />, color: 'text-cyan-500' };
        if (/park|garden|nature|walk/.test(text)) return { icon: <FaTree className="w-5 h-5" />, color: 'text-green-500' };
        if (/museum|fort|castle|aquarium|planetarium|centre|center/.test(text)) return { icon: <FaUniversity className="w-5 h-5" />, color: 'text-purple-500' };
        if (/shop|market/.test(text)) return { icon: <FaShoppingBag className="w-5 h-5" />, color: 'text-pink-500' };
        if (/hike|trail|loop/.test(text)) return { icon: <FaHiking className="w-5 h-5" />, color: 'text-orange-500' };
        return { icon: <FaCamera className="w-5 h-5" />, color: 'text-gray-500' };
    };

    // Turn the object of days into an array the UI can map
    const itineraryDays = useMemo(() => {
        if (!data) return [];
        return Object.entries(data).map(([dayLabel, dayObj], idx) => {
            const activities = (dayObj?.activities || []).map(a => {
                const { icon, color } = pickVisuals(a.activity, a.location, a.description);
                return {
                    time: a.time || 'aasa',
                    title: a.activity || '',
                    location: a.location || '',
                    description: a.description || '',
                    icon,
                    color
                };
            });

            return {
                id: idx + 1,
                title: dayLabel,
                name: dayObj?.name,
                date: dayObj?.date || '',
                activities
            };
        });
    }, [data]);

    const totalactivities = useMemo(
        () => itineraryDays.reduce((sum, d) => sum + d.activities.length, 0),
        [itineraryDays]
    );

    const handleRegenerate = async () => {
        alert("Regenerate");
    }

    const handleConfirm = async () => {
        // Wire this to Supabase when ready. Example (pseudo):
        // if (!draftPlan) return;
        // if (!session?.user?.id) { toast.error("Please login first"); return; }
        // setSaving(true);
        // const { data: row, error } = await supabase
        //   .from('plans')
        //   .insert({ user_id: session.user.id, title: draftPlan.title, dates: draftPlan.dates, plan: draftPlan.data })
        //   .select('id').single();
        // if (error) { toast.error(error.message); setSaving(false); return; }
        // toast.success("Plan confirmed!");
        // clearPlan();
        // router(`/plans/${row.id}`);
        alert('/Confirmed'); // placeholder  while you wire the DB
    };

    // If absolutely nothing to show, nudge user back
    if (!itineraryDays.length) {
        return (
            <div className="px-4 py-20">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 text-center">
                    <h2 className="text-xl font-semibold mb-2">No plan found</h2>
                    <p className="text-gray-600 mb-6">Go pick a few places to generate your trip.</p>
                    <button
                        onClick={() => router(-1)}
                        className="px-5 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Generate Itinerary
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <RoundLoader />
        )
    }

    return (
        <div className='bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 min-h-screen mt-10'>
            <section
                className="relative max-w-7xl mx-auto sm:py-10 sm:px-4 bg-white shadow-lg w-full rounded-lg"
                data-aos="fade-in"
            >
                {/* Header */}
                <div className="flex md:flex-row flex-col md:justify-between gap-4 items-start p-4 mb-8" data-aos="fade-in" data-aos-delay="100">
                    <div className='flex sm:flex-row w-full flex-col gap-4 sm:flex-8/10'>
                        <FaArrowLeftLong
                            className='w-8 flex sm:flex-1/10 h-6 text-gray-700 my-2 cursor-pointer duration-200 transition-all hover:-translate-x-1'
                            onClick={() => router(-1)}
                        />
                        <div className='flex sm:flex-9/10 w-full flex-col gap-2 md:items-center'>
                            <h1 className='sm:text-4xl text-3xl text-gray-800 font-semibold'>{planTitle}</h1>
                            {planDates ? (
                                <span className='text-md text-gray-500 font-medium'>
                                    {`${itineraryDays.length} ${itineraryDays.length === 1 ? 'day' : 'days'} • ${planDates}`}
                                </span>
                            ) : (
                                <span className='text-md text-gray-500 font-medium'>
                                    {`${itineraryDays.length} ${itineraryDays.length === 1 ? 'day' : 'days'}`}
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        className="bg-blue-500 sm:max-w-40 w-full flex-2/10 min-h-12 hover:bg-blue-600 transition-all cursor-pointer flex items-center gap-4 justify-center text-white px-6 rounded-md"
                        onClick={handleRegenerate}
                        title="Regenerate from suggestions"
                    >
                        <FaRepeat />
                        Regenerate
                    </button>
                </div>

                {/* Itinerary Days */}
                <div className='flex flex-col gap-6 px-4'>
                    {itineraryDays.map((day, index) => (
                        <div
                            key={day.id}
                            className='border border-gray-200 rounded-xl overflow-hidden'
                            data-aos="fade-in"
                            data-aos-delay={200 + (index * 100)}
                        >
                            {/* Day Header */}
                            <div
                                className='bg-gray-50 p-6 cursor-pointer transition-all hover:bg-blue-50'
                                onClick={() => toggleDay(day.id)}
                            >
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        <div className='bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center'>
                                            <FaCalendarAlt className='w-5 h-5' />
                                        </div>
                                        <div>
                                            <h3 className='text-xl font-semibold text-gray-800'>
                                                {day.title}{day.name ? ` - ${day.name}` : ''}
                                            </h3>
                                            {day.date ? <p className='text-sm text-gray-500'>{day.date}</p> : null}
                                        </div>
                                    </div>
                                    <FaChevronUp
                                        className={`w-5 h-5 text-gray-500 transition-all duration-300 ${expandedDays[day.id] ? 'rotate-0' : 'rotate-180'}`}
                                    />
                                </div>
                            </div>

                            {/* Day activities */}
                            {expandedDays[day.id] && (
                                <div className='p-6 transition-all bg-white'>
                                    <div className='space-y-2'>
                                        {day.activities.map((activity, activityIndex) => (
                                            <div
                                                key={activityIndex}
                                                className='flex gap-4 border-b-1 border-gray-300 p-4 bg-transparent hover:bg-gray-50 transition-all'
                                                data-aos="fade-in"
                                                data-aos-delay={50 * activityIndex}
                                                data-aos-duration="500"
                                            >
                                                <div className={`w-12 hidden sm:flex h-12 rounded-full bg-transparent border border-current ${activity.color}  items-center justify-center flex-shrink-0`}>
                                                    {activity.icon}
                                                </div>
                                                <div className='flex-1'>
                                                    <div className='flex sm:flex-row gap-2 flex-col items-start justify-between'>
                                                        <div className='sm:hidden mb-2 flex w-full items-center justify-between '>
                                                            <div className={`w-12 h-12 rounded-full bg-transparent border border-current ${activity.color} flex items-center justify-center flex-shrink-0`}>
                                                                {activity.icon}

                                                            </div>
                                                            {activity.time && (
                                                                <span className='text-sm text-gray-500 font-medium whitespace-nowrap'>
                                                                    {activity.time}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className='cursor-default'>
                                                            <h4 className='font-semibold text-gray-800  mb-1'>
                                                                {activity.title}
                                                                {activity.location && <span className="text-gray-500">{" "}({activity.location})</span>}
                                                            </h4>
                                                            {activity.description && (
                                                                <p className='text-sm text-gray-500'>{activity.description}</p>
                                                            )}
                                                        </div>
                                                        {activity.time && (
                                                            <span className='text-sm sm:block hidden text-gray-500 font-medium whitespace-nowrap'>
                                                                {activity.time}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* View Day Button */}
                            <button
                                className='w-full bg-blue-500 rounded-lg cursor-pointer text-white py-4 hover:bg-blue-600 transition-all font-semibold'
                                onClick={() => router("/day", { state: { dayKey: day.title } })}
                            >
                                View Day
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary Footer */}
                <div
                    className='flex md:flex-row flex-col gap-4 justify-between rounded-2xl border border-gray-300 mx-4 lg:px-10 md:px-8 sm:px-6 px-4 py-4 my-10'
                    data-aos="fade-in"
                    data-aos-delay={itineraryDays.length < 4 ? (itineraryDays.length * 100 + 100) : 200}
                >
                    <div className="flex gap-4 items-center">
                        <FaListUl className='w-8 h-8 text-blue-500' />
                        <div className="flex flex-col">
                            <span className='text-md text-gray-700'>
                                {`${itineraryDays.length} ${itineraryDays.length === 1 ? 'day' : 'days'} and ${totalactivities} activities`}
                            </span>
                            <span className='text-md text-gray-500'>Selected</span>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 min-w-46 min-h-12 hover:bg-blue-600 transition-all cursor-pointer flex items-center gap-4 justify-center text-white px-6 rounded-md"
                        onClick={handleConfirm}
                        disabled={!draftPlan} // only confirm when it's a generated draft
                        title={!draftPlan ? "Generate a plan first" : "Confirm & save"}
                    >
                        Confirm Itinerary
                    </button>
                </div>
            </section>
        </div>
    );
}

export default PlanDetails;
