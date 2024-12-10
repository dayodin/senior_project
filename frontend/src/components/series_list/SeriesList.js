import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { fetchData } from "../../helpers/apiHelpers";
import SeriesItem from "./SeriesItem";

const SeriesList = () => {
    const [series, setSeries] = useState([])
    const [refresh, setRefresh] = useState(false)

    const onDelete = () => setRefresh(!refresh);
    
    useEffect(() => {
        fetchData('series', setSeries);
    }, [refresh])

    return (
        <Grid container spacing={2} sx={{ml: 2, mt: 2}}>
            {series.map(item => (
                <SeriesItem value={item} refresh={onDelete} key={item._id}/>
            ))}
        </Grid>
    )
}

export default SeriesList;