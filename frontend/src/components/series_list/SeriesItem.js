import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import fetchData from "../../helpers/fetchData";
import deleteData from "../../helpers/deleteData";
import SeriesSubItem from "./SeriesSubItem";
import UpdateDelete from "./settings/UpdateDelete";

const SeriesItem = (props) => {
    const [author, setAuthor] = useState("")
    const [seriesItems, setSeriesItems] = useState([])
    const [refresh, setRefresh] = useState(false)
    
    const onDelete = () => setRefresh(!refresh);

    useEffect(() => {
        fetchData(`authors/${props.value.author_id}`, setAuthor)
        fetchData(`manga/series/${props.value._id}`, setSeriesItems)
    }, [refresh])
    
    const onClickDelete = async () => {
        seriesItems.forEach((item) => deleteData(`manga/${item._id}`));
        deleteData(`series/${props.value._id}`);
        props.refresh()
    }

    return (
        <Box sx={{ m: 1, maxWidth: 345 }}>
            <Card variant="outlined">
                <CardHeader 
                    action={
                        <UpdateDelete onDelete={onClickDelete} />
                    }
                    title={props.value.name} 
                    subheader={`By: ${author.first} ${author.last}`} />
                {seriesItems.map(item => (
                    <SeriesSubItem value={item} key={item._id} refresh={onDelete}/>
                ))}
            </Card>
        </Box>
    )

}

export default SeriesItem;