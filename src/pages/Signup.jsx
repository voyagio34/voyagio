import { useEffect, useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser, FaUserAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase/Client'
import { useAuth } from '../contexts/AuthContext'

const SignUp = () => {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const { signUp } = useAuth();
  // useEffect(() => {
  //   if (!authLoading && user) navigate('/');
  // }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await signUp(formData.name, formData.email, formData.password);

      if (result.success) {
        alert('Registration successful!')
        setLoading(false)
        navigate('/')
      }
      else{
        setError(result.error)
      }

    } catch (error) {
      setError(error.message || 'An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen overflow-x-hidden px-4 py-16 sm:px-6 lg:px-8 w-full mt-10" data-aos="fade-in">
      <div
        className="relative max-w-7xl mx-auto overflow-x-hidden bg-white rounded-2xl shadow-lg sm:px-10 px-6 h-full py-20 w-full text-center"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        {/* Decorative Circles */}
        <div
          className="absolute sm:block hidden top-20 w-46 h-46 bg-gray-100 rounded-full z-0"
          data-aos="fade-right"
          data-aos-duration="1500"
        />
        <div
          className="absolute top-2 right-4 w-50 h-50 bg-gray-100 rounded-full z-0"
          data-aos="fade-left"
          data-aos-duration="1500"
        />
        <div
          className="absolute sm:block hidden bottom-20 right-20 w-26 h-26 bg-blue-500/50 rounded-full z-0"
          data-aos="fade-left"
          data-aos-delay="500"
        />
        <div
          className="absolute bottom-10 left-10 w-20 h-20 bg-blue-100 rounded-full z-0"
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
            Sign up to continue
          </h2>
          <p
            className="text-gray-500 mb-8 text-lg font-light"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Enter your details to sign up
          </p>



          <form className="space-y-4 mt-10 max-w-md mx-auto" onSubmit={handleSubmit}>
            {/* Name */}
            <div
              className="flex items-center border border-gray-300 rounded-lg px-4 py-3"

            >
              <FaUserAlt className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder='Enter your name'
                className='w-full bg-transparent h-8 outline-none text-gray-600'
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div
              className="flex items-center border border-gray-300 rounded-lg px-4 py-3"

            >
              <FaEnvelope className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-transparent h-8 outline-none text-gray-600"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div
              className="flex items-center border border-gray-300 rounded-lg px-4 py-3"

            >
              <FaLock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                className="w-full bg-transparent h-8 outline-none text-gray-600"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              {showPass ? (
                <FaEyeSlash
                  className="w-5 h-5 cursor-pointer text-gray-400"
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <FaEye
                  className="w-5 h-5 cursor-pointer text-gray-400"
                  onClick={() => setShowPass(!showPass)}
                />
              )}
            </div>
            {/* Error Message */}
            {error && (
              <div
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg"
                data-aos="fade-in"
              >
                {error}
              </div>
            )}
            {/* Submit */}
            <button
              type="submit"
              className={`w-full mt-2 py-3 rounded-lg font-semibold transition-all ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                } text-white`}

              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign up'}
            </button>
          </form>

          {/* Footer Link */}
          <p
            className="mt-6 text-sm text-gray-500"

          >
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