import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import UpdateDelete from "./settings/UpdateDelete";
import deleteData from "../../helpers/deleteData";

const SeriesSubItem = (props) => {

    const onClickDelete = async () => {
        console.log("hi")
        deleteData(`manga/${props.value._id}`);
        props.refresh()
    }

    return (
        <Box sx={{ m: 1, minWidth: 250 }}>  
            <Card variant="outlined">
                <CardHeader 
                    action={
                        <UpdateDelete onDelete={onClickDelete} />
                    }
                    title={`Vol. ${props.value.volume}`} 
                    subheader={`Price: ${props.value.price}`} />
            </Card>
        </Box>
    )

}

export default SeriesSubItem;