import React, { useRef, useState, useContext } from "react";
import "./Auth.css";
import axios from "axios";
import AuthContext from '../context/auth_context'

function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emailElement = useRef(null);
  const passwordElement = useRef(null);
  const {login} = useContext(AuthContext)

  const submitHandler = async (event) => {
    event.preventDefault();
  
    const email = emailElement.current.value;
    const password = passwordElement.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    console.log(email, password);
    let requestBody;
    if (isLoggedIn) {
      requestBody = {
        query: `
        query{
          login(email:"${email}", password: "${password}"){
            userId
            token
            tokenExpiration
          }
        }
          `,
      };

    } else {
      requestBody = {
        query: `
      mutation {
          createUser(user : {email:"${email}", password: "${password}"}) {
              _id
              email
          }
      }
      `,
      };
    }

    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const result = await axios.post("/graphql", requestBody, headers);
      login(
        result.data.data.login.token,
        result.data.data.login.userId,
        result.data.data.login.tokenExpiration
      )
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginSwitch = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="email" name="" id="email" ref={emailElement} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" name="" id="password" ref={passwordElement} />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleLoginSwitch}>
          {isLoggedIn ? "Switch to signup" : "Switch to Login"}
        </button>
      </div>
    </form>
  );
}

export default Auth;
