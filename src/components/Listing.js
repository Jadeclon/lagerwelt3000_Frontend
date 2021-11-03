import React from 'react';
import Axios from 'axios';
import QRCode from 'qrcode';
import {useState, useEffect} from "react";



const Listing = ({article, filteredList, setFilteredList, openModal, setOpenModal, setSelectedArticle, databaseLocation}) => {


      const [img, setImg] = useState('');

      const host = window.location.host;

      useEffect(() => {
            generateQRCode();
      }, []) // eslint-disable-line react-hooks/exhaustive-deps

      const generateQRCode = () =>
      {
            QRCode.toDataURL("http://"+host+"/qr/"+article.articleId).then( (data) => {
                  setImg(data);
            });
      }

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
      

      // const deleteHandler = (articleId) => {
      //       Axios.delete(`${databaseLocation}/api/delete/${articleId}`);
      //       setFilteredList(filteredList.filter( (el) => el.articleId !== article.articleId));
      // };


      return (
            <tr>
                  <td>{ article.brand }</td>
                  <td>{ article.power }</td>
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
                  {/* <td onClick={editHandler} className="td-icon">
                        <button className="info-btn">
                              <i className="fas fa-info-circle"></i>
                        </button>
                  </td> */}
                  <td className="td-icon">
                        <button onClick={editHandler} className="update-btn" disabled>
                              <i className="fas fa-edit"></i>
                        </button>
                  </td>
                  {/* <td>
                        <img alt="QRCode" src={img}></img>
                  </td> */}
                  {/* <td className="td-icon">
                        <button onClick={ () => {deleteHandler(article.articleId)} } className="trash-btn" disabled>
                              <i className="fas fa-trash"></i>
                        </button>
                  </td> */}
            </tr>
      )

};


export default Listing;