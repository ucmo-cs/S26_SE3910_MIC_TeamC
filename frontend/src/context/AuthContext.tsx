import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User, AuthContextType } from "../types/auth";
import * as authService from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCU] = useState<User | null>(null);
  const setCurrentUser = (newUser: User | null) => {
    console.log("value", newUser);
    setCU(newUser);
  };
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: remove
  useEffect(() => {
    console.log("current user", currentUser);
  }, [currentUser]);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch {
        // Try localStorage as fallback for session recovery
        const cached = localStorage.getItem("user");
        if (cached) {
          try {
            setCurrentUser(JSON.parse(cached));
          } catch {
            // Invalid cached data, clear it
            localStorage.removeItem("user");
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authService.login(username, password);
      console.log("user", user);
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      localStorage.removeItem("user");
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    name: string,
    password: string,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authService.register(username, email, name, password);
      console.log("user", user);
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      localStorage.removeItem("user");
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.logout();
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    currentUser,
    isLoggedIn: currentUser !== null,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
