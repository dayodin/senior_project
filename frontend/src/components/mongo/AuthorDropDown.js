import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { baseUrl } from "../../config";

const AuthorDropDown = (props) => {
    const [author_name, setAuthorName] = useState([]);
    const [authors, setAuthors] = useState([]);

    const handleChange = (e) => {
        const {
            target: { value },
        } = e;
        const name = value.first + " " + value.last;
        const id = { "author_id": value._id};
        props.setId({ ...props.book, ...id });
        setAuthorName([name]);
    };

    useEffect(() => {
        const fetchAllAuthors = async () => {
            try {
                await fetch(`${baseUrl}/authors`, {
                    method: "GET", 
                }).then(async resp => {
                    const auths = await resp.json();
                    let i = 0;
                    auths.forEach((element) => {element.index = i; i++;});
                    setAuthors(auths)});
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllAuthors();
    }, [props.refresh]);

    return (
        <React.Fragment>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
                <InputLabel htmlFor="grouped-select">Author</InputLabel>
                <Select
                    defaultValue = ""
                    labelId="author-select-lable"
                    id="author-select"
                    value={author_name}
                    label="Author"
                    onChange={handleChange}
                    renderValue={(selected) => selected}
                    >
                    {authors.map(auth => (
                        <MenuItem value={auth} key={auth.index}>{auth.first} {auth.last}</MenuItem>))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
};

export default AuthorDropDown;