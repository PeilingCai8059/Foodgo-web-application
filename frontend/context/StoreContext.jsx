import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null)

// eslint-disable-next-line react/prop-types
function StoreContextProvider({children}){
    const [cartItems,setCartItems] = useState({});
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([]);

    const url ="http://localhost:4000"

    const addToCart = async (itemId) => {
        if( !cartItems[itemId]){
            setCartItems({...cartItems,[itemId]:1})
        }else{
            setCartItems({...cartItems,[itemId]:cartItems[itemId]+1})
        }
        if(token){
            await axios.post( url + '/api/cart/add', {itemId},{headers: {token}})
        }
    }
    
    const removeFromCart = async(itemId) => {
        setCartItems({...cartItems,[itemId]:cartItems[itemId]-1});
        if(token) {
            await axios.post(url + '/api/cart/remove', {itemId},{headers: {token}})
        }
    }
    const getTotal =()=>{
        let total = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                let itemInfo = food_list.find((product)=> product._id === item);
                total += itemInfo.price * cartItems[item];
            }
        }
        return total;
    }

    const [showLogin, setShowlogin] = useState(false);

    async function fetchFoodList(){
        const response = await axios.get(url+ "/api/food/all");
        setFoodList(response.data.data)
    }

    async function loadCart (token){
        const response = await axios.get(url+ "/api/cart/getCart", {headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(()=> {
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCart(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        showLogin,
        setShowlogin,
        getTotal,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;