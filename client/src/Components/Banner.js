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
        this.state=({search:false,
        message:''})
    }

    componentDidMount=(e)=>
    {
        // console.log(this.props.mapped)

    } ;
    // componentWillMount=(e)=> {
    //     this.setState({search:false})
    // };

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

    changeSearch=(e)=>
    {
        this.setState({search:false})
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
            .then(jsondata=>this.setState({search:jsondata}))
            .then(e.target.search.value='')
    };

    registerForm=(e)=>
    {
        e.preventDefault();
        fetch('users/register',
            {
                method:'POST',
                headers:
                    {'Accept':'application/json', 'Content-Type':'application/json',},
                body:JSON.stringify({username:e.target.username.value, password:e.target.password.value,
                    image:e.target.image.value,background:e.target.background.value}),
            })
            .then(data=>data.text())
            .then(message=>this.setState({message:message}))

    };

    // searchBar=(e)=>
    // {
    //     console.log('Banner search')
    //     this.props.searchBar();
    // };

    clickRegister=(e)=>
    {
        this.setState({search:false})
    };


    render() {
        if(this.props.username)
        {
            console.log('ON user')
            // console.log(this.props.mapUser);
            // console.log(this.props.mapTweets);
            return(
                <div>
                    <Navbar bg="warning" expand="lg">
                        <Navbar.Brand href="#home">Passel</Navbar.Brand>
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
                        <Link to='/' onClick={this.changeSearch}>Home</Link>
                    <Link to={'/search'}>Search</Link>
                    <Link to='/register'>Register</Link>
                    <Link to={'/tweets'}>Tweets</Link>
                        {/*<Route   exact path={'/'} component={()=> <HomePage/>}/>*/}
                        {/*{this.props.tweet_id}?(<Redirect to='/edit'/>):()*/}
                        <Route exact path={'/'} component={()=> <Tweets tweets={this.props.mapTweets} username={this.props.username} session={this.props.session} tweet_id={this.props.tweet_id} changeID={this.props.changeID} searchBar={this.searchBar}
                                                                        search={this.state.search}/>}/>
                        <Route  path={'/search'} component={()=><Search search={this.state.search} />}/>
                        <Route path={'/edit'} component={()=><Edit /*tweet_id={this.props.tweet_id}*/ session={this.props.session} id={this.props.tweet_id} changeID={this.props.changeID} />}/>
                        <Route  path={'/register'} component={()=><Register  registerForm={this.registerForm}/>}/>
                    </Router>
                </div>
            )
        }
        console.log('On logout')
        return (

            <div>
                <Router>
                <Navbar bg="warning" expand="lg">
                    <Navbar.Brand><Link to='/' className='noUnderline' onClick={this.changeSearch}>Passel</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        <Form onSubmit={this.searchBar}>
                            <FormControl type="input" placeholder="Search" name='search' className="mr-sm-2" />
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
                                <br/>
                                <div className={'centerbutton'}>
                                    <Button variant='light' size='lg' type='submit'>Submit</Button>
                                </div>
                            </Form>
                            {/*<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                            {/*<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                            <NavDropdown.Divider />
                            {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}

                            {/*<Router>*/}
                            <Button variant='light' size='lg'><Link to={'register'} onClick={this.clickRegister} className='noUnderline'>Register</Link></Button>

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



                {/*<Router>*/}
                    <Link to={'/'} onClick={this.changeSearch}>Home</Link>
                    {/*<Link to={'/search'}>Search</Link>*/}
                    {/*<Link to='/register'>Register</Link>*/}
                    <Link to='/' onClick={this.homelogout}>LogOut</Link>
                    {/*<Route  exact path={'/'} component={()=> <HomePage/>}/>*/}
                    <Route exact path={'/'} component={()=> <Tweets tweets={this.props.mapTweets} username={this.props.username} session={this.props.session} tweet_id={this.props.tweet_id} changeID={this.props.changeID} mapHomeTweets={this.props.mapHomeTweets} search={this.state.search}/> }/>

                    <Route  path={'/search'} component={()=><Search search={this.state.search} />}/>
                    <Route  path={'/register'} component={()=><Register  search={this.state.search} registerForm={this.registerForm}/>}/>
                    {/*<Route path={'/loginFail'} component={()=><LoginFail change={this.change}/>}/>*/}
                </Router>


            </div>
        );
    }

}