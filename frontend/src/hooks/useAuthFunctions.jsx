import { AuthService } from "../services/authService";

const useAuthFunctions = (authStateHandlers, navigate) => {
  const {
    setToken,
    setUser,
    setAuthLoginError,
    setAuthLogoutError,
    setAuthRegistrationError,
  } = authStateHandlers;

  const handleError = (error, setError) => {
    setError(error.message || "An unknown error has occurred.");
  };

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      if (response.login) {
        setToken(response.token);
        setUser(response.user);
        navigate("/articles");
      } else {
        setAuthLoginError(response.error);
      }
    } catch (error) {
      handleError(error.message, setAuthLoginError);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setToken(null);
      setUser(null);
      navigate("/");
    } catch (error) {
      handleError(error.message, setAuthLogoutError);
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
        setUser(response.user);
        navigate("/articles");
      } else {
        setAuthRegistrationError(response.error);
      }
    } catch (error) {
      handleError(error.message, setAuthRegistrationError);
    }
  };

  return { login, logout, register };
};

export default useAuthFunctions;
