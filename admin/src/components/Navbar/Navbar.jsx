import { asserts } from '../../assets/asserts'
import './Navbar.css'
import { RiAdminLine } from "react-icons/ri";

export default function Navbar() {
  return (
    <div className="navbar">
        <div className='logoWrapper'>
        <img className='logo' src={asserts.logo} alt="logo" />
        <p>Admin Panel</p>
        </div>
        <RiAdminLine className='admin-logo'/>
    </div>
  )
}
