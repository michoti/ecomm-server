import axios from "axios";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [cart, setCart] = useState({
        total: 0,
        cartItems: [],
        cartProducts: [] 
    });


    const getCartItems = async () => {
        try {
        await axios.get('api/cart').then(resp => {
            setCart({ ...cart, total: resp.data.total});
            setCart({ ...cart, cartItems: resp.data.cart-items});
            setCart({ ...cart, cartProducts: resp.data.products});
        });
        return null;
        
        } catch (error) {
        return error.message;
        
        }
    }

    return (
        <AppContext.Provider value={{cart, getCartItems }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);

export default AppProvider;