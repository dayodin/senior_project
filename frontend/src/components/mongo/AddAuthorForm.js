import React, { useState } from 'react';
import { TextInput } from 'evergreen-ui'
import { baseUrl } from "../../config.js";

const AddAuthorForm = (props) => {
    const [author, setAuthor] = useState({
        f_name: "",
        l_name: ""
    });

    const handleChange = (e) => {
        setAuthor(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async () => {
        const first = author.f_name;
        const last = author.l_name;
        await fetch(`${baseUrl}/authors`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            first, last 
          })
          
        }).then(resp => resp.json());
        setAuthor({f_name: "", l_name: ""});
        props.onAddAuthor();
    }

    return (
        <React.Fragment>
            <div className="form">
                <h1>Add New Author</h1>
                <form>
                    <TextInput
                        label="First Name"
                        onChange={handleChange}
                        name = 'f_name'
                        value={author.f_name}
                    />
                    <TextInput
                        label="Last Name" 
                        onChange={handleChange}
                        name = 'l_name'
                        value={author.l_name}
                    />
                </form>
                <button onClick={handleSubmit}>Add</button>
            </div>
        </React.Fragment>
    );
};

export default AddAuthorForm;