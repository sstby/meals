import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { useMyContext } from "../context/MyContext";

import "../css/login.css";

const Auth = (props) => {
  const { logIn, signUp, googleSignIn } = useMyContext();
  const [authType, setAuthType] = useState(props.type);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeAuth = () => {
    setAuthType(authType !== "login" ? "login" : "signup");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authType === "login") {
        await logIn(email, password);
      } else {
        await signUp(email, password);
      }
      setEmail("");
      setPassword("");
      props.setModalActive(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await googleSignIn();
      setEmail("");
      setPassword("");
      props.setModalActive(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2>{authType === "login" ? "Log In" : "Sign Up"}</h2>
      <p>{error && error}</p>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder={email ? email : "Email"}
          value={email ? email : ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password ? password : ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value={authType === "login" ? "Log In" : "Sign Up"}
        ></input>
      </form>
      <hr />
      <GoogleButton
        className="g-btn"
        type="dark"
        onClick={handleGoogleSignIn}
      />
      {authType === "login" ? (
        <span>
          Don't have an account?
          <span onClick={handleChangeAuth}> Sign Up</span>
        </span>
      ) : (
        <span>
          Allready have an account?
          <span onClick={handleChangeAuth}> Log In</span>
        </span>
      )}
    </>
  );
};

export default Auth;
