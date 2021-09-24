import React,  { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import './login.css';

const Login = ({ setLoggedIn, setUser, desiredPath, databaseLocation }) => {


      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const [loginStatus, setLoginStatus] = useState('');

      let history = useHistory(); 

      Axios.defaults.withCredentials = true;

      useEffect( () => {
            let cancel = false;
            Axios.get(`${databaseLocation}/login`).then( (response) => {
                  if (cancel) return;
                  setLoggedIn(response.data.loggedIn);
                  setUser(response.data.user);
                  if(response.data.loggedIn === true) {
                        if(desiredPath.length > 1) {
                              history.push(desiredPath);
                        }
                        else {
                              history.push("/home")
                        }
                        console.log("Login.js: Logged in!");
                  }
            });

            return () => { 
                  cancel = true;
            }
      }, []);

      const login = async () => {
            await Axios.post(`${databaseLocation}/login`, {
                  username: username,
                  password: password
            }).then( (response) => {
                  console.log("Message: " + response.data.msg);
                  var msg = String(response.data.msg);
                  if(!msg.includes("Wrong")) {
                        console.log( response.data );
                        setLoggedIn(true);
                        setUser(response.data.user);
                        if(desiredPath.length > 1) {
                              history.push(desiredPath);
                        }
                        else {
                              history.push("/home")
                        }
                        console.log("Login.js2: Logged in!");
                  } else {
                        setLoginStatus(response.data);
                  }
            });
      };


      return (

            <div className="loginSection">
                  <h1>Login</h1>

                  <div>
                        <h3 className="loginStatus">{loginStatus}</h3>
                  </div>
                  <div className="loginInputs">
                        <input onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="Username" />
                        <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" />
                        <button className="loginButton" onClick={login}
                        // onClick={ () => {
                        //       history.push("/home");
                        // }}
                  > Login </button>
                  </div>
            </div>
      )
};


export default Login;