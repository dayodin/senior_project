import React, { useState } from 'react';
import { TextInput } from 'evergreen-ui'
import AuthorSelect from '../../components/mongo/AuthorSelect';
import SeriesSelect from '../../components/mongo/SeriesSelect';
import { baseUrl } from '../../config';

const AddBookForm = () => {
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
    }

    return (
        <React.Fragment>
            <AuthorSelect book={book} setId={setBook} />
            <SeriesSelect book={book} setId={setBook} />
            <div className="form">
                <form>
                    <h4>Volume</h4>
                    <TextInput
                        label="Volume" 
                        description="Enter volume"
                        onChange={handleChange}
                        name = 'volume'
                        value={book.volume}
                    />
                    <h4>Price</h4>
                    <TextInput
                        label="Price" 
                        description="Enter price"
                        onChange={handleChange}
                        name = 'volume_price'
                        value={book.volume_price}
                    />
                </form>
                <button onClick={handleSubmit}>Add</button>
            </div>
        </React.Fragment>
    );
};

export default AddBookForm;
