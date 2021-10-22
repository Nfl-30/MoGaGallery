import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useHistory } from "react-router";

export const ListContentContextMovie = createContext()

export const ListContentProviderMovie = props => {

    let history = useHistory()

    const [nilaiContentMovie, setNilaiContentMovie] = useState([])
    const [inputContentMovie, setInputContentMovie] = useState({
        description: "",
        duration: "",
        genre: "", 
        image_url: "",
        rating: "0",
        review: "",
        title: "", 
        year: 1980,
    })
    const [currentIndexMovie, setCurrentIndexMovie] = useState(null)
    const [fetchStatusMovie, setFetchStatusMovie] = useState(true)
    let [ sortedInfo, setSortedInfo ] = useState(null)
    let [ filteredInfo, setFilteredInfo ] = useState(null)
    const [searchTermMovie, setSearchTermMovie] = useState("")

    const fetchData = async () => {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
        let data = result.data
        // console.log(data.nama)
        let output = data.map( (x, index) => {
            return {
                no: index+1,
                id: x.id, 
                description: x.description,
                duration: x.duration,
                genre: x.genre, 
                image_url: x.image_url,
                rating: x.rating,
                review: x.review,
                title: x.title, 
                year: x.year,
            }
        })
        setNilaiContentMovie(output)
    }

    const functionsEntry = () => {
        //Pembuatan data baru
        axios.post(`https://backendexample.sanbersy.com/api/data-movie`, {
            description: inputContentMovie.description,
            duration: inputContentMovie.duration,
            genre: inputContentMovie.genre, 
            image_url: inputContentMovie.image_url,
            rating: inputContentMovie.rating,
            review: inputContentMovie.review,
            title: inputContentMovie.title, 
            year: inputContentMovie.year,},
            {
                headers: {"Authorization" : "Bearer " + Cookies.get('token')}
            })
            .then(res => {
                setFetchStatusMovie(true)
                history.push('/ListMovie')
            })
    }

    const functionsUpdate = (params) => {
        axios.put(`https://backendexample.sanbersy.com/api/data-movie/${params}`, {
            description: inputContentMovie.description,
            duration: inputContentMovie.duration,
            genre: inputContentMovie.genre, 
            image_url: inputContentMovie.image_url,
            rating: inputContentMovie.rating,
            review: inputContentMovie.review,
            title: inputContentMovie.title, 
            year: inputContentMovie.year,},
            {
                headers: {"Authorization" : "Bearer " + Cookies.get('token')}
            })
            .then(() => {
                setFetchStatusMovie(true)
                history.push('/ListMovie')
            })
    }

    const functionsDelete = (params) => {
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${params}`,
        {
            headers: {"Authorization" : "Bearer " + Cookies.get('token')}
        })
        .then(() => {
            setFetchStatusMovie(true)
        })
    }

    const functionsEdit = (idMobile) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie/${idMobile}`)
        .then((result) => {
            let fetchResult = result.data
            console.log(fetchResult)
            setInputContentMovie(
                {
                    id: fetchResult.id,
                    description: fetchResult.description,
                    duration: fetchResult.duration,
                    genre: fetchResult.genre, 
                    image_url: fetchResult.image_url,
                    rating: fetchResult.rating,
                    review: fetchResult.review,
                    title: fetchResult.title, 
                    year: fetchResult.year,
                }

            )
            setCurrentIndexMovie(fetchResult.id)
        })
}


    const functionsSorted = (pagination, filters, sorter) => {
        // console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo = filters
        setSortedInfo = sorter
    }

    const functionsMovie = {
        fetchData,
        // fetchDataByID,
        functionsEntry,
        functionsUpdate,
        functionsDelete,
        functionsEdit,
        functionsSorted
    }

    return(
        <ListContentContextMovie.Provider value={{
            nilaiContentMovie,
            setNilaiContentMovie,
            inputContentMovie,
            setInputContentMovie,
            currentIndexMovie,
            setCurrentIndexMovie,
            fetchStatusMovie,
            setFetchStatusMovie,
            sortedInfo,
            setSortedInfo,
            filteredInfo,
            setFilteredInfo,
            searchTermMovie,
            setSearchTermMovie,

            functionsMovie
        }}>
            {props.children}
        </ListContentContextMovie.Provider>

    )
}
