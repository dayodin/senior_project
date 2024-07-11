import React, { useState } from 'react';
import { TextField, Button, FormControl } from '@mui/material';
import { AddSeriesContext } from '../../../context/AddSeriesContext';
import { putData } from '../../../helpers/apiHelpers';
import ElementSelect from '../../select/ElementSelect';
import AddAuthorForm from '../../select/author_select/AddAuthorForm';
import AuthorDropDown from '../../select/author_select/AuthorDropDown';

const UpdateSeriesForm = (props) => {
    const [series, setSeries] = useState(props.series);

    const author_name = `${props.author.first} ${props.author.last}`

    const handleSeriesChange = (e) => {
        setSeries(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async () => {
        const name = series.name;
        const author_id = series.author_id;
        const body = { name, author_id }

        putData(`series/${series._id}`, body);

        props.setSeriesItem({...series, body});
        props.handleUpdate();
    }

    return (
        <AddSeriesContext.Provider value={{series: series, setSeries: setSeries, default: author_name }}>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
                <TextField 
                    sx={{ m: .25 }} 
                    defaultValue={series.name}
                    label="Series" 
                    name='name' 
                    onChange={handleSeriesChange} 
                />
                <ElementSelect DropDown={AuthorDropDown} AddForm={AddAuthorForm} addText={"Add Author"} defaultValue={series.author_id}/>
                <Button sx={{ m: .25 }} variant="contained" onClick={handleSubmit}>Update</Button>
            </FormControl>
        </AddSeriesContext.Provider>
    );
};

export default UpdateSeriesForm;