import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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
      
    return (
        <AuthContext.Provider value={{ user, getUser, getCookie, logout}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);