import React, { useState, useEffect } from "react";
import MangaListItem from "./MangaListItem";

const MangaList = (props) => {
    const [manga, setManga] = useState([])

    useEffect(() => {
        if (props.manga.length !== 0
            && props.series.length !== 0
            && props.authors.length !== 0
        ) {
            const refinedData = props.manga.map((item) => {
                const series_id = item.series_id;
                const author_ids = item.author_ids;

                let series_name = props.series.find((ser) => ser._id === series_id).name;
                // let author_name = props.authors.find((auth) => auth._id === author_id);
                let author_name = props.authors[0];
                // author_name = author_name.first + " " + author_name.last;

                return {
                    id: item._id,
                    series: series_name,
                    author: author_name,
                    volume: item.volume,
                    price: item.price
                }
            })

            setManga(refinedData)
        }
    }, [props.manga, props.series, props.authors])

    const onDelete = () => {
        props.fetchAgain();
    }; 

    return (
        <React.Fragment>
            {manga.map(item => (
                <MangaListItem value={item} onDelete={onDelete} key={item.id}/>))}
        </React.Fragment>
    )
}

export default MangaList;