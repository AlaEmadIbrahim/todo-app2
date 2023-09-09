import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

class Main extends React.Component {
  render() {
    return(
      <React.StrictMode>
      <BrowserRouter>
     <App />
      </BrowserRouter>
      </React.StrictMode>
    )
  }
}
const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);