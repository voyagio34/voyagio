import React, { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useNavigate();

    useEffect(() => {
        // Handle scroll effect
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        setIsMenuOpen(false)
        window.scrollTo(0, 0);

    }, [location])

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'Itinerary', href: '#' }
    ]

    return (
        <nav className={`w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-2xl py-2' : 'bg-white/95 backdrop-blur-md shadow-lg py-2'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <img src='/icon.png' alt='LOGO' />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="relative text-gray-600 hover:text-gray-900 font-semibold transition-all duration-300 group"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link to="/" className="px-6 py-2.5 text-gray-600 font-semibold transition-all duration-300 transform hover:text-gray-900">
                            Download App
                        </Link>
                        <Link to="/signup" className="px-10 py-3  bg-blue-500 hover:bg-blue-600 rounded-full text-gray-50  font-semibold transition-colors duration-300">
                            Sign Up
                        </Link>

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden ">
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
                <div className={`lg:hidden font-semibold transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                    <div className="py-4 w-auto space-y-2 bg-white/95 backdrop-blur-sm rounded-2xl ">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="block  px-6 py-3 text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 mx-2"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t w-auto border-gray-200 space-y-3 px-6">
                            <Link href="/" className="block w-full py-3 text-center bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg transition-all duration-300">
                                Download App
                            </Link>
                            <Link to="/signup" className="block w-full cursor-pointer text-center py-3 text-gray-50  transition-colors duration-300 bg-blue-500 hover:bg-blue-700 rounded-lg">
                                Sign up
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar