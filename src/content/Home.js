import React, { useEffect, useState } from "react";
import LayOutWeb from "../layout/layout";
import { Card, Divider } from "antd";
import { Link } from "react-router-dom"
import axios from "axios";
import { Typography } from 'antd';

const { Title } = Typography;

const CardComponent = (props) => {
    return(
        <>
    <Link to={`/ListGallery${props.dataName}/details/${props.id}`}>
        <Card hoverable style={{ width: 240, minHeight: 550, maxHeight: 600 }} cover={<img alt="example" src={props.img} style={{ width: "100%" , height: 300, objectFit: "cover"}}/>}>
            <Title level={3}>{props.title}</Title>
            {props.dataName === "Game" ? <><strong>Release: {props.release}</strong><br /></> : <><strong>Year: {props.release}</strong><br /></>}
            {props.dataName === "Game" ? <><strong>Platform: {props.rating}</strong><br /></> : <><strong>Rating: {props.rating}</strong><br /></>}
            <p>{props.description}</p>
        </Card>
    </Link>
        </>
    )
} 

const Home = () => {

    const [dataMovie, setDataMovie] = useState([])
    const [dataGames, setDataGames] = useState([])
    const [fetchStatus, setFetchStatus] = useState(true)

    useEffect(() => {
        let fetchMovie = async () => {
            let result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            let data = result.data
            // console.log(data)

            setDataMovie(
                data.map((e) =>{
                    let{
                        id,
                        description,
                        duration,
                        genre,
                        image_url,
                        rating,
                        review,
                        title,
                        year,
                    } = e

                    return{
                        id,
                        description,
                        duration,
                        genre,
                        image_url,
                        rating,
                        review,
                        title,
                        year,
                    }
                })
            )
        }

        let fetchGames = async () => {
            let result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            let data = result.data
            // console.log(data)

            setDataGames(
                data.map((e) =>{
                    let{
                        id,
                        genre,
                        image_url,
                        singlePlayer,
                        multiplayer,
                        name,
                        platform,
                        release,
                    } = e

                    return{
                        id,
                        genre,
                        image_url,
                        singlePlayer,
                        multiplayer,
                        name,
                        platform,
                        release,
                    }
                })
            )
        }

        if(fetchStatus){
            fetchMovie()
            fetchGames()
            setFetchStatus(false)
        }
    },[fetchStatus, setFetchStatus])


    const handleText = (text, num) => {
        if (text === null){
            return ""
        }
        else{
            return text.slice(text, num) + "..."
        }

    }

    return(
        <>
        <Divider plain><h1 style={{fontSize:"32px"}}><Link to={`/ListGalleryMovie`} style={{color: "black"}}>Movie</Link></h1></Divider>
        <div className="container-home">
            {
                dataMovie !== null && (
                    <>
                    {dataMovie.filter((e, index)=>{
                        return index < 4
                    }).map((e,index) => {
                        return <CardComponent key={index} dataName="Movie" id={e.id} img={e.image_url} title={e.title} release={e.year} rating={e.rating} description={handleText(e.description, 150)}/>
                    })}
                    </>
                )
            }
            
        </div>
        <Divider plain><h1 style={{fontSize:"32px"}}><Link to={`/ListGalleryGame`} style={{color: "black"}}>Games</Link></h1></Divider>
        <div className="container-home">
            {
                dataGames !== null && (
                    <>
                    {dataGames.filter((e, index)=>{
                        return index < 4
                    }).map((e,index) => {
                        return <CardComponent key={index} dataName="Game" id={e.id} img={e.image_url} title={e.name} release={e.release} rating={e.platform}/>
                    })}
                    </>
                )
            }
            
        </div>
        </>
    )
}

// const HomeData = () => <LayOutWeb content={<ListContentProviderMovie><Home/></ListContentProviderMovie>}/>
const HomeData = () => <LayOutWeb content={<Home/>}/>

export default HomeData