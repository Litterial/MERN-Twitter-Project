import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom'
// import '../App.css'
import Register from "./Register";
import Search from "./Search";
import LoginFail from "./LoginFail";
// import "bootstrap/dist/css/bootstrap.min.css";

export default class HomePage extends Component {

    componentDidMount=(e)=>
    {
        // console.log(this.props.mapped)

    } ;

    // login=(e)=>
    // {
    //     e.preventDefault();
    //     fetch('/users/login',
    //         {
    //             method:"POST",
    //             headers:{"Accept":"application/json","Content-Type":"application/json"},
    //             body:JSON.stringify({username:e.target.username.value,password:e.target.password.value})
    //         })
    //         .then(data=>data.json())
    //         .then(jsondata=>this.props.loginInfo(jsondata['logged'],jsondata['message'],jsondata['truelog']))
    //
    //
    // };
    //
    // homelogout=(e)=>
    // {
    //     this.props.homelogout()
    //     // this.setState({logged:false,message:''});
    //     // fetch('/users/logout')
    //     //     .then(data=>data.text())
    //     //     .then(text=>console.log(text))
    //
    // };

    render() {
        // if(this.props.logged)
        // {
        //     console.log(this.props.mapped)
        //     console.log(this.props.mapped2)
        //     return(
        //         <div>
        //         <h1>Test</h1>
        //             {this.props.mapped}
        //             {this.props.mapped2}
        //         <Link to='/' onClick={this.homelogout}>LogOut</Link>
        //         </div>
        //     )
        // }
        return (
            <div>
                Home
               {/* <h1>Login</h1>*/}
               {/* <h2> {this.props.message}</h2>*/}

               {/* <form onSubmit={this.login} >*/}
               {/* <div className='i-block'>*/}
               {/*<label htmlFor='username'>Username</label>*/}
               {/*     <br/>*/}
               {/*    <input type='text' name='username' id='username'/>*/}
               {/* </div>*/}
               {/*    <div className='i-block'>*/}
               {/*    <label htmlFor='password'>Password</label>*/}
               {/*        <br/>*/}
               {/*    <input type='password' name='password' id='password'/>*/}
               {/*    </div>*/}
               {/*    <div className='i-block'>*/}
               {/*        <input type='submit' name='submit'/>*/}
               {/*    </div>*/}
               {/*</form>*/}
               {/* <Link to={'/'}>Home</Link>*/}
               {/* <Link to={'/search'}>Search</Link>*/}
               {/* <Link to='/register'>Register</Link>*/}
               {/* <Link to='/' onClick={this.homelogout}>LogOut</Link>*/}


            </div>
        );
    }
}

