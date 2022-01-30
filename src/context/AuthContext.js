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

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  //Всё, что связано с авторизацией пользователя
  const [user, setUser] = useState({});

  function createUserProfile(registeredUser) {
    const name = registeredUser.displayName;
    const user_id = registeredUser.uid;

    setDoc(doc(database, "Users", user_id), {
      name,
      data: {
        age: 0,
        weight: 0,
        height: 0,
        activityMultiplier: 1,
      },
      goals: {
        calories: 0,
        proteins: 0,
        carbons: 0,
        fats: 0,
        water: 0,
      },
      meals: {},
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
    <AuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, createUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
