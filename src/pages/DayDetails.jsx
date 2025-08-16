import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
    FaCamera, FaCoffee, FaHiking, FaTshirt, FaUtensils,
    FaUniversity, FaShoppingBag, FaUmbrellaBeach, FaTree, FaExclamationTriangle
} from 'react-icons/fa';
import { FaArrowLeftLong, FaRegClock, FaSun } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePlan } from '../contexts/PlanContext';
import { demoItinerary } from '../data/DemoItinerary';

function DayDetails() {
    const router = useNavigate();
    const { state } = useLocation(); // expects { dayKey: "Day 1" }
    const { draftPlan, removeActivity } = usePlan();

    const plan = draftPlan?.data || demoItinerary;
    const dayKey = state?.dayKey || 'Day 1';
    const day = plan?.[dayKey];

    const activities = useMemo(() => day?.activities || [], [day]);

    const [confirm, setConfirm] = useState({ open: false, index: null, title: '' });

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

        return pick(<FaCamera className="w-5 h-5" />, 'text-gray-600');
    };

    const weatherText = (w) => {
        if (!w) return null;
        if (typeof w === 'string') return w;
        if (typeof w === 'object' && (w.summary || w.tempC !== undefined)) {
            const parts = [];
            if (w.summary) parts.push(w.summary);
            if (w.tempC !== undefined) parts.push(`${w.tempC}°C`);
            return parts.join(', ');
        }
        return null;
    };

    const openConfirm = (idx, title) => setConfirm({ open: true, index: idx, title: title || '' });
    const closeConfirm = () => setConfirm({ open: false, index: null, title: '' });
    const confirmSkip = () => {
        if (confirm.index !== null) removeActivity(dayKey, confirm.index);
        closeConfirm();
    };

    if (!day) {
        return (
            <div className='bg-gray-50 mt-10 px-4 py-16 sm:px-6 lg:px-8 min-h-screen'>
                <section className="relative max-w-3xl mx-auto bg-white shadow w-full rounded-lg p-6">
                    <button className="text-blue-600 mb-3" onClick={() => router(-1)}>&larr; Back</button>
                    <p className="text-gray-700">Day not found.</p>
                </section>
            </div>
        );
    }

    return (
        <div className='bg-gray-50 mt-10 px-4 py-16 sm:px-6 lg:px-8 min-h-screen'>
            <section className="relative max-w-7xl mx-auto sm:py-10 sm:px-4 bg-white shadow-lg w-full rounded-lg" data-aos="fade-in">
                {/* Header */}
                <div className="flex md:flex-row flex-col md:justify-between gap-4 items-start p-4 mb-8" data-aos="fade-in" data-aos-delay="100">
                    <FaArrowLeftLong
                        className='w-6 h-6 flex-1/10 text-gray-700 my-2 cursor-pointer duration-200 transition-all hover:-translate-x-1'
                        onClick={() => router(-1)}
                    />
                    <div className='flex flex-8/10 flex-col gap-2 md:items-center'>
                        <h1 className='sm:text-4xl text-3xl text-gray-800 font-semibold'>
                            {dayKey}{day?.name ? ` - ${day.name}` : ''}
                        </h1>
                        {day?.date && <span className='text-md text-gray-500 font-medium'>{day.date}</span>}
                    </div>
                    <div className='flex flex-1/10' />
                </div>

                {/* activities */}
                <div className="mx-auto p-4 space-y-6 min-h-screen">
                    {activities.map((a, index) => {
                        const { icon, color } = pickVisuals(a);
                        const wText = weatherText(a.weather);

                        return (
                            <div
                                key={`${dayKey}-${index}`}
                                className="bg-white rounded-2xl mb-10 transition-all duration-300 overflow-hidden"
                                data-aos="fade-in"
                                data-aos-delay={index * 100}
                            >
                                {/* Time */}
                                <div className="flex items-center gap-2 px-4 sm:px-6 pt-4">
                                    <FaRegClock className="text-gray-900 w-4 h-4" />
                                    <span className="text-sm font-medium text-gray-900">{a.time || '—'}</span>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-6">
                                    <div className="mb-4 flex gap-4">
                                        <div className={`w-12 h-12 rounded-full border border-current ${color} flex items-center justify-center flex-shrink-0`}>
                                            {icon}
                                        </div>
                                        <div className='flex flex-col'>
                                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                                {a.activity}{a.location && <span className="text-gray-600"> ({a.location})</span>}
                                            </h3>
                                            {a.description && <p className="text-sm text-gray-600">{a.description}</p>}
                                            {a.durationMinutes && (
                                                <p className="text-sm text-gray-600 mt-1">Duration: {a.durationMinutes} mins</p>
                                            )}
                                        </div>
                                    </div>

                                    {a.image && (
                                        <div className="mb-4 rounded-xl overflow-hidden">
                                            <img src={a.image} alt={a.activity} className="w-full h-48 sm:h-64 object-cover" />
                                        </div>
                                    )}

                                    {Array.isArray(a.images) && a.images.length > 0 && (
                                        <div className={`grid gap-2 mb-4 ${a.images.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
                                            {a.images.map((img, i) => (
                                                <div key={i} className="rounded-lg overflow-hidden">
                                                    <img
                                                        src={img}
                                                        alt={`${a.activity} ${i + 1}`}
                                                        className="w-full h-24 sm:h-32 object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-3 text-sm">
                                        {a.outfit && (
                                            <div className="flex items-center gap-2 text-gray-900">
                                                <div className='p-2 rounded-lg bg-gray-100 text-gray-900'>
                                                    <FaTshirt className="w-5 h-5 text-gray-600" />
                                                </div>
                                                <span>Outfit: {a.outfit}</span>
                                            </div>
                                        )}
                                        {wText && (
                                            <>
                                                <hr className='text-gray-200' />
                                                <div className="flex items-center gap-2 text-gray-900">
                                                    <div className='p-2 rounded-lg bg-gray-100 text-gray-900'>
                                                        <FaSun className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                    <span>Weather: {a.weather.summary}, {a.weather.tempC}<sup>o</sup>C  </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex sm:flex-row flex-col px-4 sm:px-6 gap-2 pb-4">
                                    <button
                                        onClick={() => router('/edit', { state: { dayKey, index } })}
                                        className="flex-1 py-3 sm:py-4 text-center text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-semibold text-sm rounded-lg sm:text-base border border-blue-500 cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openConfirm(index, a.activity)}
                                        className="flex-1 py-3 sm:py-4 text-center bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 font-semibold text-sm rounded-lg sm:text-base cursor-pointer"
                                    >
                                        Skip
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {activities.length === 0 && (
                        <div className="text-center text-gray-600 py-12">
                            No activities left for this day.
                        </div>
                    )}
                </div>
            </section>

            {/* Confirmation Modal */}
            <ConfirmSkipModal
                open={confirm.open}
                dayKey={dayKey}
                activityTitle={confirm.title}
                onCancel={closeConfirm}
                onConfirm={confirmSkip}
            />
        </div>
    );
}

function ConfirmSkipModal({ open, dayKey, activityTitle, onCancel, onConfirm }) {
    const cancelRef = useRef(null);

    useEffect(() => {
        if (open && cancelRef.current) cancelRef.current.focus();
        const onKey = (e) => e.key === 'Escape' && onCancel();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={onCancel} />

            {/* Dialog */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-skip-title"
                className="relative w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
            >
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <FaExclamationTriangle className="w-5 h-5" />
                        </div>
                        <h3 id="confirm-skip-title" className="text-lg font-semibold text-gray-900">
                            Skip activity?
                        </h3>
                    </div>

                    <p className="mt-3 text-sm text-gray-600">
                        You’re about to remove <span className="font-medium">“{activityTitle || 'this activity'}”</span> from <span className="font-medium">{dayKey}</span>.
                        You can't add this manually later.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            ref={cancelRef}
                            onClick={onCancel}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 cursor-pointer transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer transition-all"
                        >
                            Skip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DayDetails;
