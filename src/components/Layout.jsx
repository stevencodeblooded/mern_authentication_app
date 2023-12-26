import { Outlet } from "react-router-dom"
import Footer from "../shared/Footer"
import Navbar from "../shared/Navbar"

const Layout = () => {
  return (
    <div className="min-h-screen">
        <Navbar />
        <Outlet />
        <div className=" sticky top-full">
            <Footer />
        </div>
    </div>
  )
}

export default Layout