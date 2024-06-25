import React from 'react';
import { baseUrl } from '../../config';

const GetManga = () => {

    const handleSubmit = async () => {
        try {
            let response = await fetch(`${baseUrl}/getManga`, {
                method: "GET",
            })
            response = await response.json();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <div className="form">
                <button onClick={handleSubmit}>Add</button>
            </div>
        </React.Fragment>
    );
};

export default GetManga;
