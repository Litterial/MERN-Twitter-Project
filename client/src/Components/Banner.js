import React, { Component } from 'react';
import '../App.css';
import Search from "./Search";
import Register from "./Register";
import {BrowserRouter as Router, Route,Link,Redirect} from "react-router-dom";

import Tweets from "./Tweets";
import Edit from "./Edit";
import{Nav} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import {NavDropdown} from "react-bootstrap";
import{Form} from "react-bootstrap";
import{FormControl} from "react-bootstrap";
import{Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';



export default class Banner extends Component{

    constructor(props) {
        super(props);
        this.state=({search:false})
    }

    componentDidMount=(e)=>
    {
        // console.log(this.props.mapped)

    } ;

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
            .then(jsondata=>this.props.loginInfo(jsondata['username']))


    };

    homelogout=(e)=>
    {
        this.props.homelogout()
        // this.setState({logged:false,message:''});
        // fetch('/users/logout')
        //     .then(data=>data.text())
        //     .then(text=>console.log(text))

    };
    searchBar=(e)=>
    {
        e.preventDefault();
        console.log('entered on banner');
        console.log(e.target.search.value);
        fetch('/users/search/',
            {
                method:"POST",
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify
                (
                    {
                        search: e.target.search.value,

                    }
                )
            })
            .then(data=>data.json())
            .then(jsondata=>this.setState({search:jsondata}));
        // return <Redirect to={'/search'}/>
    };

    // searchBar=(e)=>
    // {
    //     console.log('Banner search')
    //     this.props.searchBar();
    // };


    render() {
        if(this.props.username)
        {
            // console.log(this.props.mapUser);
            // console.log(this.props.mapTweets);
            return(
                <div>
                    <Navbar bg="warning" expand="lg">
                        <Navbar.Brand href="#home">Parand</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {/*<Nav.Link href="#home">Home</Nav.Link>*/}
                                {/*<Nav.Link href="#link">Link</Nav.Link>*/}
                                {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                                {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                                {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                                {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                                {/*    <NavDropdown.Divider />*/}
                                {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                                {/*</NavDropdown>*/}

                            </Nav>
                            <Form onSubmit={this.searchBar}>
                                <FormControl type="text" placeholder="Search" name='search' className="mr-sm-2" />
                            </Form>
                            <div>
                            Hi{this.props.username}
                            </div>
                            <a href ='/'>Logout</a>
                        </Navbar.Collapse>
                    </Navbar>;



                    {this.props.mapUser}
                    <h1>First Test</h1>
                    <Router>
                    {/*{this.props.mapped2}*/}
                    <Link to='/' onClick={this.homelogout}>LogOut</Link>
                        <Link to='/'>Home</Link>
                    <Link to={'/search'}>Search</Link>
                    <Link to='/register'>Register</Link>
                    <Link to={'/tweets'}>Tweets</Link>
                        {/*<Route   exact path={'/'} component={()=> <HomePage/>}/>*/}
                        {/*{this.props.tweet_id}?(<Redirect to='/edit'/>):()*/}
                        <Route exact path={'/'} component={()=> <Tweets tweets={this.props.mapTweets} username={this.props.username} session={this.props.session} tweet_id={this.props.tweet_id} changeID={this.props.changeID} searchBar={this.searchBar}
                                                                        search={this.state.search}/>}/>
                        <Route  path={'/search'} component={()=><Search search={this.state.search} />}/>
                        <Route path={'/edit'} component={()=><Edit /*tweet_id={this.props.tweet_id}*/ session={this.props.session} id={this.props.tweet_id} changeID={this.props.changeID} />}/>
                        <Route  path={'/register'} component={()=><Register  register={this.registerForm}/>}/>
                    </Router>
                </div>
            )
        }
        return (

            <div>
                <Navbar bg="warning" expand="lg">
                    <Navbar.Brand href="/">Passel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        <Form onSubmit={this.searchBar}>
                            <FormControl type="text" placeholder="Search" name='search' className="mr-sm-2" />
                        </Form>

                        <NavDropdown title="Have an account? Login" id="basic-nav-dropdown">
                            <Form onSubmit={this.login} >
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
                                <div className={'centerbutton'}>
                                    <Button variant='light' size='lg' type='submit'>Submit</Button>
                                </div>
                            </Form>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
                <h1>Login</h1>
                {this.props.isLogged}
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
                    <Link to={'/'}>Home</Link>
                    <Link to={'/search'}>Search</Link>
                    <Link to='/register'>Register</Link>
                    <Link to='/' onClick={this.homelogout}>LogOut</Link>
                    {/*<Route  exact path={'/'} component={()=> <HomePage/>}/>*/}
                    <Route exact path={'/'} component={()=> <Tweets tweets={this.props.mapTweets} username={this.props.username} session={this.props.session} tweet_id={this.props.tweet_id} changeID={this.props.changeID} mapHomeTweets={this.props.mapHomeTweets} search={this.state.search}/> }/>

                    <Route  path={'/search'} component={()=><Search search={this.state.search} />}/>
                    <Route  path={'/register'} component={()=><Register  register={this.registerForm}/>}/>
                    {/*<Route path={'/loginFail'} component={()=><LoginFail change={this.change}/>}/>*/}
                </Router>


            </div>
        );
    }

}