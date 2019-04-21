import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import '../App.css'

export default class LoginFail extends Component{

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


    render()
    {
        return(
            <div>
            The username and password you entered did not match our records. Please double-check and try again
            <div>
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
            </div>
            </div>
        )
    }
}