import React from "react";
import { Card, CardContent, Typography, Box } from '@mui/material';
import EbayHitSubitem from "./EbayHitSubitem";

const EbayHitItem = (props) => {

    const market_value = props.value[0].market_value

    if (market_value - props.value[0].total <= 5) return;

    return (
        <Card sx={{ m: 1, display: 'flex', minWidth: "25%"}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {props.value[0].title}
                    </Typography>
                    <Typography component="div" variant="h6" color="text.secondary">
                        Market Value: {market_value}
                    </Typography>
                    {props.value.map(item => {
                        if (item !== undefined && market_value - item.total >= 5) {
                            return <EbayHitSubitem value={item} mv={market_value} />
                        }
                    })}
                </CardContent>
            </Box>
        </Card>
    )
}

export default EbayHitItem;