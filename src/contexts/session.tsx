import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import api from "../services/api";
import {
  getLocalStorageSession,
  removeLocalStorageSession,
  setLocalStorageSession,
} from "../utils/localStorageSession";

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
    const data = getLocalStorageSession();
    if (data) {
      setSession(data);
    }
    setIsLoading(false);
  }, []);

  function signIn(data: any) {
    setLocalStorageSession(data);
    setSession(data);
  }

  async function signOut() {
    const session = getLocalStorageSession();

    if (!session) {
      return;
    }

    try {
      await api.delete(`/auth/logout`, {
        data: { refreshToken: session.refreshToken },
      });
      removeLocalStorageSession();
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
