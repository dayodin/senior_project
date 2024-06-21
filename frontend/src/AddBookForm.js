import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm = () => {
    const [book, setBook] = useState({
        // book_id: '',
        series_name: '',
        author_author: '',
        part: '',
        volume: '',
        book_name: '',
        book_price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/books', book);
            alert(response.data);
            setBook({
                book_id: '',
                series_id: '',
                author_id: '',
                part: '',
                volume: '',
                book_name: '',
                book_price: ''
            });
        } catch (error) {
            console.error('There was an error adding the book!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Book ID:
                <input type="text" name="book_id" value={book.book_id} onChange={handleChange} required />
            </label>
            <label>
                Series ID:
                <input type="text" name="series_id" value={book.series_id} onChange={handleChange} required />
            </label>
            <label>
                Author ID:
                <input type="text" name="author_id" value={book.author_id} onChange={handleChange} required />
            </label>
            <label>
                Part:
                <input type="text" name="part" value={book.part} onChange={handleChange} required />
            </label>
            <label>
                Volume:
                <input type="text" name="volume" value={book.volume} onChange={handleChange} required />
            </label>
            <label>
                Book Name:
                <input type="text" name="book_name" value={book.book_name} onChange={handleChange} required />
            </label>
            <label>
                Book Price:
                <input type="text" name="book_price" value={book.book_price} onChange={handleChange} required />
            </label>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBookForm;
