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
    constructor(props)
    {
        super(props);
        this.state=
            {
                logged:false,
                message:'',
                truelog:'no',
                user:[]
            }

    }

    componentDidMount=(e)=>
    {

    };

    session=(e)=>
    {
        if(this.state.message) {
            fetch('/users/' + this.state.message)
                .then(data => data.json())
                .then(jsondata => this.setState({user: jsondata}))
        }
    };

    change=(e)=>
    {
        this.setState({message:''});
    };

    loginInfo=(logged,message,truelog)=>
    {
        this.setState({logged:logged,message:message,truelog:truelog});
        this.session();
    };

    // login=(e)=>
    // {
    //     fetch('/users/login',
    //         {
    //             method:"POST",
    //             headers:{"Accept":"application/json","Content-Type":"application/json"},
    //             body:JSON.stringify({username:e.target.username.value,password:e.target.password.value})
    //
    //         })
    //         .then(data=>data.json())
    //         .then(data=>this.setState({logged:data['logged'],message:data['message'],truelog:data['truelog']}))
    //
    // };

    logout=(e)=>
    {
        this.setState({logged: false, message: '',truelog:'no'});
        fetch('/users/logout')
            .then(data => data.text())
            .then(text => console.log(text))
    };


    // registerForm=(e)=>
    // {
    //     e.preventDefault();
    //     fetch('users/register',
    //         {
    //             method:'POST',
    //             headers:
    //                 {'Accept':'application/json', 'Content-Type':'application/json',},
    //             body:JSON.stringify({username:e.target.username.value, password:e.target.password.value,}),
    //         })
    //         .then(data=>data.text())
    //         .then(message=>this.setState({message:message}))
    //
    // };




    render()
    {
        console.log(this.state.user);
        const mapped=this.state.user.map((ele)=>
        {

            return(
                <div>
                <h1>{ele.username}</h1>
                    <h1>{ele.image}</h1>
                    <h1>{ele.password}</h1>
                    <h1>{ele.background}</h1>
                </div>
            )
        });
        const mapped2= this.state.user.map((test)=>
            {

                return test.tweets.map((element,ndx)=> {
                    console.log(element.message);
                    if(ndx===test.tweets.length-1) {
                        return (
                            <div>
                                <h1>{element.message}</h1>
                            </div>
                        )
                    }
                }).reverse()
            });


        return (
          <div className="App">
            <header className="App-header">
                <Router>
                    <Route  path={'/home'} component={()=> <HomePage homelogout={this.logout} loginInfo={this.loginInfo} session={this.session} logged={this.state.logged} mapped={mapped} mapped2={mapped2}/>}/>
                        <Route  path={'/home/search'} component={()=><Search/>}/>
                    <Route  path={'/register'} component={()=><Register  register={this.registerForm}/>}/>
                    {/*<Route path={'/loginFail'} component={()=><LoginFail change={this.change}/>}/>*/}
                </Router>
            </header>
          </div>
        );
    }
}

export default App;
