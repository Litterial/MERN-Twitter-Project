import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import '../App.css'
export default class HomePage extends Component {

    constructor(props)
    {
        super(props);
        this.state=
            {logged:false,username:null,tweets:null}
    }

    login=(e)=>
    {

    }

    render() {
        return (

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
            </div>
        );
    }
}

