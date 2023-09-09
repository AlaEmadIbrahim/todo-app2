import React from "react";
export const SettingContext= React.createContext()
import { useState } from "react";

export default function Settings(props){
        const [maxItemsPerPage, setMaxItemsPerPage]= useState(3)
        const [complete, setComplete]= useState(true)
  const state={
          maxItemsPerPage:maxItemsPerPage,
          complete: complete,
          difficulty:"difficulty",
          setMaxItemsPerPage:setMaxItemsPerPage,
          setComplete:setComplete,
          todos:[]
  }
  function save(){

          let serializedState= JSON.stringify(state)
          console.log("state",serializedState)
        return   localStorage.setItem("state", serializedState)
        }
save()
return(
        <SettingContext.Provider value={state}>
                {props.children}
        </SettingContext.Provider>
)
}
