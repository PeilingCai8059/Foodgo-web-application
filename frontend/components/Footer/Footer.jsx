import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='logo-footer' src={assets.logo_footer} alt="" />
                <p>Find the best restaurants that deliver. Get contactless delivery for restaurant takeout, groceries, and more! </p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>CAMPANEY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delibery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1 999-999-999</li>
                    <li>contact@foodgo.com</li>
                </ul>
            </div>  
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 @ Foodgo.com - All Right Reserved</p>
    </div>
  )
}

export default Footer