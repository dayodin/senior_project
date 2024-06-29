import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import { baseUrl } from "../../config";
import { CardContent, Typography, Button } from "@mui/material";

const MangaListItem = (props) => {

    const onClickDelete = async () => {
        await fetch(`${baseUrl}/manga/${props.value.id}`, {
            method: 'DELETE',
        })
        .then(res => res.text())
        props.onDelete();
    }

    return (
        <Box sx={{ m: 1, maxWidth: 345 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.value.series} vol. {props.value.volume}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.value.author}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }} >
                        Price: ${props.value.price}
                    </Typography>
                </CardContent>
                <CardActions> 
                    <Button size="small" onClick={onClickDelete} >Delete</Button>
                </CardActions>
            </Card>
        </Box>
    )
} 

export default MangaListItem;