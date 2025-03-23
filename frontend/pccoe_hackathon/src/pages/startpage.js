import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import '../styles-pages/startpage.css'

function Startpage() {
  return (
    <>
      <div className='Homediv'>
        <h1 className='appname-header'>
          <FontAwesomeIcon icon={faHeart} className='heart-icon' />
          MediScan
          <FontAwesomeIcon icon={faHeart} className='heart-icon' />
        </h1>
        <div className='subtitle-container'>
          <h3>Everyone deserves good healthcare</h3>
        </div>
        <div className='buttoncontainer'>
          <Link to={'/userlogin'}>
            <button className='studentloginbutton'>Login</button>
          </Link>
        </div>
        <Link to={'/register'}>
          <p>New Account</p>
        </Link>
      </div>
    </>
  )
}

export { Startpage }
