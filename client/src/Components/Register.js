import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom'
import '../App.css'
import {Button, Form, FormControl, NavDropdown} from "react-bootstrap";
export default class Register extends Component {

    // constructor(props)
    // {
    //     super(props);
    //     this.state={message:''}
    // }


    registerForm=(k)=>
    {

        this.props.registerForm(k)

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
        console.log('on register');
        console.log(this.props.search);

        if(this.props.search)
        {
            return<Redirect to={'/search'}/>
        }

        return (
<div>
            <div className='registrationFormDiv'>
                {/*<h1>Register</h1>*/}
                {/*<form onSubmit={this.registerForm} >*/}
                {/*    <div className='i-block'>*/}
                {/*        <label htmlFor='username'>Username</label>*/}
                {/*        <br/>*/}
                {/*        <input type='text' name='username' id='username'/>*/}
                {/*    </div>*/}
                {/*    <div className='i-block'>*/}
                {/*        <label htmlFor='password'>Password</label>*/}
                {/*        <br/>*/}
                {/*        <input type='password' name='password' id='password'/>*/}
                {/*    </div>*/}
                {/*    <div className='i-block'>*/}
                {/*        <label htmlFor='image'>Image url</label>*/}
                {/*        <br/>*/}
                {/*        <input type='text' name='image' id='image'/>*/}
                {/*    </div>    <div className='i-block'>*/}
                {/*    <label htmlFor='background'>Background url</label>*/}
                {/*    <br/>*/}
                {/*    <input type='text' name='background' id='background'/>*/}
                {/*</div>*/}
                {/*    <div className='i-block'>*/}
                {/*        <input type='submit' name='submit'/>*/}
                {/*    </div>*/}
                {/*</form>*/}


                <Form  className='registrationForm' onSubmit={this.registerForm} >
                    <div>
                        <label htmlFor='username'>Username</label>
                        <br/>
                        <FormControl type='text' name='username' id='username'/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <br/>
                        <FormControl type='password' name='password' id='password'/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='image'>Image url</label>
                        <br/>
                        <FormControl type='text' name='image' id='image'/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='background'>Background url</label>
                        <br/>
                        <FormControl type='text' name='background' id='background'/>
                    </div>
                    <br/>
                    <div className={'centerbutton'}>
                        <Button variant='light' size='lg' type='submit'>Submit</Button>
                    </div>
                </Form>

            </div>
    <h1>{this.props.message}</h1>
</div>
        );
    }
}
