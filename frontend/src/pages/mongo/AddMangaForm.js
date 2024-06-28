import React, { useState } from 'react';
import { TextField, Button, FormControl } from '@mui/material';
import { AddMangaContext } from '../../context/AddMangaContext';
import ElementSelect from '../../components/ElementSelect';
import SeriesDropDown from '../../components/series_select/SeriesDropDown';
import AddSeriesForm from '../../components/series_select/AddSeriesForm';
import postData from '../../helpers/postData';

const AddBookForm = (props) => {
    const [book, setBook] = useState({
        series_id: '',
        author_id: '',
        volume: '',
        volume_price: ''
    });

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async () => {
        const series_id = book.series_id;
        const author_id = book.author_id;
        const volume = book.volume;
        const price = book.volume_price;

        const body = { series_id, author_id, volume, price }

        postData('manga', body);

        setBook({series_id: "", author_id: "", volume: "", volume_price: ""});
        
        window.location.reload();
    }

    return (
        <AddMangaContext.Provider value={{book: book, setBook: setBook}}>
            <FormControl>
                <ElementSelect DropDown={SeriesDropDown} AddForm={AddSeriesForm} addText={"Add Series"} />
                <TextField 
                    sx={{ m: 1, minWidth: 240 }} 
                    label="Volume" 
                    name='volume' 
                    onChange={handleChange} 
                />
                <TextField 
                    sx={{ m: 1, minWidth: 240 }} 
                    label="Price" 
                    name='volume_price' 
                    onChange={handleChange} 
                />
            </FormControl>
            <div>
                <Button sx={{ m: 1, minWidth: 60 }} variant="contained" onClick={handleSubmit}>Submit</Button>
            </div>
        </AddMangaContext.Provider>
    );
};

export default AddBookForm;
