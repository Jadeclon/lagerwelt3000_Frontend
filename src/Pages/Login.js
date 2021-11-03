import React,  { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Axios from 'axios';
import './login.css';



const Login = ({ setLoggedIn, setUser, desiredPath, databaseLocation }) => {

      const [loginStatus, setLoginStatus] = useState('');

      let history = useHistory(); 
      let user = '';
      let pass = '';

      let loggedIn = false;

      Axios.defaults.withCredentials = true;

      useEffect( () => {
            window.addEventListener("keydown", handleKeyPress);
            isLoggedIn();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

      const isLoggedIn = async () => {
            
            console.log("Loggin Page loaded..");

            await Axios.get(`${databaseLocation}/login`).then( (response) => {

                  setLoggedIn(response.data.loggedIn);

                  if(response.data.loggedIn === true)
                  {
                        if(desiredPath.length > 1) { history.push(desiredPath); }
                        else { history.push("/home") }
                        console.log("Login.js: Logged in!");
                        setUser(response.data.user);
                        loggedIn = true;
                  }
            });
      }

      const login = async () => {
            await Axios.post(`${databaseLocation}/login`, {
                  username: document.getElementById("usernameInput").value,
                  password: document.getElementById("passwordInput").value
            }).then( (response) => {
                  console.log(response.data);
                  if(!response.data.msg.includes("Wrong")) {
                        setLoggedIn(true);
                        loggedIn = true;
                        setUser(response.data.user);
                        if(desiredPath.length > 1) {
                              history.push(desiredPath);
                        }
                        else {
                              history.push("/home")
                        }
                        console.log("Login.js2: Logged in!");
                  } else {
                        setLoginStatus(response.data.msg);
                  }
            });
      };


      const handleKeyPress = (event) => {
            // console.log("Event: " + event.key);3
            if(event.charCode == 13 || event.key === 'Enter') {
                  if(loggedIn === false)
                  {
                        login();
                  }
            } 
      }

      return (

            <div className="loginSection">
                  <h1>Login</h1>

                  <div>
                        <h3 className="loginStatus">{loginStatus}</h3>
                  </div>
                  <div className="loginInputs">
                        <input type="text" id="usernameInput" placeholder="Username" />
                        <input type="password" id="passwordInput" placeholder="Password" />
                        <button className="loginButton" onClick={login} > Login </button>
                  </div>
            </div>
      )
};


export default Login;