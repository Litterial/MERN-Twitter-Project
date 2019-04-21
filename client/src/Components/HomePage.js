import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import '../App.css'
import Register from "./Register";
export default class HomePage extends Component {

    constructor(props)
    {
        super(props);
        this.state=
            {logged:false,username:null,tweets:null}
    }

    login=(e)=>
    {
        fetch('/users/login',
            {
                    method:"POST",
                    headers:{"Accept":"application/json","Content-Type":"application/json"},
                    body:JSON.stringify({username:e.target.username.value,password:e.target.password.value})

            })

    };
    registerLink=(e)=>
    {
        this.props.changeRegisterTrue()

    };

    render() {
        return (

            <div>
                <h1>Login</h1>
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
            <Router>
                <Link to='/register' onClick={this.registerLink}>Register</Link>
                {/*<Route path={'/register'} component={()=><Register/>}/>*/}
            </Router>
            </div>
        );
    }
}

