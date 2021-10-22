import React, { useContext, useEffect } from "react";
import LayOutWeb from "../layout/layout";
import { List, Card } from "antd";
import { Link } from "react-router-dom"
import { ListContentContextMovie, ListContentProviderMovie } from "../context/ContentContextMovie";



const ContentCardComponentMovie = () =>{

const {nilaiContentMovie, fetchStatusMovie, setFetchStatusMovie, functionsMovie} = useContext(ListContentContextMovie)
// console.log(nilaiContent)

//Destruc Functions
const {fetchData} = functionsMovie

useEffect( () => {
    if(fetchStatusMovie){
      fetchData()
      setFetchStatusMovie(false)
    }
  },[fetchData, fetchStatusMovie, setFetchStatusMovie])

const data = nilaiContentMovie;
// console.log(data)

    return(
        <>
        <h1 style={{fontSize : "20px"}}>Popular Movie</h1>
        <List
        grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 3,
            // column: 4,
          }}
        dataSource={data}
        renderItem={(val, index) => (
        <List.Item>
            <Link to={`/ListGalleryMovie/details/${val.id}`}>
            <Card hoverable style={{ width: 240, height: 500 }} cover={<img alt="example" src={val.image_url} style={{ width: "100%" , height: 300, objectFit: "cover"}}/>}>
                <h2>{val.title}</h2>
                <h5>Release Year: {val.year}</h5>
                <strong>Rating: {val.rating}</strong><br />
            </Card>
            <br/>
        </Link>
        </List.Item>
        )}
         />
         </>
    );

}

const ContentCardMovie = () => <LayOutWeb content={<ListContentProviderMovie><ContentCardComponentMovie/></ListContentProviderMovie>}/>

export default ContentCardMovie