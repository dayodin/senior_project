import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import fetchData from '../../../helpers/fetchData';
import { AddMangaContext } from '../../../context/AddMangaContext';

const SeriesDropDown = (props) => {
    const [collection, setCollection] = useState([]);
    const [selectedName, setSelectedName] = useState([]);

    const context = useContext(AddMangaContext);

    const handleChange = (e) => {
        const {
            target: { value },
        } = e;

        const update = { "series_id": value._id, "author_id": value.author_id }
        context.setBook({ ...context.book, ...update });
        
        const name = value.name;
        setSelectedName([name]);
    };

    useEffect(() => {
        fetchData('series', setCollection); 
    }, [props.refresh]);

    return (
        <FormControl sx={{ m: 1, minWidth: 240 }}>
            <InputLabel>Series</InputLabel>
            <Select
                defaultValue = ""
                value={selectedName}
                onChange={handleChange}
                renderValue={(selected) => selected}
                >
                {collection.map(item => (
                    <MenuItem value={item} key={item._id}>{item.name}</MenuItem>))}
            </Select>
        </FormControl>
    );
};

export default SeriesDropDown;