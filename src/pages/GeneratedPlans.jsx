import React, { useEffect, useState } from 'react'
import { FaClock, FaMapMarker, FaMapMarkerAlt, FaRegClock, FaCalendarAlt, FaListUl } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { supabase } from '../lib/supabase/Client';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function GeneratedPlans() {
    const router = useNavigate();
    const { session } = useAuth();
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserItineraries();
    }, [session]);

    const fetchUserItineraries = async () => {
        if (!session?.user) {
            setLoading(false);
            return;
        }

        try {
            // Fetch all itineraries for the user
            const { data, error } = await supabase
                .from('itineraries')
                .select('trip_name, generated_at, day, activities')
                .eq('user_id', session.user.id)
                .order('generated_at', { ascending: false });

            if (error) throw error;

            // Group by generated_at to get unique trips
            const tripsMap = new Map();
            
            data.forEach(row => {
                const key = row.generated_at;
                if (!tripsMap.has(key)) {
                    tripsMap.set(key, {
                        trip_name: row.trip_name,
                        generated_at: row.generated_at,
                        days: [],
                        totalActivities: 0,
                        createdDate: new Date(row.generated_at)
                    });
                }
                
                const trip = tripsMap.get(key);
                trip.days.push(row.day);
                trip.totalActivities += row.activities.length;
            });

            // Convert to array and calculate total days
            const trips = Array.from(tripsMap.values()).map(trip => ({
                ...trip,
                totalDays: Math.max(...trip.days),
                displayDate: trip.createdDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                displayTime: trip.createdDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }));

            setItineraries(trips);
        } catch (error) {
            console.error('Error fetching itineraries:', error);
            toast.error('Failed to load your trips');
        } finally {
            setLoading(false);
        }
    };

    const handleViewItinerary = (generatedAt) => {
        // Navigate to the plan details page with the generated_at timestamp
        router('/plan', { state: { generatedAt } });
    };

    const handleDeleteItinerary = async (generatedAt, tripName) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${tripName}"?`);
        if (!confirmed) return;

        try {
            const { error } = await supabase
                .from('itineraries')
                .delete()
                .eq('generated_at', generatedAt)
                .eq('user_id', session.user.id);

            if (error) throw error;

            toast.success('Itinerary deleted successfully');
            fetchUserItineraries(); // Refresh the list
        } catch (error) {
            console.error('Error deleting itinerary:', error);
            toast.error('Failed to delete itinerary');
        }
    };

    if (!session?.user) {
        return (
            <div className='bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 min-h-screen mt-10'>
                <section className="relative max-w-7xl mx-auto sm:py-10 py-4 px-4 bg-white shadow-lg w-full rounded-lg">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please Login</h2>
                        <p className="text-gray-600 mb-6">You need to be logged in to view your saved itineraries.</p>
                        <button
                            onClick={() => router('/login')}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
                        >
                            Login
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className='bg-gray-50 sm:py-16  sm:px-6 lg:px-8 min-h-screen sm:mt-10'>
            <section
                className="relative max-w-7xl mx-auto sm:py-10 py-4 sm:px-10 pt-10 px-2 bg-white shadow-lg w-full rounded-lg"
                data-aos="fade-down"
            >
                <div className="flex sm:flex-row flex-col sm:gap-2 gap-4 p-4 sm:mb-8">
                    <div className='flex flex-col flex-8/10'>
                        <h1 className='text-center sm:text-5xl text-4xl mb-4 font-semibold text-gray-800'>
                            Your Saved Itineraries
                        </h1>
                        <p className='text-center sm:text-lg text- w-full mx-auto text-gray-700'>
                            View and manage all your generated trip plans
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : itineraries.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <FaListUl className="w-12 h-12 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Itineraries Yet</h2>
                        <p className="text-gray-600 mb-6">
                            You haven't created any trip plans yet. Start by generating your first itinerary!
                        </p>
                        <button
                            onClick={() => router('/suggestions')}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
                        >
                            Create Your First Trip
                        </button>
                    </div>
                ) : (
                    <div className='flex flex-col gap-6 pb-6'>
                        {itineraries.map((trip, index) => (
                            <div
                                key={trip.generated_at}
                                className="flex flex-col mx-auto md:flex-row items-start md:items-center justify-between gap-4 py-4 px-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all w-full"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Left Section */}
                                <div className="flex flex-col md:flex-row w-full h-full gap-4">
                                    <div className="w-full md:w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-2" />
                                            <p className="text-2xl font-bold">{trip.totalDays}</p>
                                            <p className="text-sm">Days</p>
                                        </div>
                                    </div>
                                    
                                    <div className='flex lg:flex-row flex-col md:gap-4 md:items-end lg:items-center justify-center flex-1'>
                                        <div className="flex flex-col justify-around lg:min-w-lg min-h-40 w-full">
                                            {/* Title & Description */}
                                            <div>
                                                <h3 className="text-3xl text-gray-700 font-semibold">
                                                    {trip.trip_name}
                                                </h3>
                                                <p className="text-gray-500 text-md mt-2">
                                                    Created on {trip.displayDate} at {trip.displayTime}
                                                </p>
                                            </div>

                                            {/* Bottom Section: Stats */}
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 gap-2">
                                                <div className="flex lg:flex-row flex-col lg:items-center lg:gap-4 gap-2 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <FaCalendarAlt /> {trip.totalDays} {trip.totalDays === 1 ? 'Day' : 'Days'}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaListUl /> {trip.totalActivities} Activities
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="w-full sm:w-64 mt-4 md:mt-0 flex gap-2">
                                            <button 
                                                className="bg-blue-100 flex-1 text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-blue-200 transition-all cursor-pointer"
                                                onClick={() => handleViewItinerary(trip.generated_at)}
                                            >
                                                View itinerary
                                            </button>
                                            <button 
                                                className="bg-red-100 text-red-600 font-medium px-4 py-2 rounded-md hover:bg-red-200 transition-all cursor-pointer"
                                                onClick={() => handleDeleteItinerary(trip.generated_at, trip.trip_name)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default GeneratedPlans