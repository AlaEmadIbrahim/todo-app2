import React from "react";
import Auth from "../auth/auth";
export default function List(props){

    return(
        <>
        {props.list.map(item => (
            <div key={item.id}>
              <p>To do: {item.text}</p>
              <p><small>Assigned to: {item.assigned}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
             <Auth capability="update">
              <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
              </Auth>
              <Auth capability="delete">
              <button onClick={()=>props.deleteItem(item.id)}>Delete</button>
              </Auth>
              <hr />
            </div>
          ))}
          
 
        </>
    )
}