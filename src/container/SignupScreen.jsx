import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { useState } from 'react';
import loginImage from '../assets/screenImage.jpg'
import authLogo from '../assets/authLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signUpFailure, signUpStart, signUpSuccess } from '../redux/slices/authSlice';
import GoogleOAuth from '../components/GoogleOAuth';

const Loginscreen = () => {
  const { loading } = useSelector( state => state.user )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormDate] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  })

  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormDate((prev) => {
      return {
        ...prev,
        [name] : value
      }
    }),
    setErrors((prev) => {
      return {
        ...prev,
        [name]: ''
      }
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // Validate form fields
    const formErrors = {};
    if (!formData.name.trim()) {
      formErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      formErrors.password = 'Password is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      dispatch(signUpStart())
      const res = await fetch(`${backendUrl}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const data = await res.json()
        dispatch(signUpSuccess(data.newUser))
        toast.success(data.message, { theme: "colored" });
        navigate('/')
      } else {
        const data = await res.json()
        dispatch(signUpFailure(data.message))
        toast.error(data.message, { theme: "colored" });
      }

    } catch (error) {
      dispatch(signUpFailure(error))
      toast.error(error?.message || error, { theme: "colored" })
    }
  }
  
  return (
    <div className="flex min-h-screen">
      <div className="w-full bg-blue-100 md:w-1/2 xl:w-1/4 flex flex-col gap-8 px-10 py-16">
        <div className='flex flex-col gap-3'>
          <Link to={'/'}>
            <img src={authLogo} alt="Auth Logo" className='w-20' />
          </Link>
          <h1 className='text-3xl font-semibold'>Create your account</h1>
          <h2 className='text-lg font-semibold'>Have an account? <span><Link to={'/'} className='text-blue-400 hover:text-blue-800 transition-all hover:border-b-2 border-blue-800'>Log in now</Link></span></h2>
        </div>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col w-full'>
            <input 
              type="text" 
              name="name" 
              placeholder='Name'
              className='p-2 rounded-md border-black border-2 font-semibold '
              value={formData.name}
              onChange={handleChange}
            />
            <span className="text-red-500 font-semibold text-sm">{ errors?.name }</span>
          </div>

          <div className='flex flex-col w-full'>
            <input 
              type="email" 
              name="email" 
              placeholder='Email'
              className='p-2 rounded-md border-black border-2 font-semibold '
              value={formData.email}
              onChange={handleChange}
            />
            <span className="text-red-500 font-semibold text-sm">{ errors?.email }</span>
          </div>

          <div className='flex flex-col w-full'>
            <input 
              type="password" 
              name="password" 
              placeholder='Password'
              className='p-2 rounded-md border-black border-2 font-semibold '
              value={formData.password}
              onChange={handleChange}
            />
            <span className="text-red-500 font-semibold text-sm">{ errors?.password }</span>
          </div>
          
          <button
            disabled={ loading }
            type='submit' 
            className={`${ loading ? 'bg-gray-400' : 'bg-blue-800'}  hover:bg-blue-500 transition-all text-white py-2 rounded-md font-semibold flex items-center gap-2 justify-center`}
          >
            { loading ? 'Signing up...' : 'Sign up'} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
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