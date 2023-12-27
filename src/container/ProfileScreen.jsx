import { useState } from 'react';
import profile from '../assets/profile_pic.jpeg'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProfileScreen = () => {

  const { currentUser } = useSelector( state => state.user)

  const navigation = useNavigation()
  const state = navigation.state
  const [formData, setFormDate] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormDate((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userId = '658c310c741a12bc81b67deb'

    try {
      const res = await fetch(`http://localhost:5000/api/users/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const data = await res.json()
        toast.success(data.message, { theme: "colored" });
      } else {
        const data = await res.json()
        toast.error(data.message, { theme: "colored" } );
      }

    } catch (error) {
      toast.error(error?.message || error, { theme: "colored" })
    }
  }


  //DELETE
  const handleDelete = async (e) => {
    e.preventDefault()

    const userId = '658c310c741a12bc81b67d'

    try {
      const res = await fetch(`http://localhost:5000/api/users/profile/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      if (res.ok) {
        const data = await res.json()
        toast.success(data.message, { theme: "colored" });
      } else {
        const data = await res.json()
        toast.error(data.message, { theme: "colored" });
      }
    } catch (error) {
      toast.error(error?.message || error, { theme: "colored" })
    }

  }

  //SignOut
  const handleSignOut = (e) => {
    e.preventDefault()

    toast.success('Signed User Out');

  }

  return (
    <section className=" max-w-2xl mx-auto">
      <div className='px-10 py-16 flex flex-col gap-7'>
        <img src={ profile } alt="Profile" className='w-14 h-14 rounded-full mx-auto object-cover cursor-pointer' />
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 '>
          <input 
            type="text" 
            name="name" 
            placeholder='Name' 
            value={formData.name}
            onChange={handleChange}
            className='p-2 rounded-md border-black border-2 font-semibold'
          />

          <input 
            type="email" 
            name="email" 
            placeholder='Email' 
            value={formData.email}
            onChange={handleChange}
            className='p-2 rounded-md border-black border-2 font-semibold'
          />

          <input 
            type="password" 
            name="password" 
            placeholder='Password' 
            value={formData.password}
            onChange={handleChange}
            className='p-2 rounded-md border-black border-2 font-semibold'
          />

          <button 
            disabled={state  === 'submitting' }
            type='submit' 
            className='bg-blue-800 hover:bg-blue-500 transition-all text-white py-2 rounded-md font-semibold flex items-center gap-2 justify-center'
          >
            {state === 'submitting' ? 'Updating...' : 'Update Profile' } <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </button>
        </form>

        <div className='flex items-center justify-between'>
          <form onSubmit={handleDelete}>
            <input 
              type="hidden" 
              name="id" 
            />
            <button 
              disabled={ state === 'submitting' }
              className='flex items-center gap-2 bg-red-800 hover:bg-red-500 transition-all text-white py-2 px-6 sm:px-8 rounded-md font-semibold '
            >
              {state === 'submitting' ? 'Deleting...' : 'Delete'} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </button>
          </form>

          <form onSubmit={handleSignOut}>
            <input 
              type="hidden" 
              name="id" 
            />
            <button 
              disabled={ state === 'submitting' }
              className='flex items-center gap-2 bg-red-800 hover:bg-red-500 transition-all text-white py-2 px-6 sm:px-8 rounded-md font-semibold '
            >
              {state === 'submitting' ? 'Signing Out...' : 'Sign Out'} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ProfileScreen