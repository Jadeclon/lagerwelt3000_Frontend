import React from 'react';
import Axios from 'axios';
import './Modal.css';
import { useHistory } from 'react-router-dom'

const Modal = ({setOpenModal, article, setArticle, user, databaseLocation}) => {

    let history = useHistory(); 

    const editHandler = () => {

        Axios.put(`${databaseLocation}/api/update`, {
            article: article,
        }).then( (response) => {
            console.log(response);
        });
        setOpenModal(false);
        if(history.location.pathname !== "/home") {
            history.push("/home");
        }
        setArticle(article);
    };


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="xContainer">
                    <button onClick={ () => { setOpenModal(false); history.push("/home"); }}> X </button>
                </div>
                <div className="title">
                    <h1>{ article.articleNumber }</h1>
                </div>
                <div className="imgDiv">
                    <img alt="Alternator/Starter" src={article.URL} width="400" height="400"></img>
                </div>
                <div className="body">

                    <div className="rowDiv">
                        <label htmlFor="input_articleNumber">Artikelnummer</label>
                        <input id="input_articleNumber" placeholder="Artikelnummer" onChange={ (e) => { article.articleNumber = e.target.value; } } defaultValue={article.articleNumber}></input>
                    </div>
                    
                    <div className="rowDiv">
                        <label htmlFor="input_articleNumber">Vergleichsnummern</label>
                        <input id="input_oe" placeholder="Vergleichsnummern" onChange={ (e) => { article.oe = e.target.value; } } defaultValue={article.oe}></input>
                    </div>

                    <div className="rowDiv">
                        <label htmlFor="input_storagePlace">Lagerplatz</label>
                        <input id="input_storagePlace" placeholder="Lagerplatz" onChange={ (e) => { article.storagePlace = e.target.value; } } defaultValue={article.storagePlace}></input>
                    </div>
                    
                    <div className="rowDiv">
                        <label htmlFor="input_quantity">Anzahl</label>
                        <input id="input_quantity" placeholder="Anzahl" onChange={ (e) => { article.quantity = e.target.value; } } defaultValue={article.quantity}></input>
                    </div>

                    <div className="rowDiv">
                        <label htmlFor="input_power">Leistung</label>
                        <input id="input_power" placeholder="Leistung" onChange={ (e) => { article.power = e.target.value; } } defaultValue={article.power}></input>
                    </div>

                    <div className="rowDiv">
                        <label htmlFor="input_manufacturer">Hersteller</label>
                        <input id="input_manufacturer" placeholder="Hersteller" onChange={ (e) => { article.manufacturer = e.target.value; } } defaultValue={article.manufacturer}></input>
                    </div>

                    <div className="rowDiv">
                        <label htmlFor="input_brand">Marke</label>
                        <input id="input_brand" placeholder="Marke" onChange={ (e) => { article.brand = e.target.value; } } defaultValue={article.brand}></input>
                    </div>

                    <div className="rowDiv">
                        <label htmlFor="input_price">Preis</label>
                        <input id="input_price" placeholder="Preis" onChange={ (e) => { article.ebayPlus = e.target.value; } } defaultValue={article.ebayPlus}></input>
                    </div>

                    <div className="rowDiv">
                        <label htmlFor="input_grooves">Rippen</label>
                        <input id="input_grooves" placeholder="Rippen" onChange={ (e) => { article.Grooves = e.target.value; } } defaultValue={article.Grooves}></input>
                    </div>

                    <div className="rowDiv">
                        <label htmlFor="input_diameter">Durchmesser</label>
                        <input id="input_diameter" placeholder="Durchmesser" onChange={ (e) => { article.Diameter = e.target.value; } } defaultValue={article.Diameter}></input>
                    </div>

                    <div className="rowDiv">
                        <label htmlFor="input_volt">Volt</label>
                        <input id="input_volt" placeholder="Volt" onChange={ (e) => { article.Volt = e.target.value; } } defaultValue={article.Volt}></input>
                    </div>

                    <div className="rowDiv">
                        <label htmlFor="input_url">URL</label>
                        <input id="input_url" placeholder="URL" onChange={ (e) => { article.URL = e.target.value; } } defaultValue={article.URL}></input>
                    </div>
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