import React, { useState } from 'react';
import { Button, FormControl, TextField, Grid, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { baseUrl } from '../config';
import fetchData from '../helpers/fetchData';
import postData from '../helpers/postData';
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
        series: "Neon Genesis",
        author: "",
        publisher: "",
        volume: "1"
    })
    const [authorsData, getAuthorsData] = useState([])
    const [lastAddedAuthor, setLastAddedAuthor] = useState({})
    const [seriesData, getSeriesData] = useState([])
    const [data, setData] = useState([]);

    const handleChange = (e) => {
        setQuery(prev=>({...prev, [e.target.name]: e.target.value}));
    };

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

    const onAdd = async (item) => {
        await fetchData('series', getSeriesData)
        let filteredSeriesData = await seriesData.filter(item => item.name.toLowerCase() === query.series.toLowerCase());
        const author_ids = await getOrAddAuthors(item);
        
        console.log(author_ids);

        if (filteredSeriesData[0] === undefined) {
            const name = item.name;
            const body = { name, author_ids}
            console.log(body);
            console.log("hello");
            filteredSeriesData = [{_id: await postData('series', body).insertedId}];
            // const name = query.series;
            

            // // const name = series.name;
            // // const author_id = series.author_id;
            // const body = { name, author_id };
        }

        console.log(await filteredSeriesData[0]._id)

        let new_item = item;
        const volume_price = 10;
        new_item = {...new_item, series_id: await filteredSeriesData[0]._id, author_ids: author_ids, volume: query.volume, volume_price: volume_price}

        console.log(new_item);
        const response = await postData('manga', new_item);
        console.log(await response)
        // filterSeriesData(seriesInfo)
        // postData("manga", item);
        // console.log(await item);
    }

    const getOrAddAuthors = async (item) => {
        await fetchData('authors', getAuthorsData);
        console.log(authorsData)
        console.log(item.authors);

        const author_ids = []
        
        for (const author of item.authors) {
            let splitter = author.includes(', ') ? ', ' : author.includes(' ') ? ' ' : undefined;
            
            let [first, last] = [,]

            if (splitter === ', ') {
                [last, first] = author.split(splitter)
            } else if (splitter === ' ') {
                [first, last] = author.split(splitter)
            } else {
                first = author;
                last = "";
            }
            
            let filteredAuthorData = authorsData.filter((auth) => auth.first === first && auth.last === last)

            // if author is not in manga db
            if (filteredAuthorData[0] === undefined) {
                let body = { first, last }
                filteredAuthorData = [{_id: await postData('authors', body).insertedId}];
                console.log(await filteredAuthorData[0]._id)
                const _id = await filteredAuthorData[0]._id
                body = { _id, first, last }
            }

            author_ids.push(await filteredAuthorData[0]._id);
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