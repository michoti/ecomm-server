import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cart, setCart] = useState({
        total: 0,
        cartItems: {},
        cartProducts: [] 
    });


    const getProducts = async () => {
        try {
            setLoading(true);
            await axios.get('api/products').then(({data}) => { setLoading(false); setProducts(data.data); });
            return null;
        } catch (error) {
            setLoading(false)
            return error.message        
        }
    }


    const getCartItems = async () => {
        try {
        await axios.get('api/cart').then(resp => {
            setCart({ ...cart, total: resp.data.total, cartItems: resp.data.items, cartProducts: resp.data.products });
            console.log(resp);
        });
        return null;
        
        } catch (error) {
        return error.message;
        
        }
    }

    const addToCart = async (id) => { 
        const quantity = 1;      
        await axios.post(`api/cart/add/${id}`, { quantity }).then(resp => { console.log(resp); setCartItemsCount(resp.data.count )}).catch( err => console.error(err));
        getCartItems();   
        // console.log(cart.products)     
    }

    useEffect(() => {
        getProducts();  
        getCartItems();    
    },[]);

    return (
        <AppContext.Provider value={{
            cart,
            cartItemsCount,
            addToCart,
            products,
            loading
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);

export default AppProvider;