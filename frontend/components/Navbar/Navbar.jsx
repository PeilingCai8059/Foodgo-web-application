import { useContext, useRef, useState } from 'react'
import './Navbar.css'
import { assets } from '../../src/assets/assets.js'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { GoPerson } from "react-icons/go";
import { FiShoppingBag } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { MdOutlineClear } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowlogin }) => {
  const { getTotal, token, setToken,menu, setMenu, setSearchString } = useContext(StoreContext);
  const navigate = useNavigate();
  const [searchFoodName, setSearchFoodName] = useState("");

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }
  function handleSearch(){
    setSearchString (searchFoodName);
  }

  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt="logo" className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === 'home' ? "active" : ""}>home</Link>
        <Link to='/menu' onClick={() => setMenu("menu")} className={menu === 'menu' ? "active" : ""}>menu</Link>
        <a href='/#app-download' onClick={() => setMenu("moblile-app")} className={menu === 'moblile-app' ? "active" : ""}>moblile-app</a>
        <a href='/#footer' onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? "active" : ""}>contact-us</a>
      </ul>
      <div className="navbar-right">
        <div className='navbar-search'>
          <input type="text" onChange={(e)=> setSearchFoodName(e.target.value)} placeholder='Search' value={searchFoodName} />
          <div className="search-icon">
             <img onClick={handleSearch} src={assets.search_icon}  />
             {searchFoodName && < MdOutlineClear onClick={()=> setSearchFoodName("")} className='search-icon-delete' />}
          </div>
        </div>
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