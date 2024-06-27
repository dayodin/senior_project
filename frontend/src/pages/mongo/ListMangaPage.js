import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../config';
import MangaList from '../../components/MangaList.js';

const ListMangaPage = (props) => {
    const [manga, setManga] = useState([]);
    const [series, setSeries] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            fetchData('manga', setManga);
            fetchData('series', setSeries);
            fetchData('authors', setAuthors);
        }
        fetchAll();
    }, []);
    
    return (
        <React.Fragment>
            <MangaList manga={manga} series={series} authors={authors}/>
        </React.Fragment>
    );
};

const fetchData = async (dest, setFunc) => {
    try {
        await fetch(`${baseUrl}/` + `${dest}`, {
            method: "GET",
        }).then(async resp => {
            setFunc(await resp.json())});
    } catch (err) {
        console.log(err);
    }
}

export default ListMangaPage;