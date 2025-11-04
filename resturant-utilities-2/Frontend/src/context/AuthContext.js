import { createContext, useContext, useState, useEffect } from "react";
import { axiosInst } from "../utils/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Check current user when app loads
  const checkCurrentUser = async () => {
    try {
      const { data } = await axiosInst.get("/auth/check-user");
      if(data.success){
        setUser(data.user);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

  // ✅ Register user
  const register = async (formData) => {
    const { data } = await axiosInst.post("/auth/register", formData);
    if (data.success) {
      navigate("/login");
    }
  };

  // ✅ Login user
  const login = async (formData) => {
    const { data } = await axiosInst.post("/auth/login", formData);
    if (data.success) {
      setUser(data.user);
      navigate("/dashboard");
    }
  };

  // ✅ Logout user
  const logout = async () => {
    try {
        const {data}=await axiosInst.get("/auth/logout")
        if(data.success){
        setUser(null);
         navigate("/login");
       } 
  }catch (error) {
     console.log(error);
    }
  
    }


  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkCurrentUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
