import React from 'react';
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "./Modal";

const QRCall = ({openModal, setOpenModal, user, databaseLocation}) => {

    const articleId = useLocation().pathname.substring(4);
    const [article, setArticle] = useState({});

    useEffect( () => {
        
        let cancel = false;
        Axios.get(`${databaseLocation}/api/get/${articleId}`).then( (response) => {
            console.log("Article loaded")
            if (cancel) return;
            console.log(response.data[0]);
            setArticle(response.data[0]);
            // setOpenModal(true);
        });

        return () => { 
            cancel = true;
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    // const incrementHandler = () => {
    //     article.quantity += 1;

    //     Axios.put(`${databaseLocation}/api/updateQuantity`, {
    //         quantity: article.quantity,
    //         articleId: article.articleId,
    //     });
    // };

    // const decrementHandler = () => {
    //     article.quantity -= 1;

    //     Axios.put(`${databaseLocation}/api/updateQuantity`, {
    //         quantity: article.quantity,
    //         articleId: article.articleId,
    //     });
    // };

    

    return (
        <div>
            <Modal setOpenModal={setOpenModal} article={article} user={user} databaseLocation={databaseLocation} />
            {/* <h1>{article.articleNumber}</h1>
            <h2>Hersteller: { article.manufacturer }</h2>
            <button onClick={ () => {incrementHandler()} } className="increment-btn">
                <i className="fas fa-plus"></i>
            </button>
            <button onClick={ () => {decrementHandler()} } className="decrement-btn">
                <i className="fas fa-minus"></i>
            </button>

            <input id="input_articleNumber" placeholder="Artikelnummer" defaultValue={article.articleNumber}></input>
            <input id="input_oe" placeholder="Vergleichsnummern" defaultValue={article.oe}></input>
            <input id="input_storagePlace" placeholder="Lagerplatz" defaultValue={article.storagePlace}></input>
            <input id="input_quantity" placeholder="Anzahl" defaultValue={article.quantity}></input>
            <input id="input_power" placeholder="Leistung" defaultValue={article.power}></input>
            <input id="input_manufacturer" placeholder="Hersteller" defaultValue={article.manufacturer}></input>
            <input id="input_brand" placeholder="Marke" defaultValue={article.brand}></input>
            <input id="input_grooves" placeholder="Rippen" defaultValue={article.grooves}></input>
            <input id="input_diameter" placeholder="Durchmesser" defaultValue={article.diameter}></input>
            <input id="input_url" placeholder="URL" defaultValue={article.URL}></input> */}
        </div>
    );
}

export default QRCall;