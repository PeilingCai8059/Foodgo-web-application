import { useState } from "react";
import "./Orders.css";
import axios from "axios";
import { useEffect } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { baseURL } from "../../assets/basic_info.js";
import { toast } from 'react-toastify';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  async function fetchAllOrders() {
    const response = await axios.get(`${baseURL}/api/order/allorders`);
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  async function updateStatusHandler(e, orderId) {
    const response = await axios.post(`${baseURL}/api/order/status`, {
      orderId: orderId,
      status: e.target.value,
    });
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  return (
    <div className="order">
      <h3>Orders: </h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <FaBoxOpen className="icon" />
            <div>
              <div className="order-item-food">
                {order.items.map((item, index) => (
                  <div key={index}> {item.name + " x " + item.quantity} </div>
                ))}
              </div>
              <p className="order-item-name">
                {order.address.firstname + " " + order.address.lastname}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>${order.amount.toFixed(2)}</p>
            <select
              onChange={(e) => updateStatusHandler(e, order._id)}
              value={order.status}
            >
              <option value="Preparing">Preparing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
