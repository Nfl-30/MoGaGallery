import React, { createContext, useState } from "react";

export const ListContentContextNav = createContext()

export const ListContentProviderNav = props => {
    const [isCollapse, setIsCollapse] = useState(false)


    const functionsCollapse = (collapsed) => {
        console.log(collapsed);
        setIsCollapse({ collapsed });
    }

    const functions = {
        functionsCollapse
    }

    return(
        <ListContentContextNav.Provider value={{
            isCollapse,
            setIsCollapse,
            functions
        }}>
            {props.children}
        </ListContentContextNav.Provider>

    )
}
