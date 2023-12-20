import { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import usePersistedState from "./usePersistedState";
import useAuthFunctions from "./useAuthFunctions";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = usePersistedState("authToken", null);
  const [user, setUser] = usePersistedState("user", null);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token));
  const [authLoginError, setAuthLoginError] = useState(null);
  const [authRegistrationError, setAuthRegistrationError] = useState(null);
  const [authLogoutError, setAuthLogoutError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(Boolean(token));
  }, [token]);

  const authStateHandlers = {
    setToken,
    setUser,
    setAuthLoginError,
    setAuthLogoutError,
    setAuthRegistrationError,
  };

  const { login, logout, register } = useAuthFunctions(
    authStateHandlers,
    navigate
  );

  const providerValue = {
    isAuthenticated,
    login,
    logout,
    register,
    token,
    user,
    authLoginError,
    authLogoutError,
    authRegistrationError,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
