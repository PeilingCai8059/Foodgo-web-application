import { useContext, useEffect, useState } from 'react'
import axios from "axios";
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Login from '../../components/Login/Login'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {getTotal,showLogin,setShowlogin, food_list, cartItems, token, url } = useContext(StoreContext)
  let deliveryFee = (getTotal() > 35 || getTotal() === 0 )? 0 : 5.99
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street:"",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  function onChangeHanler(e){
    const property = e.target.name;
    const value = e.target.value;
    setDeliveryInfo((pre) => ({...pre, [property]:value}))
  }

  async function placeOrder(e){
    e.preventDefault();
    const orderItems = food_list.filter((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item; 
        itemInfo["quantity"] = cartItems[item._id];
        return itemInfo;
      }
    })
    let orderData = {
      address: deliveryInfo,
      items: orderItems,
      amount : getTotal() +deliveryFee,
    }
    let response = await axios.post( url + "/api/order/placeOrder", orderData, {headers:{token}});
    if(response.data.success){
      const {session_url} = response.data ;
      window.location.replace(session_url);
    }else{
      alert("Error")
    }
  }

  useEffect(()=>{
    if (!token || getTotal() === 0){
      navigate('/cart')
    } 
  }, [token])

  return (
    <>
      {showLogin && <Login setShowlogin={setShowlogin} />}
   <div className='app'>
   <Navbar setShowlogin={setShowlogin} />
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name="firstname" onChange={onChangeHanler} value = {deliveryInfo.firstname} placeholder='First name'/>
          <input required type="text" name="lastname" onChange={onChangeHanler} value = {deliveryInfo.lastname} placeholder='Last name'/>
        </div>
        <input required type="text" name="email" onChange={onChangeHanler} value = {deliveryInfo.email} placeholder='Email address'/>
        <input required type="text" name="street" onChange={onChangeHanler} value = {deliveryInfo.street} placeholder='Street'/>
        <div className="multi-fields">
          <input required type="text" name="city" onChange={onChangeHanler} value = {deliveryInfo.city} placeholder='City'/>
          <input required type="text" name="state" onChange={onChangeHanler} value = {deliveryInfo.state} placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required type="text" name="zipcode" onChange={onChangeHanler} value = {deliveryInfo.zipcode} placeholder='Zip code'/>
          <input required type="text" name="country" onChange={onChangeHanler} value = {deliveryInfo.country} placeholder='Country'/>
        </div>
        <input required type="text" name="phone" onChange={onChangeHanler} value = {deliveryInfo.phone} placeholder='Phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-detail">
                <p>Subtotal</p>
                <p>${getTotal()}</p>
              </div>
              <div className="cart-total-detail">
                <p>Delivery Fee</p>
                <p>${deliveryFee}</p>
              </div>
              <hr />
              <div className="cart-total-detail">
                <p>Total</p>
                <p>${(getTotal() + deliveryFee).toFixed(2)}</p>
              </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
      </div>
    </form>

   </div>
    <Footer />
 </>

  )
}

export default PlaceOrder