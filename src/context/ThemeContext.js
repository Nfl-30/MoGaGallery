import React, { createContext, useState } from "react";

// For Background Color
export const ThemeChangeBGContext = createContext()

export const ThemeChangeBGProvider = props => {
    const [ Theme, setTheme ] = useState("light")
    return(
        <ThemeChangeBGContext.Provider value={{
            Theme,
            setTheme
        }}>
            {props.children}
        </ThemeChangeBGContext.Provider>
    )

}