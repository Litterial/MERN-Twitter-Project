import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import '../App.css'
export default class Register extends Component {

    constructor(props)
    {
        super(props);
        this.state={message:''}
    }


    registerForm=(e)=>
    {
        this.props.registerForm()
        // e.preventDefault();
        // fetch('users/register',
        //     {
        //         method:'POST',
        //         headers:
        //             {'Accept':'application/json', 'Content-Type':'application/json',},
        //         body:JSON.stringify({username:e.target.username.value, password:e.target.password.value,
        //             image:e.target.image.value,background:e.target.background.value}),
        //     })
        //     .then(data=>data.text())
        //     .then(message=>this.setState({message:message}))

    };

    render() {
        return (

            <div>
                <h1>Register</h1>
                <form onSubmit={this.registerForm} >
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
                        <label htmlFor='image'>Image url</label>
                        <br/>
                        <input type='text' name='image' id='image'/>
                    </div>    <div className='i-block'>
                    <label htmlFor='background'>BackGround url</label>
                    <br/>
                    <input type='text' name='background' id='background'/>
                </div>
                    <div className='i-block'>
                        <input type='submit' name='submit'/>
                    </div>
                </form>
                {this.state.message}
            </div>
        );
    }
}
