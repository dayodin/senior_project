import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { getEBayData, findDeals } from '../helpers/eBayDataHelpers';
import EbayHitItem from '../components/eBay/EbayHitItem';

const GetDealsPage = () => {
    const [hits, setHits] = useState([])

    const handleSubmit = async () => {
        
        const hits = await getEBayData();

        console.log(hits)

        setHits(hits)

        let allResults = [];        

        for (let i = 0; i < hits.length; i++) allResults.push(...hits[i]);

        allResults.sort((a, b) => b.profit - a.profit)
        
        console.log(allResults)
    }

    return (
        <React.Fragment>
            <Button sx={{ m: 3, minWidth: 60 }} variant="outlined" onClick={handleSubmit}>Get Deals</Button>
            <Grid container spacing={2} sx={{ml: 2}}>
                {hits.map(item => {
                    return <EbayHitItem value={item}/>
                })}
            </Grid>
        </React.Fragment>
    );
}

export default GetDealsPage;