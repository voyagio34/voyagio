import './App.css'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
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
import Itinerary from './pages/GenerateItinerary'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AuthRoutes from './components/AuthRoutes'
import ProtectedRoutes from './components/ProtectedRoutes'
import Profile from './pages/Profile'
import GenerateItinerary from './pages/GenerateItinerary'
import toast, { Toaster } from 'react-hot-toast';
import BlogList from './pages/Blogs'
import { PlanProvider } from './contexts/PlanContext'

// Create a separate component for the app content
function AppContent() {
  const { session } = useAuth();
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 700,
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
      <div className='bg-gray-50 pt-16 text-gray-900 overflow-x-hidden'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/features' element={<Features />} />
          <Route path='/about' element={<About />} />
          <Route path='/contactus' element={<Contact />} />
          <Route path='/blog' element={<BlogList />} />
          <Route path='/blog/:id' element={<BlogDetails />} />
          <Route path='/travelhub' element={<TravelHub />} />
          <Route path='/plan' element={<PlanDetails />} />
          <Route path='/yoursmart' element={<YourSmart />} />
          <Route path='/day' element={<DayDetails />} />
          <Route path='/edit' element={<EditDay />} />
          <Route path='/privacy' element={<PrivacyPage />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route path='/generate-itinerary' element={<GenerateItinerary />} />
          <Route path='/generated-plans' element={
            <ProtectedRoutes>
              <GeneratedPlans />
            </ProtectedRoutes>
          } />
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
        <Toaster
          position="top-center"
          gutter={10}
          containerStyle={{
            top: '6rem', // push it down ≈72px to sit below navbar
          }}
          toastOptions={{
            className:
              "rounded-2xl text-lg shadow-lg backdrop-blur-md border border-white/20 !text-slate-800",
            style: {
              background: "rgba(255,255,255,0.95)",
              color: "#0f172a", // slate-900,
            },
            duration: 4000,
            success: {
              iconTheme: { primary: "#2563eb", secondary: "#ffffff" }, // blue-600
              className:
                "border-blue-200/70 bg-white [&>div]:font-semibold",
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#ffffff" }, // red-500
              className: "border-red-200/70 bg-white",
              duration: 5000,
            },
            loading: {
              className: "border-blue-200/70 bg-white",
              duration: Infinity,
            },
          }}
        />
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
        <PlanProvider>
          <AppContent />
        </PlanProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App