import './App.css';
import ArticleList from './components/ArticleList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Modal from "./components/Modal";
import { useState } from 'react';
import QRCall from './components/QRCall';



function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [selectedArticle, setSelectedArticle] = useState({});
    const [openModal, setOpenModal] = useState(false);

    // const databaseLocation = "http://localhost:5000";
    const databaseLocation = "https://lagerwelt3000.herokuapp.com";


    return (
      <div className="App">
          {  openModal === false && loggedIn === true && <h5>Logged in as: {user.user}</h5> }
          {  openModal === false && <h1 className="mainTitle">Lagerwelt ONLINE</h1> }
          {  openModal === false && <h3>Feel the diffrence</h3> }
          <Router>
              <Switch>
                      { loggedIn === false && <Route path="/" component={ () => <Login setLoggedIn={setLoggedIn} setUser={setUser} databaseLocation={databaseLocation} />} /> }
                      { openModal === true && <Modal setOpenModal={setOpenModal} article={selectedArticle} user={user} databaseLocation={databaseLocation} /> }
                      { openModal === false && <Route exact path="/home" component={ () => <ArticleList selectedArticle={selectedArticle}
                                                                                                        setSelectedArticle={setSelectedArticle}
                                                                                                        loggedIn={loggedIn}
                                                                                                        openModal={openModal}
                                                                                                        setOpenModal={setOpenModal}
                                                                                                        databaseLocation={databaseLocation} />} /> }
                    <Route path="/qr" component={ () => <QRCall
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        user={user}
                        databaseLocation={databaseLocation} />} />
              </Switch>
          </Router>
      </div>
    );
}

export default App;
