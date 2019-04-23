import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./Components/HomePage";
import Register from "./Components/Register";
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom'
import Search from "./Components/Search";
import LoginFail from "./Components/LoginFail";
import Banner from "./Components/Banner";
import Edit from "./Components/Edit";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { DropdownButton } from 'react-bootstrap';
// import { MenuItem } from 'react-bootstrap';


class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
            {
                // logged:false,  //check if user is logged in
                username:null,  //looks at user's username
                // truelog:'no',  //checks
                user:[], // puts all the userdata inside of an array
                tweet_id:false, //holds the id of the tweet
            }

    }

    componentDidMount=(e)=>
    {

    };

    session=(e)=>
    {
        if(this.state.username) {   //if there is a user looged in, call this function to fetch all of the user's data from mongo
            fetch('/users/' + this.state.username)
                .then(data => data.json())
                .then(jsondata => this.setState({user: jsondata}))
        }
    };

    // change=(e)=>
    // {
    //     this.setState({username:''});
    // };

    loginInfo=(username)=>   //function that runs when user enters information to login and calls back the session function
    {
        this.setState({username:username});
        this.session();
    };

     grabID=(e)=> //grabs the id of a tweet and sets the state of the tweet_id to the actual id of the tweet
     {
         e.preventDefault();
         console.log(e.target.name);
         this.setState({tweet_id:e.target.name});
     };
    logout=(e)=> //logs out the user
    {
        this.setState({ username: ''});
        fetch('/users/logout')
            .then(data => data.text())
            .then(text => console.log(text))
    };

    changeID=(e)=>
    {
      this.setState({tweet_id:false});
      this.session()
    };


    render()
    {


        console.log(this.state.user);
        const mapUser=this.state.user.map((ele)=> //maps all of the user information
        {

            return(
                <div key={ele._id}>
                <h1>{ele.username}</h1>
                    <h1>{ele.image}</h1>
                    <h1>{ele.password}</h1>
                    <h1>{ele.background}</h1>
                </div>
            )
        });
        const mapTweets= this.state.user.map((test)=>  //maps all the user's tweets. I also reversed the array so I c
        //list out the tweets in the most recent order. Here I can also set how many tweets I want to return
            {

                return test.tweets.map((element,ndx)=> {
                    console.log(element._id);
                    // this.setState({tweet_id:element.id});
                   // if(ndx===test.tweets.length-1) {
                        return (
                            <div key={element._id}>
                                <h1>{element.message}</h1>
                                <img src={element.image}></img>
                                <h1>{element.private}</h1>
                                <button name={element._id}  onClick={this.grabID}>Edit</button>
                            </div>
                        )
                    //}
                }).reverse()
            });


        return (
          <div className="App">
            <header className="App-header">

                <Banner homelogout={this.logout} loginInfo={this.loginInfo} session={this.session}
                         mapUser={mapUser} mapTweets={mapTweets} tweet_id={this.state.tweet_id} username={this.state.username} changeID={this.changeID}/>
            </header>
          </div>
        );
    }
}

export default App;
