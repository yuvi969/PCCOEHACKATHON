import { FaHeartbeat, FaGlobe, FaUsers, FaLightbulb } from 'react-icons/fa'
import '../styles-pages/aboutpage.css'

function About() {
  return (
    <div className='info-container'>
      <h2>About MediScan</h2>
      <div className='about-box'>
        <FaHeartbeat className='icon-large' />
        <p>
          MediScan helps users find affordable alternatives for prescribed
          medicines using AI-powered scanning.
        </p>
      </div>

      <div className='mission-section'>
        <h3>Our Mission</h3>
        <p>
          We aim to make healthcare more accessible by providing cost-effective
          medication alternatives, helping people save money without
          compromising on quality.
        </p>
      </div>

      <div className='values-container'>
        <div className='value-box'>
          <FaGlobe className='icon' />
          <h4>Accessibility</h4>
          <p>
            We believe everyone should have access to affordable medication.
          </p>
        </div>

        <div className='value-box'>
          <FaUsers className='icon' />
          <h4>Community</h4>
          <p>We work to empower individuals with knowledge about medicine.</p>
        </div>

        <div className='value-box'>
          <FaLightbulb className='icon' />
          <h4>Innovation</h4>
          <p>We leverage AI to simplify prescription scanning for users.</p>
        </div>
      </div>
    </div>
  )
}

export { About }
