import React, { useState } from 'react';
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
            <div className="form">
                <h1>Add New Series</h1>
                <form>
                    <TextInput
                        label="Series Name"
                        onChange={handleChange}
                        name = 'name'
                        value={series.name}
                    />
                </form>
                <button onClick={handleSubmit}>Add</button>
            </div>
        </React.Fragment>
    );
};

export default AddSeriesForm;
