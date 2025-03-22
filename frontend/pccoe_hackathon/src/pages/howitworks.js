import { FaUpload, FaSearch, FaCheckCircle } from 'react-icons/fa'
import '../styles-pages/howitworks.css'
import { Link } from 'react-router'

function HowItWorks() {
  return (
    <div className='info-container'>
      <h2>How It Works</h2>
      <p className='intro'>
        MediScan makes it easy to find affordable generic medicine alternatives.
        Follow these simple steps to get started:
      </p>
      <div className='steps'>
        <div className='step'>
          <FaUpload className='icon' />
          <h3>Upload</h3>
          <p>
            Drag & drop your prescription file or manually select it from your
            device. Our system supports JPG, PNG, and PDF formats.
          </p>
        </div>
        <div className='step'>
          <FaSearch className='icon' />
          <h3>Scan & Analyze</h3>
          <p>
            Our AI-powered system extracts text from the prescription,
            identifying medicine names, dosages, and other details.
          </p>
        </div>
        <div className='step'>
          <FaCheckCircle className='icon' />
          <h3>Get Affordable Alternatives</h3>
          <p>
            Based on the extracted information, we provide you with a list of
            generic medicine options that offer the same benefits at a lower
            cost.
          </p>
        </div>
      </div>
      <div className='cta-container'>
        <Link to='/upload-prescription'>
          <button className='start-btn'>Start Now</button>
        </Link>
        <Link to='/'>
          <button className='home-btn'>Back to Home</button>
        </Link>
      </div>
    </div>
  )
}

export { HowItWorks }
