import "./OrderPanel.css"
import { TfiPackage } from "react-icons/tfi";

// eslint-disable-next-line react/prop-types
export default function OrderPanel({order,onClick}) {
    const rawDate = order.date;
    const datePattern = /\d{4}-\d{2}-\d{2}/;
    const timePattern = /\d{2}:\d{2}:\d{2}/;
    const date = rawDate.match(datePattern)[0];
    const time = rawDate.match(timePattern)[0];

  return (
    <div className="order-panel">
        <div className="order-header">
            <div className="order-time">{date} &nbsp; {time}</div>
            <div className="amount">${order.amount.toFixed(2)}</div>
        </div>
        <div className="order-detail">
            <TfiPackage className="order-icon" />
            <div className="order-items">
                {order.items.map((item, index) => {
                    return (
                        <div key={index} className="order-item">{item.name} x {item.quantity} </div>
                    )
                } )}
            </div>
            <div className="order-status">{order.status}</div>
            <button onClick={onClick} className="track-btn"> Track Order</button>
        </div>
    </div>
  )
}
