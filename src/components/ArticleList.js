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

    useEffect( () => {
        console.log("searchText changed!");
        searchHandler();
    }, [searchType]);
  
  

    const searchHandler = () => {
        console.log("searchHandler: " + searchType);
        const searchTxt = searchText.toLowerCase();
        if(searchType == "articleNumber") {
            setFilteredList(articleList.filter(article => article.articleNumber.toLowerCase().includes(searchTxt) || article.oe.toLowerCase().includes(searchTxt)));
        }
        else if(searchType == "storagePlace") {
            var shitList = articleList.filter(article => article.storagePlace.toLowerCase().includes(searchTxt));
            setFilteredList( shitList.sort(function(a, b){
                let x = a.storagePlace.toLowerCase();
                let y = b.storagePlace.toLowerCase();
                if (x.length == 0) { return -1; }
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
              })
            );
        }
    };


    const loadArticleList = () => {
        Axios.get(`${databaseLocation}/api/get`).then( (response) => {
            console.log("Data loaded")
            setArticleList(response.data);
            setSearchText("");
        });
        setFilteredList(articleList);
      };


  

    if(!loggedIn) {
        console.log("NOT logged in!");
        return <Redirect to="/" />;
    }

    return (
        <div>
            <select onChange={ (e) => {
                        setSearchType(e.target.value);
                        searchHandler();
                    }} id="selectSearch" className="select_searchType">
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