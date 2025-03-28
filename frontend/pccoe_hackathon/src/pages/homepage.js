import { Link } from 'react-router'
import '../styles-pages/homepage.css'
import { useState, useEffect } from 'react'
import { logout } from '../services'

function Homepage() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'enabled'
  })

  const quotes = [
    '“It is health that is real wealth and not pieces of gold and silver.” — Mahatma Gandhi',
    '“To keep the body in good health is a duty… otherwise, we shall not be able to keep our mind strong and clear."-— Buddha',
    '“The greatest medicine of all is teaching people how not to need it..” — Hippocrates',
    '“The part can never be well unless the whole is well.” — Plato',
    '“Healing is a matter of time, but it is sometimes also a matter of opportunity.” — Hippocrates',
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem('userToken')
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Logout failed. Please try again.')
    }
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('darkMode', 'enabled')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('darkMode', 'disabled')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  return (
    <>
      <header className='homepage-header'>
        <div className='name-and-logo'>
          <img
            src='https://www.pngall.com/wp-content/uploads/2/Medicine-Pills-Background-PNG-Image.png'
            className='medicine-logo'
            alt='Logo'
          />
          <h2 className='appname'>MediScan</h2>
        </div>
        <nav className='nav-links'>
          <Link to='/upload-prescription'>Upload Prescription</Link>
          <Link to='/howitworks'>How it Works</Link>
          <Link to='/about'>About</Link>
          <Link to='/contacts'>Contacts</Link>
          <button className='toggle-dark-button' onClick={toggleDarkMode}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button className='logout-button' onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </header>

      <section className='hero-section'>
        <div className='overlay'></div>
        <div className='hero-content'>
          <h1>Scan Prescriptions & Get Affordable Medicine Alternatives</h1>
          <p>
            Easily upload your prescription and find cost-effective generic
            medicines with the same efficacy.
          </p>
          <div className='button-div'>
            <Link to={'/upload-prescription'}>
              <button className='cta-button'>Upload Prescription</button>
            </Link>
            <Link to={'/upload-manually'}>
              <button className='cta-button'>Upload Manually</button>
            </Link>
          </div>
        </div>
      </section>
      <footer className='homepage-footer'>
        <p>© {new Date().getFullYear()} MediScan. All rights reserved.</p>
        <div className='footer-links'>
          <Link to='/terms'>Terms & Conditions</Link>
          <Link to='/privacy'>Privacy Policy</Link>
          <Link to='/contacts'>Contact Us</Link>
        </div>
      </footer>
      <p className='footer-quote'>{quotes[currentQuoteIndex]}</p>
    </>
  )
}

export { Homepage }
