import { useContext, useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import "./MyOrders.css"
import axios from "axios"
import { StoreContext } from "../../context/StoreContext"
import OrderPanel from "../../components/OrderPanel/OrderPanel"

export default function MyOrders() {
    const {url, token} = useContext(StoreContext);
    const [orders, setOrders] = useState([]);

    async function fetchOrders(){
        const response = await axios.get(url + "/api/order/userorders",{headers:{token}});
        setOrders(response.data.data);
    }

    useEffect(() => {
        if(token){
            fetchOrders();
        }
   
    }, [token])

  return (
    <>
    <div className='app' > 
        <Navbar/>
        <div className="my-orders">
                <div className="my-order-title">My Orders</div>
                <div className="ordersContainer">
                    {orders.map((order,index)=> <OrderPanel order={order} key={index} onClick={fetchOrders}/>)}
                </div>
            </div>
        </div>
     <Footer/>
    </>
  )
}
