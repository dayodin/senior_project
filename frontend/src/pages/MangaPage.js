import React, { useState, useEffect } from 'react';
import { fetchData } from '../helpers/apiHelpers.js';
import SeriesList from '../components/series_list/SeriesList.js';
import { MangaPageContext } from '../context/MangaPageContex.js';

const MangaPage = () => {
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
        <MangaPageContext.Provider value={{manga: manga, setManga: setManga, 
                                           series: series, setSeries: setSeries, 
                                           authors: authors, setAuthor: setAuthors,
                                           fetchAgain: fetchAgain}} >
            <SeriesList />
        </ MangaPageContext.Provider>
    );
};

const fetchAll = async (setManga, setSeries, setAuthors) => {
    fetchData('manga', setManga);
    fetchData('series', setSeries);
    fetchData('authors', setAuthors);
}

export default MangaPage;