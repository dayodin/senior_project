import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthorSelect from '../author_select/AuthorSelect';
import AuthorDropDown from '../author_select/AuthorDropDown';
import AddAuthorForm from '../author_select/AddAuthorForm';
import { baseUrl } from '../../config';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddSeriesForm = (props) => {
    const [series, setSeries] = useState({
        name: "",
    });
    const [author, setAuthor] = useState({
        f_name: "",
        l_name: ""
    });

    const handleSeriesChange = (e) => {
        setSeries(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleAuthorChange = (e) => {
        setAuthor(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async () => {
        const name = series.name;
        const first = author.f_name;
        const last = author.l_name;

        const author_result = await fetch(`${baseUrl}/authors`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                first, last 
            })
        });

        // author_id = await author_result.json();

        // console.log(await author_result.json());
        const author_id = (await author_result.json()).insertedId;

        await fetch(`${baseUrl}/series`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            name, author_id
          })
          
        }).then(resp => resp.json());

        setAuthor({f_name: "", l_name: ""});
        setSeries({name: ""});

        props.onAddSeries();
        props.handleClose();
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <FormControl sx={{ m: 1, minWidth: 240 }}>
                    <FormLabel>Series</FormLabel>
                    <TextField sx={{ m: .25 }} label='Series Name' name='name' onChange={handleSeriesChange}></TextField>
                    <FormLabel>Author</FormLabel>
                    <AuthorSelect setId={props.setId} />
                    {/* <AuthorDropDown book={props.book} setId={props.setId} />
                    <TextField sx={{ m: .25 }} label="First Name" name='f_name' onChange={handleAuthorChange} required={true}></TextField>
                    <TextField sx={{ m: .25, mb: 1}} label="Last Name" name='l_name' onChange={handleAuthorChange}></TextField> */}
                    <Button sx={{ m: .25 }} variant="contained" onClick={handleSubmit}>Add</Button>
                </FormControl>
            </Box>
        </Modal>
    );
};

export default AddSeriesForm;
