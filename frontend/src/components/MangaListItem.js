import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, Typography, Button } from "@mui/material";

const MangaListItem = (props) => {
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
                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography> */}
                </CardContent>
                {/* <CardActions> */}
                    {/* <Button size="small">Learn More</Button> */}
                {/* </CardActions> */}
            </Card>
        </Box>
    )
} 

export default MangaListItem;