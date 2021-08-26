import './App.css';
import React, {useState, useEffect} from "react";
import Axios from "axios";
import Listing from './components/Listing';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

function App() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [articleList, setArticleList] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const databaseLocation = "https://lagerwelt3000.herokuapp.com"; //http://localhost:5000

  useEffect( () => {
      searchHandler();
  }, [searchText]);


  useEffect( () => {
    loadArticleList();
  }, []);


//   useEffect( () => {
//     loadArticleList();
//     console.log("ArticleList changed!");
//   }, []);


  const searchHandler = () => {
      console.log(searchText);
      setFilteredList(articleList.filter(article => article.articleNumber.includes(searchText)));
  };

  const loadArticleList = () => {
    Axios.get(`${databaseLocation}/api/get`).then( (response) => {
        console.log("Data loaded")
        setArticleList(response.data);
        setSearchText("");
        searchHandler();
    });
  };

  
  const submitReview = async () => {

      Axios.post(`${databaseLocation}/api/insert`, {
          title: title,
          description: description
      });
      setArticleList([...articleList, {title: title, body: description}]);
  };



  return (

    <div className="App">
      <h1>Lagerwelt 3000</h1>
      <h3>Feel the diffrence</h3>
      <form>
          <label>Insert a new article: </label>
          <input type="text" name="titleInput" onChange={ (e) => {
              setTitle(e.target.value);
          }}/>
          <input type="text" name="descriptionInput" onChange={ (e) => {
              setDescription(e.target.value);
          }}/>
          <button onClick={submitReview}>Insert</button>
      </form>
      <input type="text" name="searchInput" placeholder="Search" onChange={ (e) => {
          setSearchText(e.target.value);
      }}/>
      <hr/>
      <div className="divTable">
          <table>
              <thead>
                  <tr>
                      <th>Lagerplatz</th>
                      <th>Artikelnummer</th>
                      <th>Anzahl</th>
                      <th>Hersteller</th>
                      <th className="td-icon">+</th>
                      <th className="td-icon">-</th>
                      <th>Edit</th>
                      <th>X</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      filteredList.map( (article) => {
                        return (
                          <Listing article={article} filteredList={filteredList} setFilteredList={setFilteredList}/>
                      )})
                  }
              </tbody>
          </table>
      </div>
    </div>
  );
}

export default App;
