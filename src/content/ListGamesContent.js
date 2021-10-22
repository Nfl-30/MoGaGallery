import React, { useEffect, useContext, useState } from "react"
import { ListContentContextGames, ListContentProviderGames } from "../context/ContentContextGames"
import { useHistory } from "react-router-dom"
import { message, Typography, Button, Space, Table, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LayOutWeb from "../layout/layout";
import axios from "axios";

const { Search } = Input;
const { Text } = Typography;


const ListContentGames = () => {
    
    const {nilaiContentGames, setNilaiContentGames, fetchStatusGames, setFetchStatusGames, functionsGames} = useContext(ListContentContextGames)

    //Destruc Functions
    const {fetchData, functionsDelete} = functionsGames

    let history = useHistory()

    // console.log(nilaiContentGames)

    const [filter, setFilter] = useState({
      genre:"",
      release:"2000",
      platform: ""
    })

    const handleChangeFilter = (e) =>{
      let valueType = e.target.value
      let name = e.target.name

      setFilter({...filter, [name] : valueType})
    }

    const handleFilter = (e) => {
      e.preventDefault();
      // console.log("ok")
      // console.log(filter)

      let fetchFilter = async() => {
        let result = await axios.get("https://backendexample.sanbersy.com/api/data-game")
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
    
    
    
        let filterData = output.filter((e) => {
          return e.genre.toLowerCase() === filter.genre.toLowerCase() && e.release === filter.release && e.platform.toLowerCase() === filter.platform.toLowerCase()

        })
        // console.log(filterData)
        setNilaiContentGames(filterData)
       }
      fetchFilter()
    }
    

useEffect( () => {
  if(fetchStatusGames){
    fetchData()
    setFetchStatusGames(false)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[fetchStatusGames, setFetchStatusGames])

const handleDelete = (event) =>{
  let indexContent = parseInt(event.currentTarget.value)
  // console.log(indexContent)
  functionsDelete(indexContent)
  message.success('Data dihapus');
}

const handleEdit = (event) =>{
  let indexContent = parseInt(event.currentTarget.value)
  // console.log(event)
  history.push(`/ListGames/edit/${indexContent}`)
  message.success('Data masuk dalam sunting');
}

const handleCreate = () => {
  history.push('ListGames/create')
}

const onSearch = value => {

  let fetchSearch = async() => {
    let result = await axios.get("https://backendexample.sanbersy.com/api/data-game")
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

    // console.log(data) Buat bandingin hasil object dengan data


    let filterResult = output.filter((e) => {
      return Object.values(e).join(" ").toLowerCase().includes(value.toLowerCase())
    })
    // console.log(data)
    // console.log(filterResult)
    setNilaiContentGames(filterResult)
  }
  fetchSearch()
}


const columns = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'nomor',
    sorter: (a, b) => a.no - b.no,

  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
    key: 'genre',
    sorter: (a, b) => a.genre.length - b.genre.length,
  },
  {
    title: 'Release',
    dataIndex: 'release',
    key: 'release',
    sorter: (a, b) => a.release - b.release,
  },
  {
    title: 'Platform',
    dataIndex: 'platform',
    key: 'platform',
    sorter: (a, b) => a.platform.length - b.platform.length,
  },
  {
    title: 'Singleplayer',
    dataIndex: 'singlePlayer',
    key: 'singlePlayer',
    sorter: (a, b) => a.singlePlayer - b.singlePlayer,
  },
  {
  title: 'Multiplayer',
  dataIndex: 'multiplayer',
  key: 'multiplayer',
  sorter: (a, b) => a.multiplayer - b.multiplayer,
  },
  // {
  //   title: 'Player',
  //   dataIndex: 'playerLogic',
  //   key: 'playerLogic',
  //   sorter: (a, b) => a.playerLogic.length - b.playerLogic.length
  // },
  {
    title: 'Action',
    key: 'action',
    render: (res, index) => (
      <Space size="middle" key={index}>
        <Button type="warning" size={"large"} value={res.id} onClick={handleEdit} icon={<EditOutlined/>}/>
        <Button type="danger" onClick={handleDelete} value={res.id} size={"large"} icon={<DeleteOutlined/>}/>
      </Space>
    ),
  },
]

const data = nilaiContentGames;

// console.log(data)

return (
  <div className="Tugas11">
    <Text>Filter Game Category:</Text><br/>
    <form style={{display: "flex", width:"800px", justifyContent: "space-between", alignItems:"center", marginTop:10, marginBottom:"20px"}} onSubmit={handleFilter}>
    <Input onChange={handleChangeFilter} value={filter.genre} name="genre" type="text" placeholder="Genre" style={{width: "200px"}}/>
    <Input onChange={handleChangeFilter} value={filter.release} name="release" type="number" min="2000" max="2021" style={{width: "200px"}}/>
    <Input onChange={handleChangeFilter} value={filter.platform} name="platform" type="text" placeholder="Platform" style={{width: "200px"}}/>
    <Button type="primary" htmlType="submit">Filter</Button>
    <Button type="primary" onClick={() => { setFetchStatusGames(true)}}>Reset</Button>

    </form>
    
    <Text>Search Game Name:</Text><br/>
    <Search
    placeholder="Input game name..."
    allowClear
    enterButton="Search"
    size="medium"
    onSearch={onSearch}
    style={{width: "500px", marginBottom: 50, marginTop: 10}}
    />
    <br/>
    <br/>
      <Button type="primary" className="addNewDataButton-t15" size={"large"} onClick={handleCreate}>Buat Data Content Baru</Button>
      <Table columns={columns} dataSource={data} className="table-t11" rowKey="id"/>
  </div>
  )
}

const ContentListGames = () => <LayOutWeb content={<ListContentProviderGames><ListContentGames/></ListContentProviderGames>}/>


export default ListContentGames
export {ContentListGames}