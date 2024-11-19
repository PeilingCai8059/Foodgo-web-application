
import './Home.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useContext } from 'react'
import Footer from '../../components/Footer/Footer'
import AppDownload from '../../components/AppDownload/AppDownload'
import Login from '../../components/Login/Login'
import { StoreContext } from '../../context/StoreContext'

const Home = () => {
  const{showLogin, setShowlogin} = useContext(StoreContext)

  return (
    <>
    {showLogin && <Login setShowlogin={setShowlogin}/>}
    <div className='app'> 
      <Navbar setShowlogin={setShowlogin} />
      <Header />
      <AppDownload />
    </div>
    <Footer />
    </>
  )
}

export default Home