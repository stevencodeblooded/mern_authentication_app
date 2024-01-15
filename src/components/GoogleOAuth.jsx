import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleSignInFailure, googleSignInStart, googleSignInSuccess } from "../redux/slices/authSlice";

const GoogleOAuth = () => {
    const dispatch = useDispatch()
    const { googleLoading } = useSelector(state => state.user)
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000';

    const handleGoogleClick = async () => {
        try {
          dispatch(googleSignInStart())
          const provider = new GoogleAuthProvider()
          const auth = getAuth(app)
          const result = await signInWithPopup(auth, provider)

          const res = await fetch(`${backendUrl}/api/users/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              name: result.user.displayName, 
              email: result.user.email, 
              image: result.user.photoURL
            })
          })
          
          if (res.ok) {
            const data = await res.json()
            dispatch(googleSignInSuccess(data.userAlreadyCreated || data.userNoPassword))
            console.log(data);
            toast.success(data.message, { theme: "colored" });
            navigate('/home')
          } else {
            const data = await res.json()
            dispatch(googleSignInFailure(data.message))
            console.log(data);
          }

        } catch (error) {
          toast.error('Could not login with Google', { theme: "colored" });
          dispatch(googleSignInFailure('Could not sign using Google'))
        }
      }

  return (
    <div className="flex flex-col">
        <button 
            type='button'
            disabled={ googleLoading }
            onClick={handleGoogleClick}
            className='bg-red-800 hover:bg-red-500 transition-all text-white py-2 rounded-md font-semibold flex items-center gap-2 justify-center'
          >
              { googleLoading ? 'Google Signing...' : 'Continue with Google'} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </button>
    </div>
  )
}

export default GoogleOAuth