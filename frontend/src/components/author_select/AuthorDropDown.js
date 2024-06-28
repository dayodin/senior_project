import React, { useContext, useEffect, useState } from 'react';
import fetchData from '../../helpers/fetchData';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AddSeriesContext } from '../../context/AddSeriesContext';

const AuthorDropDown = (props) => {
    const [collection, setCollection] = useState([]);
    const [selectedName, setSelectedName] = useState([]);

    const context = useContext(AddSeriesContext);

    const handleChange = (e) => {
        const {
            target: { value },
        } = e;
        
        const name = value.first + " " + value.last;
        const author_id = { "author_id": value._id};
        context.setSeries({ ...context.series, ...author_id });

        setSelectedName([name]);
    };

    useEffect(() => {
        fetchData('authors', setCollection);
    }, [props.refresh]);

    return (
        <FormControl sx={{ m: 1, minWidth: 240 }}>
            <InputLabel>Author</InputLabel>
            <Select
                defaultValue = ""
                value={selectedName}
                onChange={handleChange}
                renderValue={(selected) => selected}
                >
                {collection.map(item => (
                    <MenuItem value={item} key={item._id}>{item.first} {item.last}</MenuItem>))}
            </Select>
        </FormControl>
    );
};

export default AuthorDropDown;