import { Switch } from "antd";
import React, { useContext } from "react";
import { ThemeChangeBGContext } from "../context/ThemeContext";


const SwitchColor = () => {
    const {Theme, setTheme} = useContext(ThemeChangeBGContext)
    const bgButton = () => {
        setTheme(Theme === "light" ? "dark" : "light")
    }
    return(
        <>
        <Switch
        size="default"
        onChange={bgButton}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        />
        </>
    )
}

const ButtonSwitchColor = () => {
    const {Theme, setTheme} = useContext(ThemeChangeBGContext)
    const bgButton = () => {
        setTheme(Theme === "Light" ? "Dark" : "Light")
    }
    return(
        <>
        <button className="ChangeBGButton" onClick={bgButton}>Ubah tema saya menjadi {Theme === "Dark" ? "Light" : "Dark"} </button>
        </>
    )
}

export default SwitchColor
export {ButtonSwitchColor}