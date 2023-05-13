import axios from "axios";
import { createContext, useEffect, useState, } from "react";
// import Cookies from "universal-cookie";
import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("access_token");
  return token;
};


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // const cookies = new Cookies();
  // const cookies = useMemo(() => {
  //   return new cookies();
  // }, []);

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        // "http://localhost:8080/api/auth/login",
        "http://localhost:8080/api/login",

        inputs
      );
      console.log('login response')
      setCurrentUser(res.data);

      // set the authentication token in a cookie
      Cookies.set("access_token", res.data.token, { expires: 1 });
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const logout = async () => {
    try {
      // await axios.post("http://localhost:8080/api/auth/logout");
      await axios.post("http://localhost:8080/api/logout");

      setCurrentUser(null);

      // remove the authentication token cookie
      Cookies.remove("access_token");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  useEffect(() => {
    // get the authentication token from the cookie when the component mounts
    const access_token = Cookies.get("access_token");
    if (access_token) {
      setCurrentUser({ token: access_token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      currentUser: currentUser, 
      login: login, 
      logout: logout 
      }}>
      {children}
    </AuthContext.Provider>
  );
};
