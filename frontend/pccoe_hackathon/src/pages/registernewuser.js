import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerNewUser } from '../services.js'
import '../styles-pages/registernewuser.css'

function Createacc() {
  const [formdata, setformdata] = useState({
    username: '',
    password: '',
    confirmpassword: '',
  })

  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function handlechange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }

  async function handlesubmit(e) {
    e.preventDefault()

    if (formdata.password !== formdata.confirmpassword) {
      setMessage('Passwords do not match!')
      return
    }

    console.log('Form data before sending:', formdata)

    try {
      await registerNewUser(formdata)
      alert('Registration Successful')
      navigate('/')
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setMessage('User already exists!')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className='createaccdiv'>
      <h1 className='createaccheader'>Create an Account</h1>
      {message && <p className='error-message'>{message}</p>}
      <form className='create-new-form' onSubmit={handlesubmit}>
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
          placeholder='Password'
          value={formdata.password}
          onChange={handlechange}
          required
        />
        <input
          type='password'
          name='confirmpassword'
          placeholder='Confirm Password'
          value={formdata.confirmpassword}
          onChange={handlechange}
          required
        />

        <button type='submit' className='signupbutton'>
          Sign up
        </button>
      </form>
    </div>
  )
}

export { Createacc }
