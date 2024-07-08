import React from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, Button, CardActions } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const IsbnDbItem = (props) => {
    const theme = useTheme();

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
                        By {props.item.authors.map((author) => author)}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {props.item.publisher}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {props.item.date_published}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button sx={{ m: 1, minWidth: 60, marginLeft: 'auto' }} variant='contained' onClick={null}>Add</Button>
                </CardActions>
                
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
                </Box> */}
            </Box>
            
    </Card>
    )
}

// src={props.item.image}

export default IsbnDbItem;