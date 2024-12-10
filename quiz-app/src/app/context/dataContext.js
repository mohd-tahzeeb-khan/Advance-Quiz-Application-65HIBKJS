'use client'

const { createContext, useContext, useState } = require("react")
const dataContext=createContext();
export function DataProvider({children}){
    const [dataoncontext, setdataoncontext] = useState({
        email:null,
        login:false,
        examid:0,
        rules:false,
        name:null,


    })

return(
    <dataContext.Provider value={{dataoncontext, setdataoncontext}}>
        {
            children
        }
    </dataContext.Provider>
);
}

export function useData(){
    return useContext(dataContext);
}