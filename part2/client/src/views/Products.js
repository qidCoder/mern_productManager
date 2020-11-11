//this displays all the products
//we want the products to render as soon as the page loads, so we need to use useEffect

import React, { useEffect, useState } from "react";
import Axios from "axios";//we need this to make request to our server  
import { navigate, Link } from "@reach/router";
import NewProduct from "../views/NewProduct";

const Products = (props) => {

    //need state variables to store the data from the database
    const [products, setProducts] = useState(null);//set default to no data

    useEffect( () => {
        Axios.get("http://localhost:8000/api/products")
        .then( (res) => {
            setProducts(res.data);
        })
        .catch( (err) => {
            console.error(err);
        })

    }, []);

    //funtion to handle the button that will delete a product
    function handleDelete(delete_id){
        //to delete from the database, we will run the delete URL we defined
        Axios.delete(`http://localhost:8000/api/products/${delete_id}`)
        .then( res => {
            console.log("deleted product", res.data);

            //after the product is deleted from the DB, it is still showing on the page because we didn't update the state
            //let's use filter instead of map to iterate through the list of products and tell it which products to keep and which one to remove
            //filter will filter out anything returned as false (true if you want to keep something, false if you want to remove it)
            const filteredProducts = products.filter( (product) => {
                    //check if the product id is equal to the one that was just deleted
                    //will return tru on all the products that were not deleted
                    //will return false on the product that was deleted
                    return product._id != delete_id;
                }
            )
            //update state now that you have an updated array of products
            setProducts(filteredProducts);
        })
        .catch( err => {console.error(err)})

    }




    ///////////////////////////////////
    //default html while API data is loading..database hasn't responded to our request for data yet
    if( products === null){
        return "Loading..."
    }

    return (
    <div className="container">
        <NewProduct />
        <hr />

        <h1 className="text-center">All Products</h1>

        {/* mapp out all the products since they are in an array */}
        {
            products.map( (product) => {
                return (
                    <div key={product._id} className="row mb-2 justify-content-center">
                        <div className="col-md-7 p-2 text-center">
                            <Link to={"/products/" + product._id}>{product.title}</Link>
                        </div>
                        {/* cursor: pointer makes it look like we can click the image */}
                    </div>
                );
            })
        }
    </div>
    );
};

export default Products;