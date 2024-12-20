import React, { useState, useEffect } from "react";
import { Grid, Box, Card, CardHeader, Modal } from '@mui/material';
import { fetchData, deleteData } from "../../helpers/apiHelpers";
import SeriesSubItem from "./SeriesSubItem";
import UpdateDelete from "./settings/UpdateDelete";
import UpdateSeriesForm from "./updates/UpdateSeriesForm";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SeriesItem = (props) => {
    const [series, setSeries] = useState(props.value);
    // const [seriesName, setSeriesName] = useState(props.value.name)
    const [author, setAuthor] = useState("")
    const [seriesItems, setSeriesItems] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    const onSubItemDelete = () => setRefresh(!refresh);

    useEffect(() => {
        fetchData(`authors/${series.author_ids}`, setAuthor)
        fetchData(`manga/series/${series._id}`, setSeriesItems)
    }, [series])
    
    const onClickDelete = async () => {
        seriesItems.forEach((item) => deleteData(`manga/${item._id}`));
        deleteData(`series/${props.value._id}`);
        props.refresh()
    }

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <UpdateSeriesForm series={series} setSeriesItem={setSeries} author={author} handleUpdate={handleOpen} />
                </Box>
            </ Modal>
            <Grid sx={{ m: 1, maxWidth: 345 }}>
                <Card elevation="8">
                    <CardHeader 
                        action={
                            <UpdateDelete onDelete={onClickDelete} onUpdate={handleOpen} />
                        }
                        title={series.name} 
                        subheader={`By: ${author.name}`} />
                    {seriesItems.sort((a, b) => a.volume - b.volume).map(item => (
                        <SeriesSubItem value={item} key={item._id} refresh={onSubItemDelete}/>
                    ))}
                </Card>
            </Grid>
        </React.Fragment>
    )

}

export default SeriesItem;