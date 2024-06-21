import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddAuthorForm = () => {
    const [author, setAuthor] = useState({
        f_name: "",
        l_name: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAuthor(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post("http://localhost:8800/authors", author)
            // const result = await axios.get("http://localhost:8800/")
            navigate('/')
            console.log(result)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="form">
            <h1>Add New Author</h1>
            <input type="text" placeholder="First Name" onChange={handleChange} name="f_name"/>
            <input type="text" placeholder="Last Name" onChange={handleChange} name="l_name"/>
            <button onClick={handleSumbit}>Add</button>
        </div>
    );
};

export default AddAuthorForm;
