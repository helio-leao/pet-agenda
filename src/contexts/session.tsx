import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
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

  return (
    <AuthContext.Provider
      value={{
        signIn: (data) => {
          setSession(data);
        },
        signOut: () => {
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
