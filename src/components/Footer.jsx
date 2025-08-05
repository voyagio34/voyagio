import React from 'react'
import { FaInstagram, FaPhone, FaPhoneAlt, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaPhoneFlip } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white px-6 md:px-12 py-10 space-y-8 text-sm">
        {/* Top Row: Description and Navigation */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">

          {/* Left: Description */}
          <div className='flex flex-col gap-6'>

            <div className="flex-1">
              <p className="md::max-w-sm w-full text-gray-300">
                Dive into local recommendations for a truly authentic experience.
              </p>
            </div>

            {/* Center: Contact Section */}
            <div className="flex flex-col gap-2 text-gray-300">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className='flex flex-row gap-2 items-center'>

                  <span><FaPhoneAlt /></span>
                  <span>Need help? Call us</span>
                </div>
                <span className="text-orange-500 text-lg font-semibold">1-800-222-8888</span>
              </div>
            </div>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex-1 flex flex-wrap justify-start md:justify-end gap-x-6 gap-y-2 text-gray-400">

            {/* <Link to="/company" className="hover:text-white transition-all">Company</Link> */}
            <Link to="/" className="hover:text-white transition-all">Home</Link>
            <Link to="/features" className="hover:text-white transition-all">Features</Link>
            <Link to="/about" className="hover:text-white transition-all">About</Link>
            <Link to="/contact" className="hover:text-white transition-all">Contact Us</Link>
            <Link to="/terms" className="hover:text-white transition-all">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-white transition-all">Privacy Policy</Link>
            <Link to="/affiliate" className="hover:text-white transition-all">(Affiliate Disclosure)</Link>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row sm:justify-between justify-start  sm:items-center items-start gap-4">
          {/* Copyright */}
          <p className="text-gray-400">© 2024 Travila Inc. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-white">
            <span className="text-gray-300">Follow us :</span>
            <a href="#"><FaYoutube className='w-5 h-5 hover:text-white text-gray-300 transition-all' /></a>
            <a href="#"><FaInstagram className='w-5 h-5 hover:text-white text-gray-300 transition-all' /></a>
            <a href="#"><FaTiktok className='w-5 h-5 hover:text-white text-gray-300 transition-all' /></a>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer
