import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useHistory } from "react-router";

export const ListContentContextGames = createContext()

export const ListContentProviderGames = props => {

    let history = useHistory()

    const [nilaiContentGames, setNilaiContentGames] = useState([])
    const [inputContentGames, setInputContentGames] = useState({
        description: "",
        duration: "",
        genre: "", 
        image_url: "",
        singlePlayer: false,
        multiplayer: false,
        platform: "",
        name: "", 
        release: 2000,
    })
    const [currentIndexGames, setCurrentIndexGames] = useState(null)
    const [fetchStatusGames, setFetchStatusGames] = useState(true)
    let [ sortedInfo, setSortedInfo ] = useState(null)
    let [ filteredInfo, setFilteredInfo ] = useState(null)
    const [searchTermGames, setSearchTermGames] = useState("")

    const fetchData = async () => {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)
        let data = result.data
        // console.log(data.nama)
        let output = data.map( (x, index) => {
            let playerData = getPlayer(x.singlePlayer, x.multiplayer)
            return {
                no: index+1,
                id: x.id, 
                genre: x.genre, 
                image_url: x.image_url,
                singlePlayer: x.singlePlayer,
                multiplayer: x.multiplayer,
                name: x.name,
                platform: x.platform, 
                release: x.release,
                playerLogic: playerData,
            }
        })
        setNilaiContentGames(output)
    }

    const fetchDataByID = async (params) => {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game/${params}`)
        let data = result.data
        setInputContentGames({
            id: data.id, 
            genre: data.genre, 
            image_url: data.image_url,
            singlePlayer: data.singlePlayer,
            multiplayer: data.multiplayer,
            name: data.name,
            platform: data.platform, 
            release: data.release,

        })
        setCurrentIndexGames(data.id)
        // console.log(data)
    }
    
    const getPlayer = (single,multi) =>{
        if(single === 1 && multi === 1){
            return "Singleplayer & Multiplayer"
          }
          else if(single === 1){
            return "Singleplayer"
          }
          else if(multi === 1){
            return "Multiplayer"
          }
    }


    const functionsEntry = () => {
        // console.log(params)
        
        axios.post("https://backendexample.sanbersy.com/api/data-game", {
            genre: inputContentGames.genre, 
            image_url: inputContentGames.image_url,
            singlePlayer: inputContentGames.singlePlayer,
            multiplayer: inputContentGames.multiplayer,
            name: inputContentGames.name,
            platform: inputContentGames.platform, 
            release: inputContentGames.release,
            },
            {
                headers: {"Authorization" : "Bearer " + Cookies.get('token')}
            }).then((e) => 
            {
                // alert("Data Berhasil Dimasukan")
                // console.log(e.data)
                setFetchStatusGames(true)
                history.push('/ListGames')

            }
            ).catch((err) => {
                alert(err)
            })
    }
        
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    const functionsUpdate = (params) => {
        axios.put(`https://backendexample.sanbersy.com/api/data-game/${params}`, {
            genre: inputContentGames.genre, 
            image_url: inputContentGames.image_url,
            singlePlayer: inputContentGames.singlePlayer,
            multiplayer: inputContentGames.multiplayer,
            name: inputContentGames.name,
            platform: inputContentGames.platform, 
            release: inputContentGames.release,
            },
            {
                headers: {"Authorization" : "Bearer " + Cookies.get('token')}
            })
            .then(() => {
                setFetchStatusGames(true)
                history.push('/ListGames')
            })
    }

    const functionsDelete = (params) => {
        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${params}`,
        {
            headers: {"Authorization" : "Bearer " + Cookies.get('token')}
        })
        .then(() => {
            setFetchStatusGames(true)
        })
    }

    const functionsEdit = (idMobile) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game/${idMobile}`,)
        .then((result) => {
            let fetchResult = result.data
            console.log(fetchResult)
            setInputContentGames(
                {
                    id: fetchResult.id,
                    genre: fetchResult.genre, 
                    image_url: fetchResult.image_url,
                    singlePlayer: fetchResult.singlePlayer,
                    multiplayer: fetchResult.multiplayer,
                    name: fetchResult.name,
                    platform: fetchResult.platform, 
                    release: fetchResult.release,
                }

            )
            setCurrentIndexGames(fetchResult.id)
        })
}

    const functionsSorted = (pagination, filters, sorter) => {
        // console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo = filters
        setSortedInfo = sorter
    }

    const functionsGames = {
        fetchData,
        fetchDataByID,
        functionsEntry,
        functionsUpdate,
        functionsDelete,
        functionsEdit,
        functionsSorted,
        onFinishFailed
    }

    return(
        <ListContentContextGames.Provider value={{
            nilaiContentGames,
            setNilaiContentGames,
            inputContentGames,
            setInputContentGames,
            currentIndexGames,
            setCurrentIndexGames,
            fetchStatusGames,
            setFetchStatusGames,
            sortedInfo,
            setSortedInfo,
            filteredInfo,
            setFilteredInfo,
            searchTermGames,
            setSearchTermGames,

            functionsGames
        }}>
            {props.children}
        </ListContentContextGames.Provider>

    )
}
