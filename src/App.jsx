import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Header'
import Features from './pages/Features'
import About from './pages/About'
import Contact from './pages/Contact'
import TravelHub from './pages/TravelHub'
import GeneratedPlans from './pages/GeneratedPlans'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'
import YourSmart from './pages/YourSmart'
import BlogDetails from './pages/BlogDetails'
import PlanDetails from './pages/PlanDetails'
import DayDetails from './pages/DayDetails'
import EditDay from './pages/EditDay'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import Itinerary from './pages/Itinerary'

function App() {
  useEffect(() => {
    AOS.init({

      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
      offset: 0, // Offset from the original trigger point
      delay: 0, // Delay before animation starts
      easing: 'ease-in-out', // Easing function
    });
  }, []);
  return (
    <BrowserRouter>
      <div className='bg-gray-50 text-gray-900 overflow-x-hidden '>
        <Navbar />
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/features' element={<Features />} />
          <Route path='/about' element={<About />} />
          <Route path='/contactus' element={<Contact />} />
          <Route path='/blog' element={<BlogDetails />} />
          <Route path='/travelhub' element={<TravelHub />} />
          <Route path='/generatedplans' element={<GeneratedPlans />} />
          <Route path='/plan' element={<PlanDetails />} />
          <Route path='/yoursmart' element={<YourSmart />} />
          <Route path='/day' element={<DayDetails />} />
          <Route path='/edit' element={<EditDay />} />
          <Route path='/privacy' element={<PrivacyPage />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route path='/itinerary' element={<Itinerary/>} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <ScrollToTop />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
