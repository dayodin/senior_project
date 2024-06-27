import React, { useState, useEffect } from 'react';
import GetManga from '../eBay/GetEBayData';
import { Button } from '@mui/material';
import { baseUrl } from '../../config';

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

    const findDeals = async (results, book, series_name) => {
        console.log("+++++++++++++");
        console.log("Series: " + series_name)
        console.log("Volume: " + book.volume);
        console.log("Price: " + book.price);
        console.log(results);
        if (results !== undefined){
            results = results.map(hit => {
                let shipping = 6;
                if (hit.shippingOptions !== undefined) {
                    if (hit.shippingOptions[0].shippingCostType === "FIXED"){
                        shipping = parseFloat(hit.shippingOptions[0].shippingCost.value);
                        // console.log((parseFloat(shipping) + parseFloat(hit.price.value)).toFixed(2))
                    } 
                }
                const total = (parseFloat(shipping) + parseFloat(hit.price.value)).toFixed(2)
                return {
                    series: series_name,
                    volume: book.volume,
                    price: hit.price.value,
                    shipping: shipping,
                    total: total,
                    url: hit.itemWebUrl,
                    item: hit
                }
            })
            results = results.filter(hit => hit.total - book.price < 0)
            console.log(results);
        }
    }

    const handleSubmit = async () => {
        manga.forEach(async (book) => {
            const series_id = book.series_id;
            const author_id = book.author_id;

            let volume = book.volume;
            let price = book.price;
            let series_name = series.find((ser) => ser._id === series_id).name;
            let author_name = authors.find((auth) => auth._id === author_id);
            author_name = author_name.first + " " + author_name.last;

            try {
                let response = await fetch(`${baseUrl}/getManga`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        series_name, author_name, volume, price
                    }),
                })
                response = await response.json();
                // console.log(response);
                await findDeals(response.itemSummaries, book, series_name);
            } catch (error) {
                console.log(error);
            }
        });

        // console.log(manga);
    }

    return (
        <React.Fragment>
            {/* <GetManga /> */}
            <Button sx={{ m: 3, minWidth: 60 }} variant="outlined" onClick={handleSubmit}>Get Deals</Button>
        </React.Fragment>
    );
}

const fetchData = async (dest, setFunc) => {
    try {
        await fetch(`${baseUrl}/` + `${dest}`, {
            method: "GET",
        }).then(async resp => {
            setFunc(await resp.json())});
    } catch (err) {
        console.log(err);
    }
}

export default GetDealsPage;