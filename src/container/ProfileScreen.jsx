import { useEffect, useRef, useState } from 'react';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, logoutFailure, logoutStart, logoutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/slices/authSlice';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase/firebase'

const ProfileScreen = () => {

  const { currentUser, updateLoading, logoutLoading, deleteLoading } = useSelector( state => state.user)
  const userId = currentUser?._id
  const fileRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: currentUser?.name,
    email: currentUser?.email,
    password: "",
    image: ""
  });

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    if (file) {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      }, (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) => setFormData({ ...formData, image: downloadURL }) )
      })
    }
  }, [file])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/users/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const data = await res.json()
        dispatch(updateUserSuccess(data.newUser))
        toast.success(data.message, { theme: "colored" });
      } else {
        const data = await res.json()
        dispatch(updateUserFailure(data.message))
        toast.error(data.message, { theme: "colored" } );
      }

    } catch (error) {
      toast.error(error?.message || error, { theme: "colored" })
    }
  }


  //DELETE
  const handleDelete = async (e) => {
    e.preventDefault()

    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/users/profile/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      if (res.ok) {
        const data = await res.json()
        dispatch(deleteUserSuccess(data.message))
        toast.success(data.message, { theme: "colored" });
        navigate('/')
      } else {
        const data = await res.json()
        dispatch(deleteUserFailure(data.message))
        toast.error(data.message, { theme: "colored" });
      }
    } catch (error) {
      dispatch(deleteUserFailure(error))
      toast.error(error?.message || error, { theme: "colored" })
    }
  }

  //SignOut
  const handleSignOut = async (e) => {
    e.preventDefault()

    try {
      dispatch(logoutStart())
      const res = await fetch('/api/users/logout')

      if (res.ok) {
        const data = await res.json()
        dispatch(logoutSuccess(data.message))
        toast.success(data.message);
      }

    } catch (error) {
      dispatch(logoutFailure(error))
    }
  }

  return (
    <section className=" max-w-2xl mx-auto">
      <div className='px-10 py-16 flex flex-col gap-7'>

        <input type="file" hidden ref={fileRef} accept='image/*' onChange={ (e) => setFile(e.target.files[0]) } />
        <img 
          src={ formData.image || currentUser?.image } 
          alt="Profile" onClick={ () => fileRef.current.click() } 
          className='w-14 h-14 rounded-full mx-auto object-cover cursor-pointer' 
        />

        <p className=' text-sm self-center font-semibold'>
        {
          fileUploadError ? <span className=' text-red-600'>Error Uploading Image</span> 
            : filePerc > 0 && filePerc < 100 ? <span className=' text-teal-900'>Uploading { filePerc }%</span> 
            : filePerc === 100 ? <span className=' text-blue-600'>Image Successfully Uploaded</span>
            : ''
        }
        </p>
        
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
            disabled={ updateLoading }
            type='submit' 
            className={`${ updateLoading ? 'bg-gray-400' : 'bg-blue-800'} hover:bg-blue-500 transition-all text-white py-2 rounded-md font-semibold flex items-center gap-2 justify-center`}
          >
            { updateLoading ? 'Updating...' : 'Update Profile' } <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </button>
        </form>

        <div className='flex items-center justify-between'>
          <form onSubmit={handleDelete}>
            <input 
              type="hidden" 
              name="id" 
            />
            <button 
              disabled={ deleteLoading }
              className='flex items-center gap-2 bg-red-800 hover:bg-red-500 transition-all text-white py-2 px-6 sm:px-8 rounded-md font-semibold '
            >
              {deleteLoading ? 'Deleting...' : 'Delete'} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </button>
          </form>

          <form onSubmit={handleSignOut}>
            <input 
              type="hidden" 
              name="id" 
            />
            <button 
              disabled={ logoutLoading }
              className='flex items-center gap-2 bg-red-800 hover:bg-red-500 transition-all text-white py-2 px-6 sm:px-8 rounded-md font-semibold '
            >
              {logoutLoading ? 'Signing Out...' : 'Sign Out'} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ProfileScreen