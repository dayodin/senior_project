import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
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
            <FormControl sx={{ m: 1, minWidth: 240 }}>
                <TextField sx={{ m: .25 }} label="First Name" name='f_name' onChange={handleChange}></TextField>
                <TextField sx={{ m: .25 }} label="Last Name" name='l_name' onChange={handleChange}></TextField>
                <Button sx={{ m: .25 }} variant="contained" onClick={handleSubmit}>Add</Button>
            </FormControl>
        </React.Fragment>
    );
};

export default AddAuthorForm;