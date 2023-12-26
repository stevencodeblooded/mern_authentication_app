import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import loginImage from '../assets/screenImage.jpg'
import authLogo from '../assets/authLogo.png'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

const Loginscreen = () => {
  const navigate = useNavigate()
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
      const res = await fetch('http://localhost:5000/api/users/auth', {
        method: "POST", 
        ContentType: "Application/JSON",
        body: JSON.stringify({formData})
      }) 
  
      const data = await res.json()
      console.log(data);
  
      navigate('/profile')
    } catch (error) {
      toast.error(error?.message || error)
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
          <h2 className='text-lg font-semibold'>Don't have an account? <span><Link to={'signup'} className='text-blue-400 hover:text-blue-800 transition-all'>Sign Up</Link></span></h2>
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
            type='submit' 
            className='bg-blue-800 hover:bg-blue-500 transition-all text-white py-2 rounded-md font-semibold flex items-center gap-2 justify-center'
          >
            Login <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </button>

          <button 
            type='button' 
            className='bg-red-800 hover:bg-red-500 transition-all text-white py-2 rounded-md font-semibold flex items-center gap-2 justify-center'
          >
              Continue with Google <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </button>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2 xl:w-3/4 min-h-screen">
        <img src={loginImage} alt="Login Image" className='w-full h-full' />
      </div>
    </div>
  )
}

export default Loginscreen