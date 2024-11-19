import { createBrowserRouter } from "react-router-dom";
import Cart from "../pages/Cart/Cart"
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder"
import Home from "../pages/Home/Home";
import Verify from "../pages/Verify/Verify";
import MyOrders from "../pages/MyOrders/MyOrders";
import Menu from "../pages/Menu/Menu";

const router =createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path:'/cart',
        element: <Cart />
    },
    {
        path: '/order',
        element : <PlaceOrder />   
    },
    {
        path: '/verifyPayment',
        element : <Verify />
    },
    {
        path: '/myorders',
        element : <MyOrders />
    }
    ,{
        path: '/menu',
        element: <Menu />
    }

]);

export default router