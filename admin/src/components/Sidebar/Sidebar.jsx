import "./Sidebar.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <IoAddCircleOutline />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/all' className="sidebar-option">
          <IoIosList />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <IoBagCheckOutline />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}
