import React, {useState, useEffect} from "react";
import Axios from "axios";
import Listing from './Listing';
import { Redirect } from "react-router-dom";



const ArticleList = ({selectedArticle, setSelectedArticle, loggedIn, openModal, setOpenModal, databaseLocation}) => {



    const [articleList, setArticleList] = useState([]);
    const [searchText, setSearchText] = useState(" ");
    const [searchType, setSearchType] = useState("articleNumber");
    const [filteredList, setFilteredList] = useState([]);


    useEffect( () => {
        loadArticleList();
    }, []);


    useEffect( () => {
        console.log("searchText changed!");
        searchHandler();
    }, [searchText]);
  
  

    const searchHandler = () => {
        const searchTxt = searchText.toLowerCase();
        if(searchType == "articleNumber") {
            setFilteredList(articleList.filter(article => article.articleNumber.toLowerCase().includes(searchTxt) || article.oe.toLowerCase().includes(searchTxt)));
        }
        else if(searchType == "storagePlace") {
            setFilteredList(articleList.filter(article => article.storagePlace.toLowerCase().includes(searchTxt)));
        }
    };

    const searchTypeHandler = (e) => {
        setSearchType(e.target.value);
        searchHandler();
    }


    const loadArticleList = () => {
        Axios.get(`${databaseLocation}/api/get`).then( (response) => {
            console.log("Data loaded")
            setArticleList(response.data);
            setSearchText("");
            // searchHandler();
        });
        setFilteredList(articleList);
      };


  

    if(!loggedIn) {
        console.log("NOT logged in!");
        return <Redirect to="/" />;
    }

    return (
        <div>
            <select onChange={searchTypeHandler} id="selectSearch" className="select_searchType">
                <option value="articleNumber">Artikelnummer</option>
                <option value="storagePlace">Lagerplatz</option>
            </select>
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
                        filteredList.slice(0, 101).map( (article) => {
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