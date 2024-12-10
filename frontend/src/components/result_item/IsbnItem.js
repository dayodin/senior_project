import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, FormControl, TextField } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const IsbnItem = (props) => {

    const [market_value, setMarketValue] = useState("")

    const handleChange = (e) => {
        setMarketValue(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const onClickAdd = () => {
        // console.log(market_value)
        props.onAdd(props.item, market_value);
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
                <CardActions disableSpacing>
                    <FormControl>
                        <TextField 
                            sx={{ m: 1, minWidth: 240 }} 
                            label="Market Value" 
                            name='market_value' 
                            defaultValue={market_value}
                            onChange={handleChange} 
                            required="True"
                        />
                    </FormControl>
                    <Button sx={{ m: 1, minWidth: 60, marginLeft: 'auto' }} variant='contained' onClick={onClickAdd}>Add</Button>
                </CardActions>
            </Box>
        </Card>
    )
}

export default IsbnItem;