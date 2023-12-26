import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Loginscreen from "./container/Loginscreen"
import SignupScreen from "./container/SignupScreen"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProfileScreen from "./container/ProfileScreen";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Loginscreen />} />
        <Route path="signup" element={<SignupScreen />} />
        <Route element={<Layout />} >
          <Route path="profile" element={<ProfileScreen />} />
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
