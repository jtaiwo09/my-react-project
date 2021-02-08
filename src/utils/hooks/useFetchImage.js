import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchImage(searchTerm, page) {
    const [images, setimages] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [error, seterror] = useState([]);
    
    const key = process.env.REACT_APP_UNSPLASH_KEY
    const api = process.env.REACT_APP_UNSPLASH_API

    function fetch(){
        const url = searchTerm === '' ? 'photos?':`search/photos?query=${searchTerm}&`;
            axios.get(`${api}/${url}client_id=${key}&page=${page}`)
            .then(res => {
                seterror([])
                if(searchTerm === ''){
                    fetchRandom(res);
                } else {
                    fetchSearch(res)
                }
                 setisLoading(false);
            }).catch(e => {
                setimages([])
                seterror(['Ooops! Unable to load Images...'])
                setisLoading(false)
            })
    }

    function fetchSearch(res) {
        if(page > 1){
            setimages([...images, ...res.data.results])
        } else {
            setimages([...res.data.results])
        }
    }
    function fetchRandom(res) {
            setimages([...images, ...res.data]);
    }
    useEffect(() => {
        setisLoading(true);
        fetch()
    }, [searchTerm, page]);
    
    return [images, setimages, isLoading, error];
}

