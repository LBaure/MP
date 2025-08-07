/* eslint-disable no-debugger */
import { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import type { UserProfile, UserProfileToken } from "../models/User";
import { loginAPI, registerAPI } from "../services/AuthService";
type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/app");
        }
      })
      .catch((e) => toast.warning("Server error occured" + e.message));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        const response = res as UserProfileToken;
        console.log("res loginUser", response);
        if (response) {
          localStorage.setItem("token", response?.token);
          const userObj = {
            userName: response?.userName,
            email: response?.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(response.token!);
          setUser(userObj!);
          toast.success("¡Bienvenido!");
          navigate("/app");
        }
      })
      .catch((e) => toast.warning("Server error occured" + e.message));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    debugger;
    console.log("🛑 logout() called — clearing user and redirecting to /");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    toast.success("Sesión cerrada");
    // Ruta absoluta a la raíz:
    navigate("/", { replace: true });
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(UserContext);
