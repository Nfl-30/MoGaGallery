import React, { useContext, useEffect } from "react";
import LayOutWeb from "../layout/layout";
import { List, Card } from "antd";
import { Link } from "react-router-dom"
import { ListContentContextGames, ListContentProviderGames } from "../context/ContentContextGames";



const ContentCardComponentGames = () =>{

const {nilaiContentGames, fetchStatusGames, setFetchStatusGames, functionsGames} = useContext(ListContentContextGames)
// console.log(nilaiContent)

//Destruc Functions
const {fetchData} = functionsGames

useEffect( () => {
    if(fetchStatusGames){
      fetchData()
      setFetchStatusGames(false)
    }
  },[fetchData, fetchStatusGames, setFetchStatusGames])

const data = nilaiContentGames;
// console.log(data)

    return(
        <>
        <h1 style={{fontSize : "20px"}}>Popular Games</h1>
        <List
        grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 3,
          }}
        dataSource={data}
        renderItem={(val, index) => (
        <List.Item>
          <Link to={`/ListGalleryGame/details/${val.id}`}>
            <Card hoverable style={{ width: 240, height: 500 }} cover={<img alt="example" src={val.image_url} style={{ width: "100%" , height: 300, objectFit: "cover"}}/>}>
                <h2>{val.name}</h2>
                <h5>Release Year: {val.release}</h5>
                <strong>Genre: {val.genre}</strong><br />
            </Card>
          </Link>
            <br/>
        </List.Item>
        )}
         />
         </>
    );

}

const ContentCardGames = () => <LayOutWeb content={<ListContentProviderGames><ContentCardComponentGames/></ListContentProviderGames>}/>

export default ContentCardGames