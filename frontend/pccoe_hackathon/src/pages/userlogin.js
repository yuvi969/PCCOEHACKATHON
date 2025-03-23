import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services.js'
import '../styles-pages/userlogin.css'

function Userlogin({ onLogin }) {
  const [formdata, setformdata] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate()

  function handlechange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }

  async function handlesubmit(e) {
    e.preventDefault()
    try {
      await login(formdata)
      navigate('/homepage')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='loginstudentdiv'>
      <h1 className='loginstudentheader'>User Login</h1>
      <form className='login-student-form' onSubmit={handlesubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={formdata.username}
          onChange={handlechange}
          required
        />
        <input
          type='password'
          name='password'
          value={formdata.password}
          placeholder='Password'
          onChange={handlechange}
          required
        />
        <button type='submit' className='studentloginbuttonn'>
          Log in
        </button>
      </form>
    </div>
  )
}

export { Userlogin }
