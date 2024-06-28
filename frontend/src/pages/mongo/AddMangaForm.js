import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
// import AuthorSelect from '../../components/mongo/AuthorSelect';
import SeriesSelect from '../../components/series_select/SeriesSelect';
import { baseUrl } from '../../config';

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

        console.log(book);

        await fetch(`${baseUrl}/manga`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            series_id, author_id, volume, price 
          })
          
        }).then(resp => resp.json());
        setBook({series_id: "", author_id: "", volume: "", volume_price: ""});
        
        window.location.reload();
    }

    return (
        <React.Fragment>
            <FormControl>
                <SeriesSelect book={book} setId={setBook} />
                {/* <AuthorSelect book={book} setId={setBook} /> */}
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
        </React.Fragment>
    );
};

export default AddBookForm;
