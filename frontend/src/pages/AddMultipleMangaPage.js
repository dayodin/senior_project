import React, { useState } from 'react';
import { Button, FormControl, TextField, Grid, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { baseUrl } from '../config';
import IsbnDbItem from '../components/result_item/isbndb_item';
import { authorExists, addAuthor } from '../helpers/authorHelpers';
import { seriesExists, addSeries } from '../helpers/seriesHelpers';
import { mangaExists, addManga } from '../helpers/mangaHelpers';
import { filterISBNData } from '../helpers/filterISBNData';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
  }));


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
        console.log(volume)

        const filteredResponse = filterISBNData(response, series, volume)

        console.log(filteredResponse);                                
        setData(filteredResponse)
    }

    const onAdd = async (manga) => {
        const authors = manga.authors;
        const series = query.series;
        const volume = query.volume;
        const price = 10;

        const author_ids = await getOrAddAuthors(authors);
        const series_id = await getOrAddSeries(series, author_ids);
        const manga_id = await getOrAddManga(manga, series_id, author_ids, volume, price)

        // let new_manga = {...manga, series_id: series_id, author_ids: author_ids, volume: volume, volume_price: volume_price}

        console.log(author_ids);
        console.log(series_id);
        console.log(manga_id)
        
    }

    const getOrAddManga = async (manga, series_id, author_ids, volume, price) => {
        let updated_manga = {...manga, series_id: series_id, author_ids: author_ids, volume: volume, price: price}

        let manga_id = await mangaExists(updated_manga)

        return manga_id ? manga_id : await addManga(updated_manga);
    }

    const getOrAddSeries = async (series, author_ids) => {
        let series_id = await seriesExists(series);
        
        return series_id ? series_id : await addSeries(series, author_ids)
    }

    const getOrAddAuthors = async (authors) => {
        const author_ids = []
        
        for (const author of authors) {

            let author_id = await authorExists(author);

            // if author is not in manga db
            if (!author_id) author_id = await addAuthor(author)
            
            author_ids.push(author_id);
        }

        return author_ids;
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid xs={3} sx={{ m: 3, textAlign: 'center' }}>
                    <FormControl>
                            {/* <ElementSelect DropDown={SeriesDropDown} AddForm={AddSeriesForm} addText={"Add Series"} /> */}
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
                        {/* <Button  sx={{ m: 1, minWidth: 60 }} variant='contained' onClick={getGantz}>Get Gantz</Button> */}
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