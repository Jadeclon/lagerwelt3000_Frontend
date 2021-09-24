import React from 'react';
import ArticleList from './ArticleList';
import Axios from 'axios';
import './Modal.css';
import { useEffect } from "react";
import { useHistory } from 'react-router-dom'

const Modal = ({setOpenModal, article, updateArticleInList, user, databaseLocation}) => {

    let history = useHistory(); 

    const editHandler = () => {

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
                    <button onClick={ () => { setOpenModal(false); history.push("/home"); }}> X </button>
                </div>
                <div className="title">
                    <h1>You are currently editing { article.articleNumber }</h1>
                </div>
                <div className="body">
                    {/* <label htmlFor="input_articleNumber">Artikelnummer</label> */}
                    <input id="input_articleNumber" placeholder="Artikelnummer" defaultValue={article.articleNumber}></input>
                    <input id="input_oe" placeholder="Vergleichsnummern" defaultValue={article.oe}></input>

                    {/* <label htmlFor="input_storagePlace">Lagerplatz</label> */}
                    <input id="input_storagePlace" placeholder="Lagerplatz" defaultValue={article.storagePlace}></input>
                    <input id="input_quantity" placeholder="Anzahl" onChange={ (e) => { article.quantity = e.target.value; } } defaultValue={article.quantity}></input>
                    <input id="input_power" placeholder="Leistung" defaultValue={article.power}></input>

                    {/* <label htmlFor="input_manufacturer">Hersteller</label> */}
                    <input id="input_manufacturer" placeholder="Hersteller" defaultValue={article.manufacturer}></input>

                    {/* <label htmlFor="input_brand">Marke</label> */}
                    <input id="input_brand" placeholder="Marke" defaultValue={article.brand}></input>

                    {/* <label htmlFor="input_grooves">Rippen</label> */}
                    <input id="input_grooves" placeholder="Rippen" defaultValue={article.grooves}></input>
                    <input id="input_diameter" placeholder="Durchmesser" defaultValue={article.diameter}></input>
                    <input id="input_url" placeholder="URL" defaultValue={article.URL}></input>
                </div>
                <div className="footer">
                    <button id="cancelBtn" onClick={ () => { setOpenModal(false); history.push("/home"); }}>Abbrechen</button>
                    { user.level > 3 && <button onClick={editHandler}>Update</button> }
                </div>
            </div>
        </div>
    );
};

export default Modal;