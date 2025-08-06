import React, { useState } from 'react'
import { FaEnvelope, FaEye, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <section className="relative min-h-screen px-4 py-16 sm:px-6 lg:px-8 w-full" data-aos="fade-in">
      <div 
        className="relative max-w-7xl mx-auto bg-white overflow-x-hidden rounded-2xl shadow-lg sm:px-10 px-6 py-20 w-full text-center"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        {/* Decorative Circles */}
        <div 
          className="absolute sm:block hidden top-20  w-46 h-46 bg-gray-100 rounded-full z-0"
          data-aos="fade-right"
          data-aos-duration="1500"
        />
        <div 
          className="absolute top-2 sm:right-4 w-50 h-50 bg-gray-100 rounded-full z-0"
          data-aos="fade-left"
          data-aos-duration="1500"
        />
        <div 
          className="absolute sm:block hidden bottom-20 right-20 w-26 h-26 bg-blue-500/50 rounded-full z-0"
          data-aos="fade-left"
          data-aos-delay="500"
        />
        <div 
          className="absolute bottom-10 sm:left-10 right-10 w-20 h-20 bg-blue-100 rounded-full z-0"
          data-aos="fade-right"
          data-aos-delay="300"
        />

        {/* Content */}
        <div className="relative z-10 mb-10 max-w-lg mx-auto">
          <h2 
            className="sm:text-5xl text-4xl font-medium text-gray-900 mb-1"
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            Welcome back!
          </h2>
          <p 
            className="text-gray-500 mb-8 text-lg font-light"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Enter your details to sign in
          </p>

          <form className="space-y-4 mt-20 max-w-md mx-auto">
            {/* Email */}
            <div 
              className="flex items-center border border-gray-300 rounded-lg px-4 py-3"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <FaEnvelope className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent h-8 outline-none text-gray-600"
              />
            </div>

            {/* Password */}
            <div 
              className="flex items-center border border-gray-300 rounded-lg px-4 py-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <FaLock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full bg-transparent h-8 outline-none text-gray-600"
              />
              <FaEye className="w-5 h-5 cursor-pointer text-gray-400" onClick={() => setShowPass(!showPass)} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-10 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all cursor-pointer font-semibold"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Sign in
            </button>
          </form>

          {/* Footer Link */}
          <p 
            className="mt-6 text-sm text-gray-500"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Don't have an account?{' '}
            <Link to="/signup" className="text-black font-medium underline cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignIn