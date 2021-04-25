import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUiContext } from "./UiContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [sitters, setSitters] = useState();
  const { setError, setLoading } = useUiContext();

  useEffect(() => {
    getUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    axios
      .post("http://api-staging.joinbubble.co.uk/auth/local", {
        email,
        password,
      })
      .then((data) => {
        console.log("Logged in successfully: ", data);
        const token = data.data.token;
        localStorage.setItem("token", token);
        getUser();
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        if (err.response && err.response.data) {
          setError(err.response.data);
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    console.log("User logged out");
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://api-staging.joinbubble.co.uk/api/user", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log("Fetched user details successfully: ", data);
          setLoading(false);
          setUser(data.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.response && err.response.data) {
            setError(err.response.data);
          }
        });
    } else {
      setError({ message: "User is not authenticated, no token found." });
    }
  };

  const getSitters = async () => {
    if (sitters) return sitters;
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://api-staging.joinbubble.co.uk/api/search", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log("Fetched sitters data successfully: ", data);
          setSitters(data.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.response && err.response.data) {
            setError(err.response.data);
          }
        });
    } else {
      setError({ message: "User is not authenticated, no token found." });
    }
  };

  const contextValue = { user, sitters, login, logout, getUser, getSitters };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (ctx === undefined) {
    console.log("Context undefined");
    return;
  }
  return ctx;
};

export { UserProvider, useUserContext };
