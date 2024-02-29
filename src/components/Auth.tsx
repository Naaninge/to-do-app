import { useState} from "react";
import { auth, provider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export interface SignInProps {
  email: string | null;
  password: string | null;
  
}

export function Auth({ email, password}: SignInProps) {
  

  const signInWithGoogleAccount = async () => {
    try {
      await signInWithPopup(auth, provider);
    
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmailAndPassWord = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
     
      alert("You are signed In");
    } catch (error) {}
  };

  
  return (
    <div className="sign-in-btns">
      <button className="btn" onClick={signInWithGoogleAccount}>
        Sign In with Google
      </button>
      <button className="btn" onClick={signInWithEmailAndPassWord}>
        Sign In{" "}
      </button>

    </div>
  );
}
