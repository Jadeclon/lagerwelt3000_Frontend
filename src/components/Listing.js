import React from 'react';
import Axios from 'axios';
import Modal from "./Modal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



const Listing = ({article, filteredList, setFilteredList, openModal, setOpenModal, setSelectedArticle}) => {

      const databaseLocation = "https://lagerwelt3000.herokuapp.com";
      // const databaseLocation = "http://localhost:5000";


      const updateArticleInList = () => {
            console.log("Updating List...");
            setFilteredList( filteredList.map( (el) => {
                  return el.articleId === article.articleId ? {
                        articleId: el.articleId,
                        brand: el.brand,
                        power: el.power,
                        articleType: el.articleType,
                        storagePlace: el.storagePlace,
                        articleNumber: el.articleNumber,
                        quantity: article.quantity,
                        manufacturer: el.manufacturer} : el
            }))
      };

      const incrementHandler = () => {
            article.quantity += 1;

            Axios.put(`${databaseLocation}/api/updateQuantity`, {
                  quantity: article.quantity,
                  articleId: article.articleId,
            });

            updateArticleInList();
      };

      const decrementHandler = () => {
            article.quantity -= 1;

            Axios.put(`${databaseLocation}/api/updateQuantity`, {
                  quantity: article.quantity,
                  articleId: article.articleId,
            });

            updateArticleInList();
      };


      const editHandler = () => {
            setSelectedArticle(article);
            setOpenModal(true);
      };
      

      const deleteHandler = (articleId) => {
            Axios.delete(`${databaseLocation}/api/delete/${articleId}`);
            setFilteredList(filteredList.filter( (el) => el.articleId !== article.articleId));
      };


      return (
            <tr>
                  <td>{ article.storagePlace }</td>
                  <td>{ article.articleNumber }</td>
                  <td id="quantity">{ article.quantity }</td>
                  <td>{ article.manufacturer }</td>
                  <td className="td-icon">
                        <button onClick={ () => {incrementHandler()} } className="increment-btn">
                              <i className="fas fa-plus"></i>
                        </button>
                  </td>
                  <td className="td-icon">
                        <button onClick={ () => {decrementHandler(article)} } className="decrement-btn">
                              <i className="fas fa-minus"></i>
                        </button>
                  </td>
                  <td className="td-icon">
                        <button onClick={ () => {editHandler()} } className="update-btn" disabled>
                              <i className="fas fa-edit"></i>
                        </button>
                  </td>
                  <td className="td-icon">
                        <button onClick={ () => {deleteHandler(article.articleId)} } className="trash-btn" disabled>
                              <i className="fas fa-trash"></i>
                        </button>
                  </td>
            </tr>
      )

};


export default Listing;