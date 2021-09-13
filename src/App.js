import './App.css';
import ArticleList from './components/ArticleList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Modal from "./components/Modal";
import { useState } from 'react';



function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState({});
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
      console.log("loggedIn: " + loggedIn);
    }, [loggedIn])


  return (
    <div className="App">
        { <h1 className="mainTitle">Lagerwelt ONLINE</h1> }
        { <h3>Feel the diffrence</h3> }
        <Router>
            <Switch>
                    { loggedIn === false && <Route exact path="/" component={ () => <Login setLoggedIn={setLoggedIn} />} /> }
                    { openModal === true && <Modal setOpenModal={setOpenModal} article={selectedArticle} /> }
                    { openModal === false && <Route exact path="/home" component={ () => <ArticleList selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} loggedIn={loggedIn} openModal={openModal} setOpenModal={setOpenModal} />} /> }
            </Switch>
        </Router>
    </div>
  );
}

export default App;
