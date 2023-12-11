import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    user: null,
  });
  const [authLoginError, setAuthLoginError] = useState(null);
  const [authRegistrationError, setAuthRegistrationError] = useState(null);
  const [authLogoutError, setAuthLogoutError] = useState(null);

  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      console.log("check response", response);
      if (response.login) {
        localStorage.setItem("authToken", response.token);
        setAuthState({
          isAuthenticated: true,
          token: response.token,
          user: response.user,
        });
        navigate("/dashboard");
      } else {
        setAuthLoginError(response.error);
      }
    } catch (error) {
      setAuthLoginError(error.message);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("authToken");
      setAuthState({ isAuthenticated: false, token: null, user: null });
      navigate("/");
    } catch (error) {
      setAuthLogoutError(error.message);
    }
  };

  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await AuthService.register(
        firstName,
        lastName,
        email,
        password
      );
      if (response.register) {
        setAuthState({ isAuthenticated: true, user: response.user });
        navigate("/dashboard");
      } else {
        console.error(response.error);
        setAuthRegistrationError(
          "Account with these credentials already exists."
        );
      }
    } catch (error) {
      setAuthRegistrationError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        authLoginError,
        authRegistrationError,
        authLogoutError,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
