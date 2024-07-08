import React, { useState } from 'react';
import { Button, FormControl, TextField, Grid, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { baseUrl } from '../config';
import fetchData from '../helpers/fetchData';
import IsbnDbItem from '../components/result_item/isbndb_item';

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  }));

const AddMultipleMangaPage = () => {
    const [query, setQuery] = useState({
        series: "One Piece",
        author: "Eiichiro Oda",
        publisher: "VIZ",
        volume: "1"
    })
    const [data, setData] = useState([]);

    const handleChange = (e) => {
        setQuery(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const getGantz = async () => {
        fetchData('isbndb', setData);

        console.log(await data)
        console.log(await data.data.filter(item => item.language === "en"))

        setData([]);
    }

    const getBooks = async () => {
        // fetchData('isbndb', setData);
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
            body: JSON.stringify({
                series, author, publisher, volume
            }),
        })
        response = await response.json();

        console.log(response);
        console.log(volume)
        response = response.data.filter(item => item.language === "en" 
                                                //  && (item.binding === "Paperback" || item.binding === "Comic") 
                                                 && item.binding !== "Kindle Edition"
                                                 && item.title.toLowerCase().includes(query.series.toLowerCase())
                                                 && (item.title.includes(` ${volume} `) 
                                                    || item.title.includes(` ${volume}:`) 
                                                    || item.title.endsWith(` ${volume}`)
                                                    || item.title.endsWith(` (${volume})`)
                                                    || item.title.includes(` ${volume}-`)
                                                    || item.title.includes(`-${volume}-`)
                                                    || item.title.includes(`-${volume} `)
                                                    || item.title.endsWith(`-${volume}`)
                                                    )
                                        );
        console.log(response);                                
        setData(response)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                            <IsbnDbItem key={item.isbn} item={item} />
                        ))}
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddMultipleMangaPage;