import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FaUserAlt } from 'react-icons/fa'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)
    const navigate = useNavigate();
    const location = useLocation();
    const { session, signOut } = useAuth();

    useEffect(() => {
        // Handle scroll effect]
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMenuOpen(false)
        setShowDropdown(false)
    }, [location.pathname])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = async () => {
        try {
            await signOut();
            console.log('SignOut completed');
            setShowDropdown(false);
            navigate('/signin');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/features' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
        { name: 'Contact Us', href: '/contactus' },
        { name: 'Itinerary', href: '/generated-plans' }
    ]


    return (
        <nav className={`w-full fixed top-0 z-50 transition-all duration-500 ${scrolled && !isMenuOpen ? 'bg-white shadow-lg py-0' : 'bg-white/90 backdrop-blur-md shadow-sm py-1'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center" data-aos="fade-down">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <img src='/icon.webp' alt='LOGO' className='w-46'/>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center xl:space-x-8 space-x-6">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="relative text-gray-600 hover:text-gray-900 font-semibold transition-all duration-300 group"
                                data-aos="fade-down"
                                data-aos-delay={i * 50}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden lg:flex items-center space-x-2">
                        <Link to="/yoursmart" className="px-4 py-2.5 text-gray-600 font-semibold transition-all duration-300 transform hover:text-gray-900" data-aos="fade-down" data-aos-delay="250">
                            Download App
                        </Link>
                        {!session ? (
                            <Link to="/signup" className="xl:px-10 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-gray-50 font-semibold transition-colors duration-300" data-aos="fade-down" data-aos-delay="300">
                                Sign Up
                            </Link>
                        ) : (
                            <div className="relative cursor-pointer" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex cursor-pointer items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors duration-300"
                                    data-aos="fade-down"
                                    data-aos-delay="300"
                                >
                                    <User className="w-5 h-5 text-gray-50" />
                                    <span className="text-gray-50 font-semibold">{session?.user?.user_metadata.name || session?.user?.email?.split('@')[0]}</span>
                                    <ChevronDown className={`w-4 h-4 text-gray-50 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute cursor-pointer transition-all right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{session?.user?.user_metadata.name || 'User'}</p>
                                            <p className="text-sm text-gray-500 truncate">{session?.user?.email}</p>
                                        </div>

                                        <Link
                                            to="/profile"
                                            onClick={() => setShowDropdown(false)}
                                            className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <User className="w-4 h-4 mr-3" />
                                            Profile
                                        </Link>


                                        <div className="border-t cursor-pointer border-gray-100 mt-2 pt-2">
                                            <button
                                                onClick={handleLogout}
                                                className="flex cursor-pointer items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 mr-3" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden" data-aos="fade-down">
                        <span
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 bg-transparent cursor-pointer rounded-lg hover:bg-gray-100 transition-colors duration-500"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-gray-600" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-600" />
                            )}
                        </span>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden font-semibold transition-all duration-400 ease-in-out ${isMenuOpen ? 'h-screen opacity-95 mt-4' : 'h-0 opacity-0 overflow-hidden'}`}>
                    <div className="py-4 w-auto space-y-2 backdrop-blur-sm rounded-2xl">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="block px-6 py-3 text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 mx-2"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t w-auto border-gray-200 space-y-3 px-6">
                            {
                                session?.user && (
                                    <div onClick={()=>navigate("/profile")} className='flex items-center'>
                                        <div className='border border-gray-500 p-3 rounded-full'>
                                            <User className='w-5 h-5 text-gray-500 ' />
                                        </div>
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{session?.user?.user_metadata.name || 'User'}</p>
                                            <p className="text-sm text-gray-500 truncate">{session?.user?.email}</p>
                                        </div>
                                    </div>
                                )
                            }

                            <Link to="/yoursmart" className="block w-full py-3 text-center bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg transition-all duration-300">
                                Download App
                            </Link>

                            {!session?.user ? (
                                <Link to="/signup" className="block w-full cursor-pointer text-center py-3 text-gray-50 transition-colors duration-300 bg-blue-500 hover:bg-blue-700 rounded-lg">
                                    Sign up
                                </Link>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    type="button"
                                    className="block w-full cursor-pointer text-center py-3 text-gray-50 transition-colors duration-300 bg-blue-500 hover:bg-blue-700 rounded-lg"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar