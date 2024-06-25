import React, { useState } from 'react';
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
            <SeriesDropDown book={props.book} setId={props.setId} refresh={refresh} />
            <button onClick={onClickAddSeries}>Add Series</button>
            { showAddSeries ? <AddSeriesForm onAddSeries={onAddSeries} /> : null } 
        </React.Fragment>
    );
};

export default SeriesSelect;