import React, { useContext, useEffect, useState } from 'react';
import fetchData from '../../../helpers/fetchData';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AddSeriesContext } from '../../../context/AddSeriesContext';

const AuthorDropDown = (props) => {
    const [collection, setCollection] = useState([]);
    const [selectedName, setSelectedName] = useState([]);

    const context = useContext(AddSeriesContext);

    const handleChange = (e) => {
        const {
            target: { value },
        } = e;
        
        const update = { "author_id": value._id};
        context.setSeries({ ...context.series, ...update });

        const name = value.first + " " + value.last;
        setSelectedName([name]);
    };

    useEffect(() => {
        fetchData('authors', setCollection);
    }, [props.refresh]);

    return (
        <FormControl sx={{ m: 1, minWidth: 240 }}>
            <InputLabel>{context.default}</InputLabel>
            <Select
                defaultValue = {context.default}
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