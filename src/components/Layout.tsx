
import NavbarComponent from './Navbar'
import FooterComponent from './Footer'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
        <NavbarComponent/>
        <Outlet/>
        <FooterComponent/>
    </>
  )
}

export default Layout
