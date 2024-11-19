import { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../src/assets/assets.js'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { GoPerson } from "react-icons/go";
import { FiShoppingBag } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowlogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotal, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }
  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt="logo" className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === 'home' ? "active" : ""}>home</Link>
        <a href='/menu' onClick={() => setMenu("menu")} className={menu === 'menu' ? "active" : ""}>menu</a>
        <a href='/#app-download' onClick={() => setMenu("moblile-app")} className={menu === 'moblile-app' ? "active" : ""}>moblile-app</a>
        <a href='/#footer' onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? "active" : ""}>contact-us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'> <img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotal() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowlogin(true)}>sign in</button> :
          <div className='navbar-profile'>
            <GoPerson className='navbar-profile-logo' />
            <ul className="nav-profile-dropdown">
              <li onClick={()=> navigate('/myorders')}><FiShoppingBag /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><MdLogout /><p>Logout</p></li>
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default Navbar