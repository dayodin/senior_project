import React, { useState } from 'react';
import { Button, FormControl } from '@mui/material';
import SeriesDropDown from './SeriesDropDown.js';
import AddSeriesForm from './AddSeriesForm';

const SeriesSelect = (props) => {
    const [showAddSeries, setShowAddSeries] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const onClickAddSeries = () => setShowAddSeries(!showAddSeries);

    const onAddSeries = () => {
        setRefresh(refresh + 1);
        onClickAddSeries();
    }

    return (
        <React.Fragment>
            <FormControl>
                <SeriesDropDown book={props.book} setId={props.setId} refresh={refresh} />
                <Button sx={{ m: 1, minWidth: 240 }} variant="outlined" onClick={onClickAddSeries}>Add Series</Button>
                { showAddSeries ? <AddSeriesForm onAddSeries={onAddSeries} /> : null } 
            </FormControl>
        </React.Fragment>
    );
};

export default SeriesSelect;