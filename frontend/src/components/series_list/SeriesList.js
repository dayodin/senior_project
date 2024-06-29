import React, { useState, useEffect } from "react";
import fetchData from "../../helpers/fetchData";
import SeriesItem from "./SeriesItem";

const SeriesList = () => {
    const [series, setSeries] = useState([])
    const [refresh, setRefresh] = useState(false)

    const onDelete = () => setRefresh(!refresh);
    
    useEffect(() => {
        fetchData('series', setSeries);
    }, [refresh])

    return (
        <React.Fragment>
            {series.map(item => (
                <SeriesItem value={item} refresh={onDelete} key={item._id}/>
            ))}
        </React.Fragment>
    )
}

export default SeriesList;