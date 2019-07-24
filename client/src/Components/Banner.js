import React, { Component } from 'react';
import '../App.css';
import Search from "./Search";
import Register from "./Register";
import MyTweets from "./MyTweets";
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
import queryString from 'query-string'



export default class Banner extends Component{

    constructor(props) {
        super(props);
        this.state=({search:false,query:'',
        message:''})
    }

    componentDidMount() {
        console.log('componentDidMount on banner');
        const values = queryString.parse(window.location.search);
        console.log(values);
        console.log(values.q);
        if (values.q && values.q !== undefined) {
            console.log('both are true');
            this.setState({query:values.q});
            fetch('users/search/' + values.q)

                .then(data=>data.json())
                .then(jsondata=>this.setState({search:jsondata}))
        }

    }

    changeQuery=(e)=>
    {
        const values = queryString.parse(window.location.search);
        console.log(values);
        console.log(values.q);
        if (values.q && values.q !== undefined) {
            console.log('both are true');
            this.setState({query:values.q});
            fetch('users/search/' + values.q)

                .then(data=>data.json())
                .then(jsondata=>this.setState({search:jsondata}))

                 }
    };

    login=(e)=>
    {
        e.preventDefault();
        fetch('/users/login',
            {
                method:"POST",
                credentials: 'include',
                headers:{"Accept":"application/json","Content-Type":"application/json"},
                body:JSON.stringify({username:e.target.username.value,password:e.target.password.value})
            })
            .then(data=>data.json())
            .then(jsondata=>this.props.loginInfo(jsondata['username']))
            // .then(()=>this.kennTest());



    };

    // kennTest(){
    //     fetch('/users/kennTest',{
    //         method:"POST",
    //         credentials: 'include',
    //         headers:{"Accept":"application/json","Content-Type":"application/json"},
    //     })
    //         .then(data=>data.text())
    //         .then(data=>console.log(data));
    // }


    logout=(e)=>
    {
        this.props.logout()
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
        this.setState({query:e.target.search.value});
        console.log(e.target.search.value);
        console.log('fetching /users/search/ from post');
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
            // .then(e.target.search.value='')
    };

    registerForm=(e)=>
    {

        e.preventDefault();
        console.log('Did it run');
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


    clickRegister=(e)=>
    {
        this.setState({search:false})
    };


    render() {
        console.log('this.state.query');
        console.log(this.state.query);
        if(this.props.username)
        {
            console.log('ON user');
            // console.log(this.props.mapUser);
            // console.log(this.props.mapTweets);
            return(
                <Router>
                <div>
                    <Navbar bg="warning" expand="lg">
                        <Navbar.Brand><Link to='/' className='noUnderline'>Passel</Link></Navbar.Brand>
                        <Navbar.Brand><Link to='/myTweets' className='noUnderline'>My Tweets</Link></Navbar.Brand>
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
                            <div className ='padNavbar'>
                            Hi {this.props.username}
                            </div>
                            <Link to='/' className ='padNavbar' onClick={this.logout}>Logout</Link>
                        </Navbar.Collapse>
                    </Navbar>

                    {this.props.mapUser}
                    {/*<h1>First Test</h1>*/}
                    {/*/!*{this.props.mapped2}*!/*/}
                    {/*<Link to='/' onClick={this.homelogout}>LogOut</Link>*/}
                    {/*    <Link to='/' onClick={this.changeSearch}>Home</Link>*/}
                    {/*<Link to={'/search'}>Search</Link>*/}
                    {/*<Link to='/register'>Register</Link>*/}
                    {/*<Link to={'/tweets'}>Tweets</Link>*/}
                        {/*<Route   exact path={'/'} component={()=> <HomePage/>}/>*/}
                        {/*{this.props.tweet_id}?(<Redirect to='/edit'/>):()*/}
                        <Route exact path={'/'} component={()=> <Tweets tweets={this.props.mapTweets} username={this.props.username} session={this.props.session} tweet_id={this.props.tweet_id} changeID={this.props.changeID} search={this.state.search} mapHomeTweets={this.props.mapHomeTweets} query={this.state.query} />}/>
                        <Route path={'/myTweets'} component={()=> <MyTweets tweets={this.props.mapTweets} username={this.props.username} session={this.props.session} tweet_id={this.props.tweet_id} changeID={this.props.changeID} mapHomeTweets={this.props.mapHomeTweets} search={this.state.search} query={this.state.query} /> }/>
                        <Route  path={'/search'} component={()=><Search search={this.state.search} query={this.state.query} changeQuery={this.changeQuery} />}/>
                        <Route path={'/edit'} component={()=><Edit  session={this.props.session} id={this.props.tweet_id} changeID={this.props.changeID} search={this.state.search} query={this.state.query}/>}/>
                        <Route  path={'/register'} component={()=><Register  registerForm={this.registerForm} search={this.state.search} query={this.state.query}/>}/>

                </div>
                </Router>
            )
        }
        console.log('On logout');
        console.log(this.props.username);
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
                            <Button variant='light' size='lg' className='registerButton'><Link to={'register'} onClick={this.clickRegister} className='noUnderline'>Register</Link></Button>

                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
                {/*<h1>Login</h1>*/}
                {/*{this.props.isLogged}*/}
                {/*<form onSubmit={this.login} >*/}
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
                {/*        <input type='submit' name='submit'/>*/}
                {/*    </div>*/}
                {/*</form>*/}



                {/*<Router>*/}
                {/*    <Link to={'/'} onClick={this.changeSearch}>Home</Link>*/}
                {/*    /!*<Link to={'/search'}>Search</Link>*!/*/}
                {/*    /!*<Link to='/register'>Register</Link>*!/*/}
                {/*    <Link to='/' onClick={this.homelogout}>LogOut</Link>*/}
                    {/*<Route  exact path={'/'} component={()=> <HomePage/>}/>*/}
                    <Route exact path={'/'} component={()=> <Tweets tweets={this.props.mapTweets} username={this.props.username} session={this.props.session} tweet_id={this.props.tweet_id} changeID={this.props.changeID} mapHomeTweets={this.props.mapHomeTweets} search={this.state.search} query={this.state.query}/> }/>
                    <Route path={'/myTweets'} component={()=> <MyTweets tweets={this.props.mapTweets} username={this.props.username} session={this.props.session} tweet_id={this.props.tweet_id} changeID={this.props.changeID} mapHomeTweets={this.props.mapHomeTweets} search={this.state.search} query={this.state.query}/> }/>
                    <Route  path={'/search'} component={()=><Search search={this.state.search} query={this.state.query} changeQuery={this.changeQuery}/>}/>
                    <Route  path={'/register'} component={()=><Register  search={this.state.search} query={this.state.query} registerForm={this.registerForm} message={this.state.message}/>}/>
                    {/*<Route path={'/loginFail'} component={()=><LoginFail change={this.change}/>}/>*/}
                </Router>


            </div>
        );
    }

}