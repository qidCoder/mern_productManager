//this displays a specific product
//we want the product to render as soon as the page loads, so we need to use useEffect

import React, { useEffect, useState } from "react";
import Axios from "axios";//we need this to make request to our server  
import { navigate, Link } from "@reach/router";

const Product = (props) => {

    //need state variables to store the data from the database
    const [product, setProduct] = useState(null);//set default to no data

    useEffect( () => {
        Axios.get(`http://localhost:8000/api/products/${props.id}`)
        .then( (res) => {
            setProduct(res.data);
        })
        .catch( (err) => {
            console.error(err);
        })

    }, [props.id]);

    //function to handle the button that will delete a product
    function handleDelete(delete_id){
        //to delete from the database, we will run the delete URL we defined
        Axios.delete(`http://localhost:8000/api/products/${delete_id}`)
        .then( res => {
            console.log("deleted product", res.data);
            navigate('/');
        })
        .catch( err => {console.error(err)})

    }




    ///////////////////////////////////
    //default html while API data is loading..database hasn't responded to our request for data yet
    if( product === null){
        return "Loading..."
    }

    return (
            <div key={product._id} className="row mb-2 justify-content-center">
                <div className="col-md-7 p-2 shadow border rounded text-center">
                    <h3>{product.title}</h3>
                    <p>Price: ${product.price}</p>
                    <p>Description: {product.description}</p>

                    {/* create a button to delete the product */}
                    <button 
                        className="btn btn-outline-danger"
                        onClick={ e => {handleDelete(product._id)}}>Delete this product</button>



                
                </div>
            </div>
            );
};

export default Product;