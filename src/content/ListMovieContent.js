import React, { useEffect, useContext, useState } from "react"
import { ListContentContextMovie, ListContentProviderMovie } from "../context/ContentContextMovie"
import { useHistory } from "react-router-dom"
import { message, Typography, Button, Space, Table, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LayOutWeb from "../layout/layout";
import axios from "axios";
const { Search } = Input;
const { Text } = Typography;



const ListContentMovie = () => {
    
    const {nilaiContentMovie, setNilaiContentMovie, fetchStatusMovie, setFetchStatusMovie, functionsMovie} = useContext(ListContentContextMovie)

    //Destruc Functions
    const {fetchData, functionsDelete} = functionsMovie

    let history = useHistory()

    // console.log(nilaiContentMovie)

    const [filter, setFilter] = useState({
      duration:"",
      genre:"",
      year: 1980
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
        let result = await axios.get("https://backendexample.sanbersy.com/api/data-movie")
        let data = result.data
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
    
      //   // console.log(data) Buat bandingin hasil object dengan data
    
    
        let filterData = output.filter((e) => {
          return e.duration === parseInt(filter.duration) && e.genre.toLowerCase() === filter.genre.toLowerCase() && e.year === parseInt(filter.year)

        })
      //   // console.log(data)
        // console.log(filterData)
        setNilaiContentMovie(filterData)
       }
      fetchFilter()
    }

useEffect( () => {
  if(fetchStatusMovie){
    fetchData()
    setFetchStatusMovie(false)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[fetchStatusMovie, setFetchStatusMovie])

const handleDelete = (event) =>{
  let indexContent = parseInt(event.currentTarget.value)
  // console.log(indexContent)
  functionsDelete(indexContent)
  message.success('Data dihapus');
}

const handleEdit = (event) =>{
  let indexContent = parseInt(event.currentTarget.value)
  // functionsEdit(indexContent)
  // console.log(indexContent)
  history.push(`/ListMovie/edit/${indexContent}`)
  message.success('Data masuk dalam sunting');
}

const handleCreate = () => {
  history.push('ListMovie/create')
}

const onSearch = value => {

  let fetchSearch = async() => {
    let result = await axios.get("https://backendexample.sanbersy.com/api/data-movie")
    let data = result.data
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

    // console.log(data) Buat bandingin hasil object dengan data


    let filterResult = output.filter((e) => {
      return Object.values(e).join(" ").toLowerCase().includes(value.toLowerCase())
    })
    // console.log(data)
    // console.log(filterResult)
    setNilaiContentMovie(filterResult)
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
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.duration - b.duration,
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
    key: 'genre',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.genre.length - b.genre.length,
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.year - b.year,
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.rating - b.rating,
  },
  {
    title: 'Review',
    dataIndex: 'review',
    key: 'review',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.review.length - b.review.length,
  },
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

const data = nilaiContentMovie;
// console.log(data)

return (
  <div className="Tugas11">
    <Text>Filter Movie Category:</Text><br/>
    <form style={{display: "flex", width:"800px", justifyContent: "space-between", alignItems:"center", marginTop:10, marginBottom:"20px"}} onSubmit={handleFilter}>
    <Input onChange={handleChangeFilter} value={filter.duration} name="duration" type="number" placeholder="Duration" style={{width: "200px"}}/>
    <Input onChange={handleChangeFilter} value={filter.genre} name="genre" type="text" placeholder="Genre" style={{width: "200px"}}/>
    <Input onChange={handleChangeFilter} value={filter.year} name="year" type="number" placeholder="Year release" style={{width: "200px"}}/>
    <Button type="primary" htmlType="submit">Filter</Button>
    <Button type="primary" onClick={() => { setFetchStatusMovie(true)}}>Reset</Button>
    </form>

    <Text>Search Movie Name:</Text><br/>
    <Search
    placeholder="Input movie name..."
    allowClear
    enterButton="Search"
    size="medium"
    onSearch={onSearch}
    style={{width: "500px", marginBottom: 50, marginTop: 10}}
    />
    <br/>
      <Button type="primary" className="addNewDataButton-t15" size={"large"} onClick={handleCreate}>Buat Data Content Baru</Button>
      <Table columns={columns} dataSource={data} className="table-t11" rowKey="id"/>
  </div>
  )
}

const ContentListMovie = () => <LayOutWeb content={<ListContentProviderMovie><ListContentMovie/></ListContentProviderMovie>}/>


export default ListContentMovie
export {ContentListMovie}