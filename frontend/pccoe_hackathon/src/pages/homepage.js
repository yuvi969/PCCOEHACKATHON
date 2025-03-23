import { Link } from 'react-router'
import '../styles-pages/homepage.css'
import { useState, useEffect } from 'react'

function Homepage() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'enabled'
  })

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
    </>
  )
}

export { Homepage }
