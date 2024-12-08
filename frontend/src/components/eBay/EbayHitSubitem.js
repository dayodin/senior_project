import React from "react";
import { Box, CardMedia, Typography, CardActionArea } from '@mui/material';

const EbayHitSubitem = (props) => {

    const profit = (props.mv - props.value.total).toFixed(2)
    const hitItem = props.value.item

    let imageUrl = "https://pics.ebaystatic.com/aw/pics/nextGenVit/imgNoImg.gif";
    if (hitItem.image != undefined && hitItem.image.imageUrl != undefined) imageUrl = hitItem.image.imageUrl

    return (
        <Box sx={{ m: 1, display: 'flex' }}>
            <CardActionArea href={hitItem.itemWebUrl}>
                <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={imageUrl}
                    alt="Live from space album cover"
                />
            </CardActionArea>
            <Box sx={{ flexDirection: 'column', width: "100%", ml: 1 }}>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Total Price: {props.value.total}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Profit: {profit}
                </Typography>
            </Box>
        </Box>
    )
}

export default EbayHitSubitem;