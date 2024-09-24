import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { fetchData } from '../helpers/apiHelpers';
import { getEBayData, filterEbayData } from '../helpers/eBayDataHelpers';
import { baseUrl } from '../config';

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
        // console.log(results);
        if (results !== undefined){
            results = results.map(hit => {
                let shipping = 6;
                if (hit.shippingOptions !== undefined) {
                    if (hit.shippingOptions[0].shippingCostType === "FIXED"){
                        shipping = parseFloat(hit.shippingOptions[0].shippingCost.value);
                    } 
                }
                const total = (parseFloat(shipping) + parseFloat(hit.price.value)).toFixed(2)
                return {
                    series: series_name,
                    volume: book.volume,
                    total: total,
                    price: hit.price.value,
                    shipping: shipping,   
                    url: hit.itemWebUrl,
                    item: hit
                }
            })
            results = results.filter(hit => hit.total - book.price < 0 && 
                !hit.item.title.toLowerCase().includes('in japanese') && 
                hit.item.title.includes(book.volume) &&
                hit.item.condition !== "Acceptable").sort(compareTotals)
            console.log(results);
        }
    }

    const handleSubmit = async () => {
        const responseArr = await getEBayData();
        console.log(responseArr);

        filterEbayData(responseArr);
        // manga.forEach(async (book) => {
        //     const series_id = book.series_id;
        //     const author_id = book.author_id;

        //     let volume = book.volume;
        //     let price = book.price;
        //     // let series_name = book.title;
        //     let series_name = series.find((ser) => ser._id === series_id).name;
        //     console.log(series_name)
        //     // let author_name = authors.find((auth) => auth._id === author_id);
        //     // author_name = author_name.first + " " + author_name.last;

        //     try {
        //         let response = await fetch(`${baseUrl}/getManga`, {
        //             method: "POST",
        //             headers: {
        //                 "content-type": "application/json"
        //             },
        //             body: JSON.stringify({
        //                 series_name, volume, price
        //                 // series_name, author_name, volume, price
        //             }),
        //         })
        //         response = await response.json();
        //         // console.log(response);
        //         await findDeals(response.itemSummaries, book, series_name);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // });

        // console.log(manga);
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