import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { getEBayData, findDeals } from '../helpers/eBayDataHelpers';
import EbayHitItem from '../components/eBay/EbayHitItem';

const GetDealsPage = () => {
    const [hits, setHits] = useState([])

    const handleSubmit = async () => {
        
        const responseArr = await getEBayData();

        setHits(responseArr.map(results => findDeals(results.itemSummaries, results.title, results.volume, results.price)));
    }

    return (
        <React.Fragment>
            <Button sx={{ m: 3, minWidth: 60 }} variant="outlined" onClick={handleSubmit}>Get Deals</Button>
            <Grid container spacing={2} sx={{ml: 2}}>
                {hits.map(item => {
                    if (item !== undefined && item[0] !== undefined) {
                        return <EbayHitItem value={item}/>
                    }
                })}
            </Grid>
        </React.Fragment>
    );
}

export default GetDealsPage;