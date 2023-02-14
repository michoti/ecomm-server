import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [products, setProducts] = useState({});

    const getUser = async () => {
        const { data } = await axios.get("/api/user");
        setUser(data);
    };

      const logout = () => {
        axios.post("/logout").then(() => {
        setUser(null);
        });
      };

      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);

        if (parts.length === 2) {
        return parts.pop().split(';').shift();
        }
      };

      // const getProducts = async () => {
      //   try {
      //       const response = await axios.get('api/products')
      //                                   // .then((resp) => resp.json())
      //                                   .then(({data}) => console.log(data.data));
      //       return response.data;                            
      //       // const data = response.reduce((obj, current) => ({...obj, [current.key]: current.value}), {});
      //       // return data;
      //       // const response = await axios.get('api/products');
      //       // return response.data;
      //   } catch (error) {
      //       return error.message        
      //   }
      // }

      // useEffect(() => {
      //   const allProducts = getProducts();
      //   setProducts(allProducts);
      // },[]);
      
    return (
        <AuthContext.Provider value={{ user, getUser, getCookie, logout}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);