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
import { useEffect, useState } from 'react'
import YourSmart from './pages/YourSmart'
import BlogDetails from './pages/BlogDetails'
import PlanDetails from './pages/PlanDetails'
import DayDetails from './pages/DayDetails'
import EditDay from './pages/EditDay'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import Itinerary from './pages/Itinerary'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AuthRoutes from './components/AuthRoutes'
import ProtectedRoutes from './components/ProtectedRoutes'
import Profile from './pages/Profile'

// Create a separate component for the app content
function AppContent() {
  const { session } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 0,
      delay: 0,
      easing: 'ease-in-out',
    });
  }, []);

  // // Show loading screen while auth is loading
  // if (loading) {
  //   return (
  //     <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
  //       <div className="flex flex-col items-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  //         <p className="mt-4 text-gray-600">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Navbar />
      <div className='bg-gray-50 text-gray-900 overflow-x-hidden'>
        <Routes>
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
          <Route path='/itinerary' element={<Itinerary />} />
          <Route path='/profile' element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          } />

          <Route path='/signin' element={
            <AuthRoutes>
              <SignIn />
            </AuthRoutes>
          } />
          <Route path='/signup' element={
            <AuthRoutes>
              <SignUp />
            </AuthRoutes>
          } />
        </Routes>
        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}

// Main App component
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App