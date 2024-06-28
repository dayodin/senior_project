import React, { useState } from 'react';
import postData from '../../helpers/postData';
import { TextField, Button, FormControl } from '@mui/material';

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
        const body = { first, last };

        postData('authors', body);

        setAuthor({f_name: "", l_name: ""});
        
        props.handleOpen();
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 240 }}>
            <TextField sx={{ m: .25 }} label="First Name" name='f_name' onChange={handleChange}></TextField>
            <TextField sx={{ m: .25 }} label="Last Name" name='l_name' onChange={handleChange}></TextField>
            <Button sx={{ m: .25 }} variant="contained" onClick={handleSubmit}>Add</Button>
        </FormControl>
    );
};

export default AddAuthorForm;