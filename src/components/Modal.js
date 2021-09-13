import React from 'react';
import ArticleList from './ArticleList';
import Axios from 'axios';
import './Modal.css';

const Modal = ({setOpenModal, article, updateArticleInList}) => {

    const databaseLocation = "https://lagerwelt3000.herokuapp.com"; //"http://localhost:5000";

    const editHandler = () => {
        article.articleNumber = document.getElementById("articleNumber").value;
        article.storagePlace = document.getElementById("storagePlace").value;
        article.manufacturer = document.getElementById("manufacturer").value;

        Axios.put(`${databaseLocation}/api/update`, {
            article: article,
        }).then( (response) => {
            console.log(response);
        });
        setOpenModal(false);
        // updateArticleInList();
    };


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="xContainer">
                    <button onClick={ () => setOpenModal(false) }> X </button>
                </div>
                <div className="title">
                    <h1>You are currently editing { article.articleNumber }</h1>
                </div>
                <div className="body">
                    <label htmlFor="articleNumber">Articlenumber</label>
                    <input id="articleNumber" defaultValue={article.articleNumber}></input>

                    <label htmlFor="storagePlace">Storage Place</label>
                    <input id="storagePlace" defaultValue={article.storagePlace}></input>

                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input id="manufacturer" defaultValue={article.manufacturer}></input>
                </div>
                <div className="footer">
                    <button id="cancelBtn" onClick={ () => setOpenModal(false) }>Cancel</button>
                    <button onClick={editHandler}>Apply</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;