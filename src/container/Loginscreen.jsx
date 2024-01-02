import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import loginImage from '../assets/screenImage.jpg'
import authLogo from '../assets/authLogo.png'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/slices/authSlice'
import { useSelector } from 'react-redux';
import GoogleOAuth from '../components/GoogleOAuth';

const Loginscreen = () => {
  const dispatch = useDispatch()
  const {loading, error} = useSelector( state => state.user )
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000';

  const [formData, setFormDate] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormDate((prev) => {
      return {
        ...prev,
        [name] : value
      }
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(signInStart())
      const res = await fetch(`${backendUrl}/api/users/auth`, {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      }) 

      if (res.ok) {
        const data = await res.json()
        toast.success(data.message, { theme: "colored" });
        dispatch(signInSuccess(data.userNoPassword))
        navigate('/home')
      } else {
        const data = await res.json()
        dispatch(signInFailure(data.message))
        toast.error(data.message, { theme: "colored" });
      }
      
    } catch (error) {
      toast.error(error?.message || 'An error occurred during login', { theme: "colored" })
      dispatch(signInFailure(error?.message))
    }
  }
  
  return (
    <div className="flex">
      <div className="w-full md:w-1/2 xl:w-1/4 flex flex-col gap-8 px-10 py-16">
        <div className='flex flex-col gap-3'>
          <Link to={'/'}>
            <img src={authLogo} alt="Auth Logo" className=' w-20' />
          </Link>
          <h1 className='text-3xl font-semibold'>Log in to your account</h1>
          <h2 className='text-lg font-semibold'>Don't have an account? <span><Link to={'signup'} className='text-blue-400 hover:text-blue-800 transition-all hover:border-b-2 border-blue-800'>Sign Up</Link></span></h2>
        </div>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
          <input 
            type="email" 
            name="email" 
            placeholder='Email'
            className='p-2 rounded-md border-black border-2 font-semibold '
            value={formData.email}
            onChange={handleChange}
          />

          <input 
            type="password" 
            name="password" 
            placeholder='Password'
            className='p-2 rounded-md border-black border-2 font-semibold '
            value={formData.password}
            onChange={handleChange}
          />

          <button 
            disabled={ loading }
            type='submit' 
            className={`${ loading ? 'bg-gray-400' : 'bg-blue-800'}  hover:bg-blue-500 transition-all text-white py-2 rounded-md font-semibold flex items-center gap-2 justify-center`}
          >
            { loading ? 'Logging in ...' : 'Login'} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </button>

          <GoogleOAuth />
        </form>
      </div>

      <div className="hidden md:block md:w-1/2 xl:w-3/4 min-h-screen">
        <img src={loginImage} alt="Login Image" className='w-full h-full' />
      </div>
    </div>
  )
}

export default Loginscreen