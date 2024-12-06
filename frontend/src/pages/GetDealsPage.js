import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { fetchData,  } from '../helpers/apiHelpers';
import { getEBayData, findDeals } from '../helpers/eBayDataHelpers';

const GetDealsPage = () => {
    const [manga, setManga] = useState([]);
    const [series, setSeries] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAll = () => {
            fetchData('manga', setManga);
            fetchData('series', setSeries);
            fetchData('authors', setAuthors);
        }
        
        fetchAll();
    }, []);

    const handleSubmit = async () => {
        const responseArr = await getEBayData();
        responseArr.forEach(results => {
            // console.log(results);
            findDeals(results.itemSummaries, results.name, results.volume, results.price)
        })
    }

    return (
        <React.Fragment>
            <Button sx={{ m: 3, minWidth: 60 }} variant="outlined" onClick={handleSubmit}>Get Deals</Button>
        </React.Fragment>
    );
}

function compareTotals(a, b) {
    return a.total - b.total;
}

export default GetDealsPage;