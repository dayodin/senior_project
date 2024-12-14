import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { getEBayData } from '../helpers/ebay_helpers/eBayDataHelpers';

import { getData } from '../helpers/apiHelpers';
import EbayHitItem from '../components/eBay/EbayHitItem';

const GetDealsPage = () => {
    const [hit, setHit] = useState()
    const [hits, setHits] = useState([])
    const [hitDisplay, setHitDisplay] = useState([])

    const handleSubmit = async () => {

        setHitDisplay([])

        let manga = await getData("manga");

        let results = await Promise.all(manga.map(async (book) => {

            const results = await getEBayData(book);

            if (results !== undefined) {
                setHit(results)
                return results;
            }
        }))

        results = results.filter(hit => hit !== undefined);

        setHits(results);

        let allResults = [];        

        for (let i = 0; i < hits.length; i++) allResults.push(...hits[i]);

        allResults.sort((a, b) => b.profit - a.profit);
    }

    useEffect(() => {
        console.log(hit);
        if ( hit !== undefined ) setHitDisplay([...hitDisplay, <EbayHitItem value={hit} />])
    }, hit);

    return (
        <React.Fragment>
            <Button sx={{ m: 3, minWidth: 60 }} variant="outlined" onClick={handleSubmit}>Get Deals</Button>
            <Grid container spacing={2} sx={{ml: 2}}>
                {hitDisplay.map(item => item)}
            </Grid>
        </React.Fragment>
    );
}

export default GetDealsPage;