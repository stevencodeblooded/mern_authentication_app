import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const isLoggedIn = true
  return (
    <>
        { isLoggedIn ? <Outlet /> : <Navigate to={'/'} /> }
    </>
  )
}

export default ProtectedRoute