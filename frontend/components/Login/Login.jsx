import { useContext, useState } from 'react'
import { assets } from '../../src/assets/assets.js'
import './Login.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Login = ({setShowlogin}) => {
    const {url, setToken} = useContext(StoreContext);
    const [hasAccount, setHasAccount] = useState(true)
    const [userInfo, setUserInfo] = useState({
        name: "",
        email:"",
        password: ""
    });
    
    const PASSWORD_REGEX = {
        capital: /(?=.*[A-Z])/,
        length: /(?=.{8,15}$)/,
        specialChar: /(?=.*?[#?!@$%^&*-])/,
        digit: /(?=.*[0-9])/,
    }
    
    function onChangeHandler(e){
        const property = e.target.name 
        const value = e.target.value
        
        setUserInfo( pre => ({
            ...pre,
            [property]:value
        }))

    }
    async function onLogin(e){
        e.preventDefault();
        let newURL = url ;
        newURL += (hasAccount? '/api/user/login' : '/api/user/register')
        
        const response = await axios.post(newURL, userInfo );
        if(response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowlogin(false);
        }else{
            alert(response.data.message)
        }
    }

  return (
    <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{hasAccount? "Login" :"Sign Up"}</h2>
                <img onClick={()=>setShowlogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {!hasAccount &&  <input type="text" onChange={onChangeHandler} value = {userInfo.name} name='name' placeholder='Your Name' required />}
                <input type="email" onChange={onChangeHandler} value = {userInfo.email} name='email' placeholder='Your Email' required />
                <input type="password" onChange={onChangeHandler}  value = {userInfo.password} name='password' placeholder='Password' required />
                {!hasAccount &&  userInfo.password !== ''
                    &&<ul>
                    { !PASSWORD_REGEX.length.test(userInfo.password) && <li> Contains 8-15 characters </li>}
                    {!PASSWORD_REGEX.capital.test(userInfo.password)&& <li>At least 1 uppercase character</li>}
                    { !PASSWORD_REGEX.specialChar.test(userInfo.password)&& <li>At least one special character</li>}
                    { !PASSWORD_REGEX.digit.test(userInfo.password) && <li>At least 1 numeric character</li>}
                </ul>}
            </div>
            <button type='submit'>{hasAccount ? "Login" : "Sign Up"}</button>
            {!hasAccount && <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By countinuing, I agree with the terms of use and privacy policy.</p>
            </div> }   
            {hasAccount ? <p>Create a new account? <span onClick={() => setHasAccount(false)}>Click here</span></p>
                : <p>Already have an account? <span onClick={() => setHasAccount(true)}>Login here</span></p>
                }
        </form>
    </div>
  )
}

export default Login