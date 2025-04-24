import { createContext, useState, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { User } from "../auth.model";
import { setUser, logout as reduxLogout } from "../redux/authSlice";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch: AppDispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("authToken")
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const login = (user: User) => {
    sessionStorage.setItem("authToken", JSON.stringify(user));
    dispatch(setUser(user));
    setIsAuthenticated(true);
  };

  const logout = () => {
    dispatch(reduxLogout());
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
