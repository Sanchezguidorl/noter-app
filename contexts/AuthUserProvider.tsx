"use client";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
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
}>({
  user: { logged: false, email: "", uid: "" },
  register: async () => {},authUser:async()=>{}
});

export const useAuthUserContext = () => useContext(AuthUserContext);

function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserI>({ logged: false, email: "", uid: "" });

  const register = async (value: { email: string; password: string }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );
    const user = userCredential.user;
    setUser({ logged: true, email: user.email, uid: user.uid });
    return;
  };

  const authUser = async (value: { email: string; password: string }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );
    const user = userCredential.user;
    setUser({ logged: true, email: user.email, uid: user.uid });
    return;
  };

  return (
    <AuthUserContext.Provider value={{ user: user, register: register , authUser: authUser}}>
      {children}
    </AuthUserContext.Provider>
  );
}

export default AuthUserProvider;