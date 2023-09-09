import React, { useContext } from 'react';
import {When} from 'react-if';
import { LoginContext } from './context.jsx';

export default function Auth(props){
  const login= useContext(LoginContext)

      const isLoggedIn = login.loggedIn;
    const canDo = props.capability ? login.can(props.capability) : true;
    const okToRender = isLoggedIn && canDo;
  return(
    <>
         <When condition={okToRender}>
         {props.children}
         </When>
    </>
  )
}


