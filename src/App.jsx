import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Loginscreen from "./container/Loginscreen"
import SignupScreen from "./container/SignupScreen"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProfileScreen from "./container/ProfileScreen";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ReferralScreen from "./container/ReferralScreen";
import HomeScreen from "./container/HomeScreen";
import AboutScreen from "./container/AboutScreen";
import Error from "./components/Error";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Loginscreen />} />
        <Route path="signup" element={<SignupScreen />} />
        <Route element={<Layout />} >
          <Route element={<ProtectedRoute />}>
            <Route path="profile" errorElement={<Error />} element={<ProfileScreen />} />
            <Route path="referral" element={<ReferralScreen />} />
            <Route path="home" element={<HomeScreen />} />
            <Route path="about" element={<AboutScreen />} />
          </Route>
        </Route>
      </Route>
    )
  )
  return (
    <>
        <RouterProvider 
          router={router}
        />
        <ToastContainer />
    </>
  )
}

export default App
