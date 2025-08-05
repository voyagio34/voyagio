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

function App() {

  return (
    <BrowserRouter>
      <div className='bg-gray-50 text-gray-900 '>
        <Navbar />
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/features' element={<Features />} />
          <Route path='/about' element={<About />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <ScrollToTop/>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
