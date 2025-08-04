import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignIn from './pages/signin'
import SignUp from './pages/signup'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <BrowserRouter>
      <div className='bg-gray-50 text-gray-900 '>
        <Navbar />
        <Routes >
          <Route path='/' element={<Home />} />
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
