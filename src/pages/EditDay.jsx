import React, { useEffect, useMemo, useState } from 'react';
import { FaArrowLeftLong, FaImage, FaUpload } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePlan } from '../contexts/PlanContext';
import { uploadActivityImage } from '../lib/supabase/Storage';
import toast from 'react-hot-toast';

function EditDay() {
  const router = useNavigate();
  const { state } = useLocation();           // expects { dayKey, index }
  const { draftPlan, updateActivity } = usePlan();
  const [isUploading, setIsUploading] = useState(false)

  const dayKey = state?.dayKey || 'Day 1';
  const index = state?.index ?? 0;

  // Source: draft -> demo fallback
  const planData = draftPlan?.plan;
  const day = planData?.[dayKey];
  const activities = day?.activities || day?.Activities || [];
  const item = activities[index];

  // Parse a "time" like "08:30 PM - 09:30 PM" into start/end inputs
  const parseTime = (t = '') => {
    if (!t) return { startTime: '', endTime: '' };
    const parts = t.split('-').map(s => s.trim());
    if (parts.length === 2) return { startTime: parts[0], endTime: parts[1] };
    return { startTime: t.trim(), endTime: '' };
  };

  const parseWeatherInput = (weatherStr) => {
    if (!weatherStr || weatherStr.trim() === '') return undefined;
    
    // Parse the string to extract summary and temperature
    const parts = weatherStr.split(',').map(s => s.trim());
    const tempMatch = weatherStr.match(/(\d+)\s*°?\s*C/i); // Match temperature with or without degree symbol
    
    return {
      summary: parts[0] || 'Partly cloudy', // Default if no summary found
      tempC: tempMatch ? parseInt(tempMatch[1]) : 25 // Default temperature if not found
    };
  };

  const initial = useMemo(() => {
    const { startTime, endTime } = parseTime(item?.time || '');
    const weatherStr =
      typeof item?.weather === 'string'
        ? item.weather
        : item?.weather
          ? [item.weather.summary, item.weather.tempC !== undefined ? `${item.weather.tempC}°C` : '']
            .filter(Boolean)
            .join(', ')
          : '';

    return {
      title: item?.activity || '',
      startTime,
      endTime,
      location: item?.location || '',
      description: item?.description || '',
      outfit: item?.outfit || '',
      weather: weatherStr,
      durationMinutes: item?.durationMinutes ?? '',
      image: item?.image || null, 
    };
  }, [item]);

  const [formData, setFormData] = useState(initial);

  // If user navigates to edit a different activity without unmounting
  useEffect(() => setFormData(initial), [initial]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/^image\/(png|jpe?g|webp)$/i.test(file.type)) {
      alert("Please select a PNG, JPG, or WEBP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const { url /*, path*/ } = await uploadActivityImage(file, {
        // userId: user?.id,
        tripId: (draftPlan)?.id ?? "draft",
        activityKey: `${dayKey}-${index}`,
        isPublic: true, // bucket set to Public
      });

      setFormData((prev) => ({ ...prev, image: url }));
      toast.success("Uploaded")
      console.log(url)
      // OPTIONAL: show a toast here
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      console.log(formData.image)
      setIsUploading(false);
      // reset input value so the same file can be re-selected if needed
      // e.currentTarget.value = undefined;
    }
  };

  const buildTime = (start, end) => {
    const s = (start || '').trim();
    const e = (end || '').trim();
    if (s && e) return `${s} - ${e}`;
    if (s) return s;
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const activities = planData?.[dayKey]?.activities || planData?.[dayKey]?.Activities || [];
    if (!activities[index]) return;

    const currentTime = item?.time || '';
    const nextTime = buildTime(formData.startTime, formData.endTime);
    
    // Build patch; omit time if it didn't change (PlanContext preserves old time)
    const patch = {
      activity: formData.title,
      location: formData.location,
      description: formData.description,
      outfit: formData.outfit,
      durationMinutes:
        formData.durationMinutes === '' ? undefined : Number(formData.durationMinutes),
      weather: parseWeatherInput(formData.weather),   // Parse weather string back to object if needed
      image: formData.image || undefined,
      ...(nextTime !== currentTime ? { time: nextTime } : {}),
    };

    updateActivity(dayKey, index, patch);
    router(-1);
  };

  if (!item) {
    return (
      <div className='bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 min-h-screen mt-10'>
        <section className="relative max-w-2xl mx-auto bg-white shadow-lg w-full rounded-lg p-6">
          <button className="text-blue-600 mb-3" onClick={() => router(-1)}>&larr; Back</button>
          <p className="text-gray-700">Activity not found.</p>
        </section>
      </div>
    );
  }

  return (
    <div className='bg-gray-50  sm:px-4 sm:py-20 lg:px-8  min-h-screen'>
      <section
        className="relative max-w-7xl mx-auto py-8 sm:py-10 sm:px-4 px-2 bg-white shadow-lg w-full rounded-lg"
        data-aos="fade-in"
      >
        {/* Header */}
        <div className="flex md:flex-row flex-col md:justify-between gap-4 items-start p-4 mb-8">
          <FaArrowLeftLong
            className='w-6 h-6 text-gray-700 my-2 cursor-pointer duration-200 transition-all hover:-translate-x-1'
            onClick={() => router(-1)}
          />
          <div className='flex flex-col gap-2 md:items-center'>
            <h1 className='sm:text-4xl text-3xl text-gray-800 font-semibold'>Edit activity</h1>
            <span className='text-md text-gray-500 font-medium'>{dayKey}</span>
          </div>
          <div className='flex' />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter title"
              required
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="text"  /* keep text since your data uses AM/PM string */
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="08:30 PM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="text"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="09:30 PM"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter location"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Short description..."
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              min="0"
              name="durationMinutes"
              value={formData.durationMinutes}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., 90"
            />
          </div>

          {/* Image Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover" />
                ) : (
                  <FaImage className="w-10 h-10 text-blue-500" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Select picture to upload</h3>
              <p className="text-sm text-gray-500 mb-4">
                Supported formats: JPG, PNG, WEBP. Max 5MB.
              </p>

              <label className={`inline-flex items-center gap-2 px-6 py-2 rounded-full transition-colors cursor-pointer ${isUploading ? "bg-gray-400 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                {isUploading ? "Uploading..." : "Select"}
                <FaUpload className="w-4 h-4" />
              </label>
            </div>
          </div>

          {/* Outfit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Outfit
            </label>
            <input
              type="text"
              name="outfit"
              value={formData.outfit}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., Smart Casual"
            />
          </div>

          {/* Weather (stored as plain string) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weather
            </label>
            <input
              type="text"
              name="weather"
              value={formData.weather}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., Sunny, 26°C"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={() => router(-1)}
              className="flex-1 py-3 px-6 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 cursor-pointer py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Update changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditDay;