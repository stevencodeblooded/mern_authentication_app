import { Link } from 'react-router-dom'
import logo from '../assets/authLogo.png'
import profilePic from '../assets/profile_pic.jpeg'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { currentUser } = useSelector( state => state.user )
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const timeoutRef = useRef(null);

  const showDropdown = () => {
    clearTimeout(timeoutRef.current);
    setShowProfileDropDown(true);
  };

  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setShowProfileDropDown(false);
    }, 300);
  };


  const handleLogOut = (e) => {
    e.preventDefault()

    toast.success('Signed User Out');
  }

  return (
    <div className='bg-blue-800'>
      <section className="max-w-4xl mx-auto">
        <div className="px-5 py-6 flex items-center justify-between">
          <Link to={'/'}>
            <img src={logo} alt="Logo" className=' w-10 sm:w-14 hover:opacity-85' />
          </Link>
          <ul className='font-semibold text-white flex items-center gap-10'>
            <li><Link to={'home'} className=' hover:opacity-85'>Home</Link></li>
            <li><Link to={'about'} className=' hover:opacity-85'>About</Link></li>
            <li className='relative'>
              <img 
                src={currentUser?.image} 
                onMouseEnter={ showDropdown }
                onMouseLeave={ hideDropdown }
                onClick={() => setShowProfileDropDown(!showProfileDropDown)}
                alt="user profile" 
                className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover cursor-pointer' 
              />

              { showProfileDropDown && (
                <div className='absolute top-12 right-1' onMouseEnter={ showDropdown } onMouseLeave={ hideDropdown } >
                  <div className='bg-blue-600 px-3 py-6 rounded-md shadow shadow-blue-900 w-72'>
                    <div className='flex flex-col gap-6'>
                      <div className='flex items-center gap-2'>
                        <img src={currentUser.image} alt="profile" className='w-12 h-12 rounded-full' />
                        <div>
                          <h3 className='text-md font-semibold'>{ currentUser.name }</h3>
                          <p className='text-sm font-normal'>{ currentUser.email }</p>
                        </div>
                      </div>
                      <form onSubmit={handleLogOut}>
                        <input type="hidden" name="id" />
                        <button 
                          className='flex items-center justify-center gap-3 bg-red-900 hover:bg-red-700 transition-all text-white py-2 rounded-md font-semibold w-full'
                        >
                          Logout <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </button>
                      </form>

                      <hr className='border border-blue-950' />
                      <div className='flex flex-col gap-2'>
                        <Link to={'profile'} onClick={() => setShowProfileDropDown(false)}>Profile</Link>
                        <Link to={'referral'} onClick={() => setShowProfileDropDown(false)}>Refer a Friend</Link>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Navbar