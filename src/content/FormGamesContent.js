import React, { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "antd"
import { message } from 'antd';
import LayOutWeb from "../layout/layout";
import { ListContentContextGames, ListContentProviderGames } from "../context/ContentContextGames";




const FormNilaiContent = () => {

const {inputContentGames, setInputContentGames, currentIndexGames, setCurrentIndexGames, functionsGames} = useContext(ListContentContextGames)

//Destruc Functions
const {functionsEntry, functionsEdit, functionsUpdate} = functionsGames

let {value} = useParams()
// console.log(value)

useEffect( () => {
  if(value !== undefined){
    functionsEdit(value)
}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])


const handleChange = (event) =>{
    let platform = ["singlePlayer", "multiplayer"]
    let name = event.target.name
    let value = event.target.value

    if (platform.indexOf(name) === -1) {
        setInputContentGames({ ...inputContentGames, [name]: value })
    } else {
        setInputContentGames({ ...inputContentGames, [name]: !inputContentGames[name] })
    }

  }
  
const handleSubmit = (event) => {
    // console.log(event.name)
    event.preventDefault()
    if (currentIndexGames === null) {
      functionsEntry()
      message.success('Data berhasil ditambah');
    } else {
      functionsUpdate(currentIndexGames)
      message.success('Data berhasil disunting');
      }
    
    setInputContentGames({
        genre: "",
        image_url: "",
        singlePlayer: true, 
        multiplayer: true,
        name: "",
        platform: "",
        release: "",
    })
  
    setCurrentIndexGames(null)
}

return(
<div className="Form-Fill-Data" >
{/* Form */}
{/* <Title level={1} style={{textAlign: "center"}}>Form Games</Title> */}
{/* <h1 className="h1-t11">Form Games</h1> */}
<form method="post" onSubmit={handleSubmit}>
  <table className="table-form-t11">
    <tbody>
      <tr>
        <td className="td-t11 form-table-margin"><label className="label-form">Name:</label></td>
        <td className="td-t11 form-table-margin"><input type="text" name="name" value={inputContentGames.name} onChange={handleChange} className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><label className="label-form">Release:</label></td>
          <td className="td-t11 form-table-margin"><input type="number" name="release" value={inputContentGames.release} onChange={handleChange} className="ant-input" min="2000" max="2021" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin vertical-align-left"><label className="label-form">Genre:</label></td>
          <td className="td-t11 form-table-margin"><input type="text" name="genre" value={inputContentGames.genre} onChange={handleChange} className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><label className="label-form">Platform:</label></td>
          <td className="td-t11 form-table-margin"><input type="text" name="platform" value={inputContentGames.platform} onChange={handleChange} className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><label className="label-form">Image URL:</label></td>
          <td className="td-t11  form-table-margin"><input type="url" name="image_url" value={inputContentGames.image_url} onChange={handleChange} className="ant-input" required/></td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin vertical-align-left"><label className="label-form">Platform:</label></td>
          <td className="td-t11 form-table-margin">
                <input type="checkbox" name="singlePlayer" onChange={handleChange} id="lname" checked={inputContentGames.singlePlayer}/>
                <label className="label-form">Singleplayer</label> <br/>
                <input type="checkbox" name="multiplayer" onChange={handleChange} id="lname" checked={inputContentGames.multiplayer}/>
                <label className="label-form">Multiplayer</label>
          </td>
      </tr>
      <tr>
          <td className="td-t11 form-table-margin"><Link to={`/ListGames`}>Kembali ke Tabel</Link></td>
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

const ContentFormGames = () => <LayOutWeb content={<ListContentProviderGames><FormNilaiContent/></ListContentProviderGames>}/>

export default FormNilaiContent
export {ContentFormGames}