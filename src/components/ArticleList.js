import React, {useState, useEffect} from "react";
import Axios from "axios";
import Listing from './Listing';
import { Redirect } from "react-router-dom";



const ArticleList = ({selectedArticle, setSelectedArticle, loggedIn, openModal, setOpenModal, databaseLocation}) => {



    const [articleList, setArticleList] = useState([]);
    const [searchText, setSearchText] = useState([]);
    const [filteredList, setFilteredList] = useState([]);


    const searchHandler = () => {
        setFilteredList(articleList.filter(article => article.articleNumber.includes(searchText) || article.oe.includes(searchText)));
    };

    const loadArticleList = () => {
        Axios.get(`${databaseLocation}/api/get`).then( (response) => {
            console.log("Data loaded")
            setArticleList(response.data);
            setSearchText("");
            searchHandler();
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
                <input className="searchInput" type="text" name="searchInput" placeholder="Search" onChange={ (e) => {
                        setSearchText(e.target.value);
                    }}
                />
                <hr/>
            </div>
            <div className="divTable">
            <table>
                <thead>
                    <tr>
                        <th>Marke</th>
                        <th>Leistung</th>
                        <th>Lagerplatz</th>
                        <th>Artikelnummer</th>
                        <th>Anzahl</th>
                        <th>Hersteller</th>
                        <th className="td-icon">+</th>
                        <th className="td-icon">-</th>
                        {/* <th>Edit</th>
                        <th>X</th> */}
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
                                databaseLocation={databaseLocation}
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