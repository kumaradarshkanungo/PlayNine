import React, { Component } from 'react';

//Game Components
import Game from './GameComponents/Game';
import "./App.css"
import Bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css'

class App extends Component {
    render(){
        return(
            <Game />
        )
    }
}

export default App;