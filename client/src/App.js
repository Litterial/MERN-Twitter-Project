import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./Components/HomePage";
import Register from "./Components/Register";

class App extends Component {
    constructor(props) {
        super(props);
        /* I want user registration to be on a completely different page so I use this as flag to jump to the register
          page if toRegister is true. Else it stays on the home page"*/
        this.state={toRegister:false}
    }

    /* When the link to the register page is clicked, it will change the state of toRegister to true*/
    changeRegisterTrue=(e)=>
    {
        this.setState({toRegister:true})
    };
     /*Used to change the Register back to false if the user wants to go back to the home page */
    changeRegisterFalse=(e)=>
    {
        this.setState({toRegister:false})
    };
    render() {

        /*If toRegister is true, the register page will be returned*/
        if(this.state.toRegister===true)
        {
            return (
                <div className="App">
                    <header className="App-header">
                          {/*The Register component carries the changeRegisterFalse function to call it back when the user wants*/}
                          {/*to return to the home page*/}
                        <Register changeRegisterFalse={this.changeRegisterFalse}/>
                    </header>
                </div>
            );
        }

    return (
      <div className="App">
        <header className="App-header">
            {/*The homepage component carries the changeRegisterTrue component to call back the function when the user */}
            {/*wants to register an account*/}
        <HomePage changeRegisterTrue={this.changeRegisterTrue}/>
        </header>
      </div>
    );
  }
}

export default App;
