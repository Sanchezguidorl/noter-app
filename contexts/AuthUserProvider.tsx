"use client";
import { auth, provider } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface UserI {
  logged: boolean;
  email: string;
  uid: string;
}

const AuthUserContext = createContext<{
  user: UserI;
  register: (value: { email: string; password: string }) => Promise<void>;
  authUser: (value: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  authWithGoogle: () => Promise<void>;
}>({
  user: { logged: false, email: "", uid: "" },
  register: async () => {},
  authUser: async () => {},
  logout: async () => {},
  authWithGoogle: async () => {},
});

export const useAuthUserContext = () => useContext(AuthUserContext);

function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserI>({
    logged: false,
    email: "",
    uid: "",
  });

  const register = async (value: { email: string; password: string }) => {
    await createUserWithEmailAndPassword(auth, value.email, value.password);
    return;
  };

  const authUser = async (value: { email: string; password: string }) => {
    await signInWithEmailAndPassword(auth, value.email, value.password);
    return;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const authWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ logged: true, email: user.email || "", uid: user.uid });
      } else {
        setUser({ logged: false, email: "", uid: "" });
      }
    });
  }, []);

  return (
    <AuthUserContext.Provider
      value={{
        user: user,
        register: register,
        authUser: authUser,
        logout: logout,
        authWithGoogle: authWithGoogle,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
}

export default AuthUserProvider;
