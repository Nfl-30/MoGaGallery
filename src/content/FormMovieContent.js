import React, { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { ListContentContextMovie, ListContentProviderMovie } from "../context/ContentContextMovie"
import { Button, message } from 'antd';
import LayOutWeb from "../layout/layout";



const FormNilaiContent = () => {
let {value} = useParams()

const {inputContentMovie, setInputContentMovie, currentIndexMovie, setCurrentIndexMovie, functionsMovie} = useContext(ListContentContextMovie)

//Destruc Functions
const {functionsEntry, functionsEdit, functionsUpdate} = functionsMovie



useEffect( () => {
  if(value !== undefined){
    functionsEdit(value)
}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])


const handleChange = (event) =>{
    let inputValueMovie = {...inputContentMovie, [event.target.name]: event.target.value}
    setInputContentMovie(inputValueMovie)
    // console.log(inputValueMovie)
  }
  
const handleSubmit = (event) => {
    event.preventDefault()
    
    if (currentIndexMovie === null) {
      functionsEntry()
      message.success('Data berhasil ditambah');
    } else {
      functionsUpdate(currentIndexMovie)
      message.success('Data berhasil disunting');
      }
    
    setInputContentMovie({
        description: "",
        duration: "",
        genre: "", 
        image_url: "",
        rating: "0",
        review: "",
        title: "", 
        year: 0,
    })
  
    setCurrentIndexMovie(null)
}

return(
<div className="Form-Fill-Data" >
{/* Form */}
{/* <Title level={1} style={{textAlign: "center"}}>Form Movie</Title> */}
{/* <h1 className="h1-t11">Form Movie</h1> */}
<form onSubmit={handleSubmit}>
  <table className="table-form-t11">
    <tbody>
      <tr>
        <td className="td-t11 form-table-margin"><label className="label-form">Title:</label></td>
        <td className="td-t11 form-table-margin"><input type="text" name="title" value={inputContentMovie.title} onChange={handleChange} className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><label className="label-form">Genre:</label></td>
          <td className="td-t11 form-table-margin"><input type="text" name="genre" value={inputContentMovie.genre} onChange={handleChange} className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin vertical-align-left"><label className="label-form">Description:</label></td>
          <td className="td-t11 form-table-margin"><textarea type="text" name="description" value={inputContentMovie.description} onChange={handleChange} className="ant-input description" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><label className="label-form">Release Year:</label></td>
          <td className="td-t11 form-table-margin"><input type="number" name="year" value={inputContentMovie.year} onChange={handleChange} min="1980" max="2021" className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><label className="label-form">Duration:</label></td>
          <td className="td-t11 form-table-margin"><input type="number" name="duration" value={inputContentMovie.duration} onChange={handleChange} className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><label className="label-form">Rating:</label></td>
          <td className="td-t11 form-table-margin"><input type="number" name="rating" value={inputContentMovie.rating} onChange={handleChange} min="0" max="10" className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><label className="label-form">Review:</label></td>
          <td className="td-t11 form-table-margin"><input type="text" name="review" value={inputContentMovie.review} onChange={handleChange} className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><label className="label-form">Image URL:</label></td>
          <td className="td-t11  form-table-margin"><input type="url" name="image_url" value={inputContentMovie.image_url} onChange={handleChange} className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><Link to={`/ListMovie`}>Kembali ke Tabel</Link></td>
          <td className="td-t11 align-right-table form-table-margin" colSpan="2">
          <Button type="primary" htmlType="submit"> Submit </Button>
          </td>
      </tr>
    </tbody>
  </table>
</form>
</div>
)
}

const ContentFormMovie = () => <LayOutWeb content={<ListContentProviderMovie><FormNilaiContent/></ListContentProviderMovie>}/>

export default FormNilaiContent
export {ContentFormMovie}