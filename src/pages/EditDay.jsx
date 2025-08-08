import React, { useState } from 'react'
import { FaArrowLeft, FaArrowLeftLong, FaImage, FaUpload } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function EditDay() {
    const router = useNavigate();
    const [formData, setFormData] = useState({
        title: 'Dinner at PARK Distillery Restaurant',
        startTime: '08:30 PM',
        endTime: '09:30 PM',
        location: '19 Banff Ave, Banff, AB T1L 1A7, Canada.',
        outfit: '',
        weather: '',
        image: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };
    return (
        <div className='bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 min-h-screen mt-10' >
            <section
                className="relative max-w-7xl mx-auto py-10 sm:px-4 bg-white shadow-lg w-full rounded-lg"
                data-aos="fade-right"
            >
                <div
                    className="flex md:flex-row flex-col md:justify-between gap-4 items-start  p-4 mb-8"

                >
                    <FaArrowLeftLong className='w-6 h-6 flex-1/10 text-gray-700 my-2 cursor-pointer duration-200 transition-all hover:-translate-x-1' onClick={() => router('/day')} />

                    <div className='flex flex-8/10 flex-col gap-2 md:items-center'>
                        <h1 className='sm:text-4xl text-3xl text-gray-800 font-semibold'>Edit your day</h1>
                        <span className='text-md text-gray-500 font-medium'>Monday , June 30</span>
                    </div>
                    <div className='flex flex-1/10'>

                    </div>
                </div>

                {/* Form Content */}
                <div className="p-4 sm:p-6 lg:p-8 space-y-6">
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
                        />
                    </div>

                    {/* Time Fields */}
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"

                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Time
                            </label>
                            <input
                                type="text"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="00:00 AM/PM"
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
                                placeholder="00:00 AM/PM"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div  >
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

                    {/* Image Upload */}
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8"

                    >
                        <div className="text-center">
                            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <FaImage className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                Select picture to upload
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Supported format: PNG, JPG
                            </p>
                            <label className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors cursor-pointer">
                                <input
                                    type="file"
                                    accept=".png,.jpg,.jpeg"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                Select
                                <FaUpload className="w-4 h-4" />
                            </label>
                        </div>
                    </div>

                    {/* Outfit */}
                    <div  >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Outfit
                        </label>
                        <input
                            type="text"
                            name="outfit"
                            value={formData.outfit}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter outfit"
                        />
                    </div>

                    {/* Weather */}
                    <div >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Weather
                        </label>
                        <input
                            type="text"
                            name="weather"
                            value={formData.weather}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter weather"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div
                        className="flex flex-col sm:flex-row gap-4 pt-6"

                    >
                        <button className="flex-1 py-3 px-6 border-1 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-semibold cursor-pointer">
                            Cancel
                        </button>
                        <button className="flex-1 cursor-pointer py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                            Update changes
                        </button>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default EditDay
