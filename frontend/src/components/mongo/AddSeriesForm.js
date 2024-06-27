import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
import { TextInput } from 'evergreen-ui'
import { baseUrl } from '../../config';

const AddSeriesForm = (props) => {
    const [series, setSeries] = useState({
        name: "",
    });

    const handleChange = (e) => {
        setSeries(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async () => {
        const name = series.name;
        await fetch(`${baseUrl}/series`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            name
          })
          
        }).then(resp => resp.json());
        setSeries({name: ""});
        props.onAddSeries();
    }

    return (
        <React.Fragment>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
                <TextField sx={{ m: .25 }} label='Series Name' name='name' onChange={handleChange}></TextField>
                <Button sx={{ m: .25 }} variant="contained"onClick={handleSubmit}>Add</Button>
            </FormControl>
        </React.Fragment>
    );
};

export default AddSeriesForm;
