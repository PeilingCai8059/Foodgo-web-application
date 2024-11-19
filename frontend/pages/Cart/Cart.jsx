import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import Navbar from "../../components/Navbar/Navbar";
import Login from "../../components/Login/Login";
import Footer from "../../components/Footer/Footer";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    showLogin,
    setShowlogin,
    getTotal,
    url,
    token
  } = useContext(StoreContext);

  const navigate = useNavigate()

  let deliveryFee = (getTotal() > 35 || getTotal() === 0 ? 0 : 5.99)

  function handleClick(){
    if(!token){
      setShowlogin(true);
    }else{
      navigate('/order');
    }
  }
  return (
    <>
      {showLogin && <Login setShowlogin={setShowlogin} />}
      <div className="app">
        <Navbar setShowlogin={setShowlogin} />
        <div className="cart">
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>
            <br />
            <hr />
            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div>
                    <div className="cart-items-title cart-items-item">
                      <img src={url + "/images/"+ item.image} alt="" />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <div className="cart-items-item-quantity">
                        <img
                          onClick={() => removeFromCart(item._id)}
                          src={assets.remove_icon_red}
                          alt=""
                        />
                        <p>{cartItems[item._id]}</p>
                        <img
                          onClick={() => addToCart(item._id)}
                          src={assets.add_icon_green}
                          alt=""
                        />
                      </div>
                      <p>${item.price * cartItems[item._id]}</p>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="cart-bottom">
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
            <button onClick={handleClick} >CHECKOUT</button>
          </div>
          <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
