
import { useState } from 'react'
import { FaEnvelope, FaEye, FaLock, FaUser, FaUserAlt } from 'react-icons/fa'
import { FaLetterboxd } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <section className="relative min-h-screen px-4 py-16 sm:px-6 lg:px-8 w-full">
      <div className="relative max-w-7xl mx-auto bg-white rounded-2xl shadow-lg sm:px-10 px-6 h-full py-20 w-full text-center">
        {/* Decorative Circles */}
        <div className="absolute sm:block hidden top-20 -left-2 w-46 h-46 bg-gray-100 rounded-full z-0" />
        <div className="absolute top-2 right-4 w-50 h-50 bg-gray-100 rounded-full z-0" />
        <div className="absolute sm:block hidden bottom-20 right-20 w-26 h-26 bg-blue-500/50 rounded-full z-0" />
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-100 rounded-full z-0" />

        {/* Content */}
        <div className="relative z-10 mb-10 max-w-lg mx-auto">
          <h2 className="sm:text-5xl text-4xl font-medium text-gray-900 mb-1">Sign up to continue</h2>
          <p className="text-gray-500 mb-8 text-lg font-light ">Enter your details to sign up</p>

          <form className="space-y-4 mt-10 max-w-md mx-auto">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
              <FaUserAlt className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder='Enter your name'
                className='w-full bg-transparent h-8 outline-none text-gray-600'
              />
            </div>

            {/* Email  */}
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
              <FaEnvelope className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent h-8 outline-none text-gray-600"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
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
              className="w-full mt-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all cursor-pointer font-semibold"
            >
              Sign up
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-6 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/signin" className="text-black font-medium underline cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>

  )
}

export default SignUp
