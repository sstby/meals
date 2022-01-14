import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "../firebase";

export const MyContext = createContext();

export function MyContextProvider({ children }) {
  //Всё, что связано с авторизацией пользователя
  const [user, setUser] = useState({});

  function createUserProfile(registeredUser) {
    console.log(registeredUser);
    const name = registeredUser.displayName;
    const email = registeredUser.email;

    setDoc(doc(database, "Users", email), {
      name: name,
      email: email,
    });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password).then((snap) =>
      createUserProfile(snap.user)
    );
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider).then((snap) => {
      const meta = snap.user.metadata;
      meta.lastSignInTime === meta.creationTime && createUserProfile(snap.user);
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <MyContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, createUserProfile }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
