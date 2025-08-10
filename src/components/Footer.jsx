import React, { useEffect } from 'react'
import { FaInstagram, FaPhone, FaPhoneAlt, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaPhoneFlip } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Footer = () => {
  

  return (
    <>
      <footer className="bg-black text-white py-10 space-y-8 text-sm">
        {/* Top Row: Description and Navigation */}
        <div className="flex max-w-7xl px-4 mx-auto flex-col sm:px-6 lg:px-10 md:flex-row md:justify-between md:items-start gap-8">

          {/* Left: Description */}
          <div
            className='flex flex-col gap-6'
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <div className="flex-1">
              <p className="md::max-w-sm w-full text-gray-300">
                Dive into local recommendations for a truly authentic experience.
              </p>
            </div>

            {/* Center: Contact Section */}
            <div
              className="flex flex-col gap-2 text-gray-300"
              data-aos="fade-right"
              data-aos-delay="200"
            >
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
          <div
            className="flex-1 flex flex-wrap justify-start md:justify-end gap-x-6 gap-y-2 text-gray-400"
            data-aos="fade-in"
            data-aos-duration="600"
          >
            <Link
              to="/"
              className="hover:text-white transition-all"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="hover:text-white transition-all"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="hover:text-white transition-all"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              About
            </Link>
            <Link
              to="/contactus"
              className="hover:text-white transition-all"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Contact Us
            </Link>
            <Link
              to="/terms"
              className="hover:text-white transition-all"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="hover:text-white transition-all"
              data-aos="fade-up"
              data-aos-delay="250"
            >
              Privacy Policy
            </Link>
            <Link
              to="/affiliate"
              className="hover:text-white transition-all"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              (Affiliate Disclosure)
            </Link>
          </div>
        </div>

        <hr
          className='text-gray-700 mb-6'
          data-aos="fade-in"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-20 flex flex-col sm:flex-row sm:justify-between justify-start sm:items-center items-start gap-4">
          {/* Copyright */}
          <p
            className="text-gray-400"
            data-aos="fade-up"
          >
            © 2025 Travila Inc. All rights reserved.
          </p>

          {/* Social Links */}
          <div
            className="flex items-center gap-4 text-white"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="text-gray-300">Follow us :</span>
            <a
              href="#"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <FaYoutube className='w-5 h-5 hover:text-white text-gray-300 transition-all' />
            </a>
            <a
              href="#"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <FaInstagram className='w-5 h-5 hover:text-white text-gray-300 transition-all' />
            </a>
            <a
              href="#"
              data-aos="zoom-in"
              data-aos-delay="250"
            >
              <FaTiktok className='w-5 h-5 hover:text-white text-gray-300 transition-all' />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer