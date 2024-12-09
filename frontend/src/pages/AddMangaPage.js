import React, { useState } from 'react';

import { Button, FormControl, TextField, Grid, Box } from '@mui/material';

import { baseUrl } from '../config';

import IsbnDbItem from '../components/result_item/isbndb_item';

import { filterISBNData } from '../helpers/isbndb_helpers/isbnDataHelpers';
import { getOrAddAuthors } from '../helpers/db_helpers/authorHelpers';
import { getOrAddSeries } from '../helpers/db_helpers/seriesHelpers';
import { getOrAddManga } from '../helpers/db_helpers/mangaHelpers';

const AddMultipleMangaPage = () => {
    const [query, setQuery] = useState({
        series: "Neon Genesis",
        author: "",
        publisher: "",
        volume: "1"
    })

    const [data, setData] = useState([]);

    const handleChange = (e) => {
        setQuery(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const getBooks = async () => {

        const series = query.series;
        const author = query.author;
        const publisher = query.publisher;
        const volume = query.volume;
        const body = { series, author, publisher, volume }

        let response = await fetch(`${baseUrl}/isbndb`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body),
        })

        response = await response.json();

        console.log(response);

        const filteredResponse = filterISBNData(response, series, volume)
                            
        setData(filteredResponse)
    }

    const onAdd = async (manga) => {

        const authors = manga.authors;
        const series = query.series;
        const volume = query.volume;
        const price = 10;

        const author_ids = await getOrAddAuthors(authors);
        const series_id = await getOrAddSeries(series, author_ids);
        const manga_id = await getOrAddManga(manga, series_id, author_ids, volume, price);

        return manga_id;
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid xs={3} sx={{ m: 3, textAlign: 'center' }}>
                    <FormControl>
                        <TextField 
                            sx={{ m: 1, minWidth: 240 }} 
                            label="Series" 
                            name='series' 
                            defaultValue={query.series}
                            onChange={handleChange} 
                            required="True"
                        />
                        <TextField 
                            sx={{ m: 1, minWidth: 240 }} 
                            label="Author" 
                            name='author' 
                            defaultValue={query.author}
                            onChange={handleChange} 
                        />
                        <TextField 
                            sx={{ m: 1, minWidth: 240 }} 
                            label="Publisher" 
                            name='publisher' 
                            defaultValue={query.publisher}
                            onChange={handleChange} 
                        />
                        <TextField 
                            sx={{ m: 1, minWidth: 240 }} 
                            label="Volume" 
                            name='volume' 
                            defaultValue={query.volume}
                            onChange={handleChange} 
                        />
                        <Button  sx={{ m: 1, minWidth: 60 }} variant='contained' onClick={getBooks}>Get Books</Button>
                    </FormControl>
                </Grid>
                <Grid xs={7} sx={{ mt: 3 }} textAlign={ "left" }>
                        {data.map(item => (
                            <IsbnDbItem key={item.isbn} item={item} onAdd={onAdd} />
                        ))}
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddMultipleMangaPage;