import './App.css';
import ArticleList from './components/ArticleList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Modal from "./components/Modal";
import { useState, useEffect } from 'react';
import QRCall from './components/QRCall';
import Nav from './components/Nav';



function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [selectedArticle, setSelectedArticle] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const databaseLocation = "http://localhost:5000";
    // const databaseLocation = "https://lagerwelt3000.herokuapp.com";

    // useEffect( () => {
    //     console.log("loggedIn is now " + loggedIn);
    // }, [loggedIn])


    return (
      <div className="App">
            <Router>
                { loggedIn === true && <Nav user={user}/> }
                { openModal === false && <img src="https://cdn.shopify.com/s/files/1/0540/2355/3219/files/logo_png.png?v=1634550054" alt="md-teile logo"/> }
                {/* {  openModal === false && <h1 className="mainTitle">Lagerwelt ONLINE</h1> } */}
                {  openModal === false && <h3 className="subTitle">Feel the diffrence</h3> }
                <Switch>
                        { loggedIn === false && <Route path="/" component={ () => <Login setLoggedIn={setLoggedIn} setUser={setUser} desiredPath={window.location.pathname} databaseLocation={databaseLocation} />} /> }
                        { openModal === true && <Modal setOpenModal={setOpenModal} article={selectedArticle} setArticle={setSelectedArticle} user={user} databaseLocation={databaseLocation} /> }
                        { openModal === false && <Route exact path="/home" component={ () => <ArticleList selectedArticle={selectedArticle}
                                                                                                            setSelectedArticle={setSelectedArticle}
                                                                                                            loggedIn={loggedIn}
                                                                                                            openModal={openModal}
                                                                                                            setOpenModal={setOpenModal}
                                                                                                            databaseLocation={databaseLocation} />} /> }
                        { loggedIn === true && <Route path="/qr" component={ () => <QRCall
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            user={user}
                            databaseLocation={databaseLocation} />} /> }
                </Switch>
            </Router>
      </div>
    );
}

export default App;
