import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { baseUrl } from "../../config";

const SeriesDropDown = (props) => {
    const [series_name, setSeriesName] = useState([]);
    const [series, setSeries] = useState([]);

    const handleChange = (e) => {
        const {
            target: { value },
        } = e;
        const name = value.name;
        console.log(value)
        const id = { "series_id": value._id};
        const author_id = {"author_id": value.author_id}
        console.log(id)
        console.log(author_id)
        props.setId({ ...props.book, ...{"series_id": value._id, "author_id": value.author_id} });
        // props.setId({ ...props.book, ...author_id });
        
        setSeriesName([name]);
    };

    useEffect(() => {
        const fetchAllSeries = async () => {
            try {
                await fetch(`${baseUrl}/series`, {
                    method: "GET", 
                }).then(async resp => {
                    const ser = await resp.json();
                    setSeries(ser)});
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllSeries();
    }, [props.refresh]);

    return (
        <React.Fragment>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
                <InputLabel id="series-dropdown">Series</InputLabel>
                <Select
                    defaultValue = ""
                    labelId="series-select-label"
                    id="series-select"
                    value={series_name}
                    label="Series"
                    onChange={handleChange}
                    renderValue={(selected) => selected}
                    >
                    {series.map(ser => (
                        <MenuItem value={ser} key={ser._id}>{ser.name}</MenuItem>))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
};

export default SeriesDropDown;