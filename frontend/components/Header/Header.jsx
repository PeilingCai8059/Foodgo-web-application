
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {

  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favorite food here</h2>
            <p>Choose from a diverse menu</p>
            <Link to='/menu'> <button>View Menu</button></Link>
        </div>

    </div>
  )
}

export default Header