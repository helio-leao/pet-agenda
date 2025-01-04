import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import {
  getLocalStorageSession,
  removeLocalStorageSession,
  setLocalStorageSession,
} from "../utils/localStorageSession";
import Session from "../types/Session";

const AuthContext = createContext<{
  signIn: (data: Session) => void;
  signOut: () => void;
  session: Session | null;
  isLoading: boolean;
} | null>(null);

export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const data = getLocalStorageSession();
    if (data) {
      setSession(data);
    }
    setIsLoading(false);
  }, []);

  function signIn(data: Session) {
    setLocalStorageSession(data);
    setSession(data);
  }

  async function signOut() {
    removeLocalStorageSession();
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
