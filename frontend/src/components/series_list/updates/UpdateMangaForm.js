import React, { useState } from 'react';
import { TextField, Button, FormControl } from '@mui/material';
import { AddSeriesContext } from '../../../context/AddSeriesContext';
import putData from '../../../helpers/putData';

const UpdateMangaForm = (props) => {
    const [manga, setManga] = useState(props.manga);

    const handleChange = (e) => {
        setManga(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async () => {
        const volume = manga.volume;
        const price = manga.price;
        const body = { volume, price }

        putData(`manga/${manga._id}`, body);

        props.setMangaItem({...manga, body});
        props.handleUpdate();
    }

    return (
        // <AddSeriesContext.Provider value={{series: series, setSeries: setSeries, default: author_name }}>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
                <TextField 
                    sx={{ m: .25 }} 
                    defaultValue={manga.volume}
                    label="Volume" 
                    name='volume' 
                    onChange={handleChange} 
                />
                <TextField 
                    sx={{ m: .25 }} 
                    defaultValue={manga.price}
                    label="Price" 
                    name='price' 
                    onChange={handleChange} 
                />
                <Button sx={{ m: .25 }} variant="contained" onClick={handleSubmit}>Update</Button>
            </FormControl>
        // </AddSeriesContext.Provider>
    );
};

export default UpdateMangaForm;