import { User } from "firebase/auth";
import { createContext } from "react";

type AuthContextType = {
  isSignedIn: boolean;
  pending: boolean;
  user: User | null;
  verifyPassword: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  pending: true,
  user: null,
  verifyPassword: async () => {},
});

export default AuthContext;
