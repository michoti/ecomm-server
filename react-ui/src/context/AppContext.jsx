import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({
        total: 0,
        cartItems: [],
        cartProducts: [] 
    });

    const getUser = async () => {
    const { data } = await axios.get("/api/user");
        setUser(data);
        console.log(data)
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);

        if (parts.length === 2) {
        return parts.pop().split(';').shift();
        }
    };

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
            setCart({ ...cart, total: resp.data.total, cartItems: Object.values(resp.data.items), cartProducts: resp.data.products });
            // console.log(resp.data);
        });
        return null;
        
        } catch (error) {
        return error.message;
        
        }
    }

    const addToCart = async (id) => { 
        const quantity = 1;      
        await axios.post(`api/cart/add/${id}`, { quantity }).then(resp => console.log(resp)).catch( err => console.error(err));
        getCartItems();      
    }
    const updateCartItemQuantity = async (id, quantity) => {      
        await axios.put(`api/cart/updated-quantity/${id}`, { quantity }).then(resp => console.log(resp)).catch( err => console.error(err));
        getCartItems();      
    }

    const removeFromCart = async (id) => {
        await axios.delete(`api/cart/remove/${id}`).then(resp => console.log(resp)).catch( err => console.error(err));
        getCartItems();
    }

    useEffect(() => {
        getProducts();  
        getCartItems();    
    },[]);

    return (
        <AppContext.Provider value={{
            user,
            getUser,
            getCookie,
            cart,
            addToCart,
            updateCartItemQuantity,
            removeFromCart,
            products,
            loading
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);

export default AppProvider;