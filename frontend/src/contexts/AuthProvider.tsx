import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface Props {
  children: ReactNode;
}

interface Auth {
  token: string;
  username: string;
}

interface AuthContextInterface {
  auth: Auth | undefined;
  setAuth: Dispatch<SetStateAction<Auth | undefined>>;
  isAuthenticated: boolean;
}

const getInitialAuth = () => {
  const stored = localStorage.getItem("auth");
  return stored ? JSON.parse(stored) : undefined;
};

const AuthContext = createContext<AuthContextInterface>({
  auth: getInitialAuth(),
  setAuth: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth | undefined>(getInitialAuth());
  const isAuthenticated = !!(auth?.token && auth?.username);
  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
