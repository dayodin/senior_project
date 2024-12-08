import React from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const IsbnDbItem = (props) => {
    // const theme = useTheme();

    const onClickAdd = () => {
        props.onAdd(props.item);
    }

    return (
        <Card sx={{ m: 1, display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={props.item.image}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {props.item.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        By {props.item.authors.map((author) => author) }
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {props.item.publisher}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {props.item.date_published}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button sx={{ m: 1, minWidth: 60, marginLeft: 'auto' }} variant='contained' onClick={onClickAdd}>Add</Button>
                </CardActions>
            </Box>
        </Card>
    )
}

export default IsbnDbItem;