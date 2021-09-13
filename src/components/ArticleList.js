import React, {useState, useEffect} from "react";
import Axios from "axios";
import Listing from './Listing';
import { Redirect } from "react-router-dom";



const ArticleList = ({selectedArticle, setSelectedArticle, loggedIn, openModal, setOpenModal}) => {

    const databaseLocation = "https://lagerwelt3000.herokuapp.com";
    // const databaseLocation = "http://localhost:5000";

    const [articleList, setArticleList] = useState([]);
    const [searchText, setSearchText] = useState([]);
    const [filteredList, setFilteredList] = useState([]);


    const searchHandler = () => {
        setFilteredList(articleList.filter(article => article.Artikelnummer.includes(searchText)));
    };

    const loadArticleList = () => {
        Axios.get(`${databaseLocation}/api/get`).then( (response) => {
            console.log("Data loaded")
            setArticleList(response.data);
            // setSearchText("");
            // searchHandler();
        });
      };

    useEffect( () => {
        searchHandler();
    }, [searchText]);
  
  
    useEffect( () => {
      loadArticleList();
    }, []);
  
  

    if(!loggedIn) {
        console.log("NOT logged in!");
        return <Redirect to="/" />;
    }

    return (
        <div>
            <div className="searchSection">
                <input type="text" name="searchInput" placeholder="Search" onChange={ (e) => {
                        setSearchText(e.target.value);
                    }}
                />
                <hr/>
            </div>
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
                            <Listing
                                key={article.articleId}
                                article={article}
                                filteredList={filteredList}
                                setFilteredList={setFilteredList}
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                                setSelectedArticle={setSelectedArticle}
                            />
                        )})
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}


export default ArticleList;