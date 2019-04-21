import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./Components/HomePage";
import Register from "./Components/Register";
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Search from "./Components/Search";
import LoginFail from "./Components/LoginFail";


class App extends Component
{

    render()
    {
        return (
          <div className="App">
            <header className="App-header">

                <Router>
                    <Route  path={'/home'} component={()=><HomePage/>}/>
                    <Route  path={'/home/search'} component={()=><Search/>}/>
                    <Route  path={'/register'} component={()=><Register/>}/>
                    <Route path={'/loginFail'} component={()=><LoginFail/>}/>
                </Router>
            </header>
          </div>
        );
    }
}

export default App;
