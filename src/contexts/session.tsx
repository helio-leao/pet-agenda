import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import api from "../services/api";

const AuthContext = createContext<{
  signIn: (data: any) => void;
  signOut: () => Promise<void>;
  session?: any;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: async () => Promise.resolve(),
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("session");
    if (data) {
      setSession(JSON.parse(data));
    }
    setIsLoading(false);
  }, []);

  function signIn(data: any) {
    localStorage.setItem("session", JSON.stringify(data));
    setSession(data);
  }

  async function signOut() {
    const sessionData = localStorage.getItem("session");

    if (!sessionData) {
      return;
    }
    const session = JSON.parse(sessionData);

    try {
      await api.delete(`/auth/logout`, {
        data: { refreshToken: session.refreshToken },
      });
      localStorage.removeItem("session");
      setSession(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
