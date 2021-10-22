import React, { useEffect, useState } from "react";
import LayOutWeb from "../layout/layout";
import { Typography, Image  } from "antd";
import { ListContentProviderMovie } from "../context/ContentContextMovie";
import { useParams } from "react-router-dom"
import axios from "axios";
import {
  StarOutlined,
} from '@ant-design/icons';

const { Paragraph, Text, Title } = Typography;


const ContentCardComponent = () =>{


let {datasource, value} = useParams()
// console.log(value)
const [dataMovie, setDataMovie] = useState([])
const [dataGames, setDataGames] = useState([])

useEffect(() =>{
if(datasource === "Movie"){
  if(value !== undefined){
    let fetchMovieById = async() => {
      let result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie/${value}`)
      let data = result.data
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

      } = data
      // console.log(data)

      setDataMovie({
        id,
        description,
        duration,
        genre,
        image_url,
        rating,
        review,
        title,
        year,
      })

    }
    fetchMovieById()
  }
}
else if(datasource === "Game"){
  if(value !== undefined){
    let fetchGamesById = async() => {
      let result = await axios.get(`https://backendexample.sanbersy.com/api/data-game/${value}`)
      let data = result.data
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
      let playerData = getPlayer(data.singlePlayer, data.multiplayer)
      let{
        id,
        genre,
        image_url,
        singlePlayer,
        multiplayer,
        name,
        platform,
        release,
      } = data
      // console.log(data)

      setDataGames({
        id,
        genre,
        image_url,
        singlePlayer,
        multiplayer,
        name,
        platform,
        release,
        playerLogic: playerData,
      })

    }
    fetchGamesById()
  }
}
},[datasource, value])
// console.log(dataMovie)
// console.log(dataGames)


    return(
      <>
      { datasource === "Movie" ?
      <div className="container-detail">
        <Image src={dataMovie.image_url} alt="gambar"/>
        <div className="Detail-Content">
          <Title level={1}>{dataMovie.title}</Title>
          <div className="Detailers">
            <Text strong className="content-detail">Release Year:<br/>  {dataMovie.year}</Text>
            <Text strong className="content-detail">Genre:<br/> {dataMovie.genre}</Text>
            <Text strong className="content-detail">Duration:<br/>  {dataMovie.duration} Minutes</Text>
            <Text strong className="content-detail">Rating:<br/>{dataMovie.rating}<StarOutlined/></Text>
          </div>
          <Text strong className="paragraph">Description</Text>
          <Paragraph className="paragraph"> {dataMovie.description} </Paragraph>
          <Text strong className="paragraph">Review</Text>
          <Paragraph className="paragraph"> {dataMovie.review} </Paragraph>
        </div>
      </div>
      :
      <div className="container-detail-games">
        <Image src={dataGames.image_url} alt="gambar"/>
        <div className="Detail-Content ">
          <Title level={1} className="">{dataGames.name}</Title>
          <div className="Detailers-game">
            <Text strong className="paragraph-title-game">Release Year</Text>
            <Text strong className="paragraph-title-game">Genre</Text>
            <Text strong className="paragraph-title-game">Players</Text>
            <Text strong className="paragraph-title-game">Platform</Text>

            <Paragraph className="paragraph-game"> {dataGames.release} </Paragraph>
            <Paragraph className="paragraph-game"> {dataGames.genre} </Paragraph>
            <Paragraph className="paragraph-game"> {dataGames.playerLogic} </Paragraph>
            <Paragraph className="paragraph-game"> {dataGames.platform} </Paragraph>
          </div>
          
        </div>
      </div>
    } 
    </>
    )
}

const ContentCardMovieDescription = () => <LayOutWeb content={<ListContentProviderMovie><ContentCardComponent/></ListContentProviderMovie>}/>

export default ContentCardMovieDescription