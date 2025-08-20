import React, { useEffect, useMemo, useState } from 'react';
import { FaArrowLeftLong, FaRepeat, FaChevronUp } from 'react-icons/fa6';
import {
    FaHiking, FaUtensils, FaCamera, FaUmbrellaBeach,
    FaCalendarAlt, FaListUl, FaCoffee, FaShoppingBag, FaUniversity, FaTree,
    FaSpa
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePlan } from '../contexts/PlanContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase/Client';
import RoundLoader from '../components/RoundLoader';
import toast from 'react-hot-toast';

function PlanDetails() {
    const router = useNavigate();
    const location = useLocation();
    const [expandedDays, setExpandedDays] = useState({ 1: true });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isViewOnly, setIsViewOnly] = useState(false);
    const { draftPlan, saveItinerary, clearPlan, setDraftPlan } = usePlan();
    const { session } = useAuth();

    // Check if we're viewing a saved itinerary
    const generatedAt = location.state?.generatedAt;

    useEffect(() => {
        if (generatedAt) {
            // Load saved itinerary
            loadSavedItinerary();
        } else {
            // Use draft plan
            setIsLoading(false);
        }
    }, [generatedAt]);

    const loadSavedItinerary = async () => {
        if (!session?.user) {
            toast.error('Please login to view this itinerary');
            router('/login');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('itineraries')
                .select('*')
                .eq('generated_at', generatedAt)
                .eq('user_id', session.user.id)
                .order('day');

            if (error) throw error;

            if (data && data.length > 0) {
                // Reconstruct the plan format
                const plan = {};
                let title = '';
                let dates = '';
                
                data.forEach(row => {
                    // Get day info from the activities if available
                    const dayInfo = row.activities[0]?.dayInfo || {};
                    
                    plan[row.day_label || `Day ${row.day}`] = {
                        activities: row.activities,
                        Activities: row.activities, // for compatibility
                        name: dayInfo.name,
                        date: dayInfo.date
                    };
                    title = row.trip_name;
                });

                // Set as temporary draft plan for viewing
                setDraftPlan({
                    title,
                    plan,
                    dates,
                    generatedAt
                });
                
                setIsViewOnly(true); // This is a saved itinerary, not editable
            } else {
                toast.error('Itinerary not found');
                router('/itinerary');
            }
        } catch (error) {
            console.error('Error loading itinerary:', error);
            toast.error('Failed to load itinerary');
            router('/itinerary');
        } finally {
            setIsLoading(false);
        }
    };

    // Clear the temporary draft when leaving the page if viewing a saved itinerary
    useEffect(() => {
        return () => {
            if (isViewOnly && generatedAt) {
                clearPlan();
            }
        };
    }, [isViewOnly, generatedAt]);

    const data = draftPlan?.plan || null;
    const planTitle = draftPlan?.title || 'Trip Plan';
    const planDates = draftPlan?.dates || '';

    const toggleDay = (dayId) => {
        setExpandedDays(prev => ({ ...prev, [dayId]: !prev[dayId] }));
    };

    // Icon + color (text-* class); use border-current so the border matches text color
    const pickVisuals = (item) => {
        const category = (item?.category || '').toLowerCase();
        const text = `${item?.activity ?? ''} ${item?.description ?? ''}`.toLowerCase();
        const pick = (icon, color) => ({ icon, color });

        if (category === 'food' || /lunch|dinner|restaurant|ristorante/.test(text))
            return pick(<FaUtensils className="w-5 h-5" />, 'text-yellow-600');
        if (category === 'cafe' || /coffee|cafe|brunch/.test(text))
            return pick(<FaCoffee className="w-5 h-5" />, 'text-blue-600');
        if (category === 'beach' || /beach/.test(text))
            return pick(<FaUmbrellaBeach className="w-5 h-5" />, 'text-cyan-600');
        if (category === 'park' || /park|garden|nature|walk/.test(text))
            return pick(<FaTree className="w-5 h-5" />, 'text-green-600');
        if (category === 'museum' || category === 'landmark' || /museum|fort|castle|aquarium|planetarium|centre|center|landmark/.test(text))
            return pick(<FaUniversity className="w-5 h-5" />, 'text-purple-600');
        if (category === 'shopping' || /shop|market/.test(text))
            return pick(<FaShoppingBag className="w-5 h-5" />, 'text-pink-600');
        if (category === 'outdoor' || /hike|trail|loop/.test(text))
            return pick(<FaHiking className="w-5 h-5" />, 'text-orange-600');
        if (category === 'wellness' || /spa|relax|wellness|massage/.test(text))
            return pick(<FaSpa className='w-5 h-5' />, 'text-teal-600');

        return pick(<FaCamera className="w-5 h-5" />, 'text-gray-600');
    };

    // Turn the object of days into an array the UI can map
    const itineraryDays = useMemo(() => {
        if (!data) return [];
        return Object.entries(data).map(([dayLabel, dayObj], idx) => {
            const activities = (dayObj?.Activities || dayObj?.activities || []).map(a => {
                const { icon, color } = pickVisuals(a);
                return {
                    time: a.time || '',
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
        if (isViewOnly) {
            // If viewing a saved itinerary, go back to list
            router('/itinerary');
        } else {
            // If creating new, go back to suggestions
            router(-1);
        }
    };

    const handleConfirm = async () => {
        if (!draftPlan) {
            toast.error('No plan to save');
            return;
        }

        if (!session?.user) {
            toast.error('Please login to save your itinerary');
            return;
        }

        setIsSaving(true);

        try {
            const { data, generatedAt } = await saveItinerary(draftPlan, session);
            toast.success('Itinerary saved successfully!');
            clearPlan();
            router('/itinerary');
        } catch (error) {
            console.error('Error saving itinerary:', error);
            toast.error(error.message || 'Failed to save itinerary');
        } finally {
            setIsSaving(false);
        }
    };

    const handleViewDay = (dayTitle) => {
        if (isViewOnly) {
            // Pass the generatedAt so DayDetails can load from DB
            router("/day", { state: { dayKey: dayTitle, generatedAt, isViewOnly: true } });
        } else {
            // Regular draft viewing
            router("/day", { state: { dayKey: dayTitle } });
        }
    };

    // If absolutely nothing to show, nudge user back
    if (!isLoading && !itineraryDays.length) {
        return (
            <div className="px-4 py-20">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 text-center">
                    <h2 className="text-xl font-semibold mb-2">No plan found</h2>
                    <p className="text-gray-600 mb-6">
                        {isViewOnly ? 'This itinerary could not be loaded.' : 'Go pick a few places to generate your trip.'}
                    </p>
                    <button
                        onClick={() => router(isViewOnly ? '/generated-plans' : '/suggestions')}
                        className="px-5 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    >
                        {isViewOnly ? 'Back to Itineraries' : 'Generate Itinerary'}
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <RoundLoader />;
    }

    return (
        <div className='bg-gray-50 sm:px-4 sm:py-20 lg:px-8 min-h-screen'>
            <section
                className="relative max-w-7xl mx-auto sm:pt-10 pb-10 sm:px-4 px-2 bg-white shadow-lg w-full rounded-lg"
                data-aos="fade-in"
            >
                {/* Header */}
                <div className="flex md:flex-row flex-col md:justify-between gap-4 items-start p-4 mb-8" data-aos="fade-in" data-aos-delay="100">
                    <div className='flex sm:flex-row w-full flex-col gap-4 my-8 sm:flex-8/10'>
                        <FaArrowLeftLong
                            className='w-8 flex sm:flex-1/10 h-6 text-gray-700 my-2 cursor-pointer duration-200 transition-all hover:-translate-x-1'
                            onClick={() => router(isViewOnly ? '/generated-plans' : -1)}
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
                            {isViewOnly && (
                                <span className='text-sm text-blue-600 font-medium'>
                                    Viewing saved itinerary
                                </span>
                            )}
                        </div>
                        <div className='sm:flex w-8'>

                        </div>
                    </div>

                    {!isViewOnly && (
                        <button
                            className="bg-blue-500 sm:max-w-40 w-full flex-2/10 min-h-12 hover:bg-blue-600 transition-all cursor-pointer flex items-center gap-4 justify-center text-white px-6 rounded-md"
                            onClick={handleRegenerate}
                            title="Regenerate from suggestions"
                        >
                            <FaRepeat />
                            Regenerate
                        </button>
                    )}
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
                                                <div className={`w-12 hidden sm:flex h-12 rounded-full bg-transparent border border-current ${activity.color} items-center justify-center flex-shrink-0`}>
                                                    {activity.icon}
                                                </div>
                                                <div className='flex-1'>
                                                    <div className='flex sm:flex-row gap-2 flex-col items-start justify-between'>
                                                        <div className='sm:hidden mb-2 flex w-full items-center justify-between'>
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
                                                            <h4 className='font-semibold text-gray-800 mb-1'>
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
                                onClick={() => handleViewDay(day.title)}
                            >
                                View Day
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary Footer - Only show for new itineraries */}
                {!isViewOnly && (
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
                            className={`bg-blue-500 min-w-46 min-h-12 transition-all cursor-pointer flex items-center gap-4 justify-center text-white px-6 rounded-md ${
                                isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                            }`}
                            onClick={handleConfirm}
                            disabled={!draftPlan || isSaving}
                            title={!draftPlan ? "Generate a plan first" : "Confirm & save"}
                        >
                            {isSaving ? 'Saving...' : 'Confirm Itinerary'}
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default PlanDetails;