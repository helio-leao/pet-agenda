import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext<{
  signIn: (data: any) => void;
  signOut: () => void;
  session?: any;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
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
    console.log("context useeffect...");
    const data = localStorage.getItem("session");
    if (data) {
      setSession(JSON.parse(data));
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: (data) => {
          localStorage.setItem("session", JSON.stringify(data));
          setSession(data);
        },
        signOut: () => {
          localStorage.removeItem("session");
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
