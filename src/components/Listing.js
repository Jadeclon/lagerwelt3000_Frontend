import React from 'react';
import Axios from 'axios';

const Listing = ({article, filteredList, setFilteredList}) => {

      const databaseLocation = "https://lagerwelt3000.herokuapp.com"; //http://localhost:5000

      const incrementHandler = () => {
            article.quantity = article.quantity+1;

            Axios.put(`${databaseLocation}/api/update`, {
                  quantity: article.quantity,
                  articleId: article.articleId,
            });

            console.log("Changing listItem to " + article.quantity);

            setFilteredList( filteredList.map( (el) => {
                  return el.articleId == article.articleId ? {
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

      const decrementHandler = () => {
            Axios.put(`${databaseLocation}/api/update`, {
                  quantity: article.quantity-1,
                  articleId: article.articleId,
            });
      };


      const editHandler = (title) => {

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
                        <button onClick={ () => {editHandler(article.title)} } className="update-btn">
                              <i className="fas fa-edit"></i>
                        </button>
                  </td>
                  <td className="td-icon">
                        <button onClick={ () => {deleteHandler(article.articleId)} } className="trash-btn">
                              <i className="fas fa-trash"></i>
                        </button>
                  </td>
            </tr>
      )

};


export default Listing;