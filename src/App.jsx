import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Loginscreen from "./container/Loginscreen"
import SignupScreen from "./container/SignupScreen"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProfileScreen from "./container/ProfileScreen";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Loginscreen />} />
        <Route path="signup" element={<SignupScreen />} />
        <Route element={<Layout />} >
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfileScreen />} />
          </Route>
        </Route>
      </Route>
    )
  )
  return (
    <>
      <Provider store={store}>
        <RouterProvider 
          router={router}
        />
        <ToastContainer />
      </Provider>
    </>
  )
}

export default App
