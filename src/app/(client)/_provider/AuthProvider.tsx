"use client";
import { auth } from "@/lib";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../_context";
import { FirebaseError } from "firebase/app";

const UserAuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const verifyPassword = async (email: string, password: string) => {
    setPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsSignedIn(true);
      setUser(userCredential.user);
      setPending(false);
    } catch (error) {
      setPending(false);
      const errorCode = (error as FirebaseError).code;
      throw new Error(errorCode);
    }
  };

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setUser(user);
      setPending(false);
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <AuthContext.Provider value={{ user, pending, isSignedIn, verifyPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserAuthProvider;
