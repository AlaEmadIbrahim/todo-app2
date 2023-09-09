import React from 'react';
import ToDo from './components/todo/todo';
import Settings from './context/Settings/settings';
import { MantineProvider} from '@mantine/core';
import UserSettings from './components/userSettings/userSettings';
import {Route,Routes} from 'react-router-dom'
import  HeaderBar  from './components/header/header';
import LoginProvider from './components/auth/context';
import SignUp from './components/auth/signup';
import {LoginContext} from './components/auth/context.jsx'

export default class App extends React.Component {

  static contextType = LoginContext;
  render() {
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Settings>
          <LoginProvider>
            <HeaderBar/>
            <SignUp/>
                    <Routes>
                      <Route  path='/' element={<ToDo />} />
                      <Route  path='/settings' element={<UserSettings />} />
                    </Routes>
          </LoginProvider>
      </Settings>
      </MantineProvider>
    );
  }
}


