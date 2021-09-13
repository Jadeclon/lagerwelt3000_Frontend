import React from 'react';


const ArticleList = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const databaseLocation = "https://lagerwelt3000.herokuapp.com";
    // const databaseLocation = "http://localhost:5000";

    const submitReview = async () => {

        Axios.post(`${databaseLocation}/api/insert`, {
            title: title,
            description: description
        });
        setArticleList([...articleList, {title: title, body: description}]);
    };


    return (
        <form>
        <label>Insert a new article: </label>
        <input type="text" name="titleInput" onChange={ (e) => {
            setTitle(e.target.value);
        }}/>
        <input type="text" name="descriptionInput" onChange={ (e) => {
            setDescription(e.target.value);
        }}/>
        <button onClick={submitReview}>Insert</button>
    </form>
    )
}


export default ArticleList;