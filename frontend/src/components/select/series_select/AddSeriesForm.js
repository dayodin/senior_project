import React, { useState } from 'react';
import { FormControl, FormLabel, TextField, Button } from '@mui/material';
import ElementSelect from '../ElementSelect.js';
import AuthorDropDown from '../author_select/AuthorDropDown.js';
import AddAuthorForm from '../author_select/AddAuthorForm.js';
import postData from '../../../helpers/postData.js';
import { AddSeriesContext } from '../../../context/AddSeriesContext.js';

const AddSeriesForm = (props) => {
    const [series, setSeries] = useState({
        name: "",
        author_id: "", // make it so there can be multiple authors
        volumes: null,
        ongoing: null,
        alternative_names: null,
    });

    const handleSeriesChange = (e) => {
        setSeries(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async () => {
        const name = series.name;
        const author_id = series.author_id;
        const body = { name, author_id };

        postData('series', body);

        setSeries({name: ""});
        
        props.handleOpen();
    }

    return (
        <AddSeriesContext.Provider value={{series: series, setSeries: setSeries}}>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
                <FormLabel>Series</FormLabel>
                <TextField 
                    sx={{ m: .25 }} 
                    label='Series Name' 
                    name='name' 
                    onChange={handleSeriesChange} 
                    required={true}/>
                <FormLabel>Author</FormLabel>
                <ElementSelect DropDown={AuthorDropDown} AddForm={AddAuthorForm} addText={'Add Author'}/>
                <Button sx={{ m: .25 }} variant="contained" onClick={handleSubmit}>Add</Button>
            </FormControl>        
        </AddSeriesContext.Provider>
    );
};

export default AddSeriesForm;
