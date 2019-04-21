import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom'
import '../App.css'
import Register from "./Register";
import Search from "./Search";
import LoginFail from "./LoginFail";
export default class HomePage extends Component {

    constructor(props)
    {
        super(props);
        this.state=
            {logged:false,
                message:''}
    }


    login=(e)=>
    {
        e.preventDefault();
        fetch('/users/login',
            {
                    method:"POST",
                    headers:{"Accept":"application/json","Content-Type":"application/json"},
                    body:JSON.stringify({username:e.target.username.value,password:e.target.password.value})

            })
            .then(data=>data.json())
            .then(jsonedData=>this.setState({logged:jsonedData['logged'],message:jsonedData['message']}))

    };

    logout=(e)=>
    {
        this.setState({logged:false,message:''});
        fetch('/users/logout')
            .then(data=>data.text())
            .then(text=>console.log(text))


    };

    render() {
        if (this.state.logged)
        {
            return(
                <div>
                    test
                    <Link to='/home' onClick={this.logout}>LogOut</Link>
                </div>
            )

        }

        if (this.state.message=='bad')
        {
            return(
                <div>
                    <Redirect to={'/loginFail'}/>
                </div>
            )
        }
        return (
            <div>
                <h1>Login</h1>
                {this.state.message}
               <form onSubmit={this.login} >
                <div className='i-block'>
               <label htmlFor='username'>Username</label>
                    <br/>
                   <input type='text' name='username' id='username'/>
                </div>
                   <div className='i-block'>
                   <label htmlFor='password'>Password</label>
                       <br/>
                   <input type='password' name='password' id='password'/>
                   </div>
                   <div className='i-block'>
                       <input type='submit' name='submit'/>
                   </div>
               </form>
                <Link to={'/home'}>Home</Link>
                <Link to={'/home/search'}>Search</Link>
                <Link to='/register'>Register</Link>
                <Link to='/home' onClick={this.logout}>LogOut</Link>
            </div>
        );
    }
}

