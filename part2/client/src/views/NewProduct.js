//this displays form for a new product (title, price, description)

import React, { useState } from "react";
import Axios from "axios";
import {navigate} from "@reach/router";

const NewProduct = (props) => {
    //state variables for each input on the form
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    //function to handle the form submission
    const handleSubmit = e => {
        e.preventDefault();//prevents the page from refreshing

        //package the data received in the form in a JSON object and then send it to the database
        const newProduct = {
            title: title,
            price: price,
            description : description
        }

        //send the data to the database via API request using Axios. Promise will be returned
        //this REQuest will go to server/routes/city.routes.js
        //then gets routed to a function (method) in controllers/city.controller.js
        //then our server sends back a response with JSON data
        //the second argument sends the data with the request instead of in the URL
        Axios.post("http://localhost:8000/api/products", newProduct)
        .then( (res) => {
            //let's redirect the user once the database returns a successful response
            navigate("/products");
        })
        .catch( (err) => console.error(err))
    }





    /////////////////////////////////////
    return (
    <div className="container text-center">
        <h1>Product Manager</h1>
        <form onSubmit={ (e) => {
            handleSubmit(e); 
            }}
        >
            {/* Title */}
            <div className="form-group row" style={{backgroundColor : "#f6f6f6", padding: "10px"}}>
                <label className="col-sm-2 col-form-label text-left">Title: </label>
                <div className='col-sm-10'>
                    <input 
                        type="text" 
                        className="form-control"
                        onChange={ (e) => {
                            setTitle(e.target.value);
                        }} 
                    />
                </div>
            </div>

            {/* Price */}
            <div className="form-group row" style={{backgroundColor : "#f6f6f6", padding: "10px"}}>
                <label className="col-sm-2 col-form-label text-left">Price: </label>
                <div className='col-sm-10'>
                <input 
                    type="text" 
                    className="form-control"
                    onChange={ (e) => {
                        setPrice(e.target.value);
                    }} 
                />
                </div>
            </div>

            {/* Description */}
            <div className="form-group row" style={{backgroundColor : "#f6f6f6", padding: "10px"}}>
                <label className="col-sm-2 col-form-label text-left">Description: </label>
                <div className='col-sm-10'>
                <textarea 
                    type="textarea" 
                    className="form-control"
                    onChange={ (e) => {
                        setDescription(e.target.value);
                    }} 
                />
                </div>
            </div>

            <input type="submit" className="btn btn-secondary" value="Create" />  

            {/* or   */}
            {/* <button className="btn btn-outline-success">Submit Me with innerHTML tags!</button> */}

        </form>
    </div>
    )};

export default NewProduct;