import React,  { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import './login.css';

const Login = ({ setLoggedIn }) => {

      const databaseLocation = "https://lagerwelt3000.herokuapp.com";
      // const databaseLocation = "http://localhost:5000";

      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      // const [loginStatus, setLoginStatus] = useState('');

      let history = useHistory(); 

      Axios.defaults.withCredentials = true;

      useEffect( () => {
            Axios.get(`${databaseLocation}/login`).then( (response) => {
                  setLoggedIn(response.data.loggedIn);
                  if(response.data.loggedIn === true) {
                        history.push("/home");
                        console.log("Login.js: Logged in!");
                  }
            });
      }, []);

      const login = () => {
            Axios.post(`${databaseLocation}/login`, {
                  username: username,
                  password: password
            }).then( (response) => {
                  // console.log(response);
                  if(!response.data.includes("Wrong")) {
                        setLoggedIn(true);
                        history.push("/home");
                        console.log("Login.js2: Logged in!");
                  } else {
                        setLoginStatus(response.data);
                  }
            });
      };


      return (
            <div className="loginBackground">
                  <div className="loginSection">
                        <h1>Login</h1>

                        <div>
                              <h3 className="loginStatus">{loginStatus}</h3>
                        </div>
                        <div className="loginInputs">
                              <input onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="Username" />
                              <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" />
                        </div>
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