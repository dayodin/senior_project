import React, { useState, useEffect } from 'react';
import fetchData from '../helpers/fetchData.js';
import MangaList from '../components/manga_list/MangaList.js';

const ListMangaPage = (props) => {
    const [manga, setManga] = useState([]);
    const [series, setSeries] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetchAll(setManga, setSeries, setAuthors);
    }, []);

    const fetchAgain = () => {
        fetchAll(setManga, setSeries, setAuthors);
    }
    
    return (
        <React.Fragment>
            <MangaList manga={manga} series={series} authors={authors} fetchAgain={fetchAgain} />
        </React.Fragment>
    );
};

const fetchAll = async (setManga, setSeries, setAuthors) => {
    fetchData('manga', setManga);
    fetchData('series', setSeries);
    fetchData('authors', setAuthors);
}

export default ListMangaPage;