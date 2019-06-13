import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Banner from "./Components/Banner";
import {Button} from "react-bootstrap";


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
                hometweets:[],
                isLogged:'',

            }

    }

    collectdata=(e)=>//grab data of all public tweets
    {
        console.log('Am I running?');
        fetch('/users/hometweets')
            .then(data => data.json())
            .then(jsondata => this.setState({hometweets: jsondata}))

    };

    componentDidMount=(e)=>
    {
        console.log('Component Did Mount');
        this.collectdata();
        fetch('/users',
            {
                credentials: 'include',
            })
            .then(data => data.text())
            .then(text => this.setState({username: text}));
        this.session();
    };

     componentWillUnmount=(e)=> {
         // this.setState({hometweets:[]});
         // this.setState({user:[]});
         // this.setState({isLogged:''})
     };

    session=(e)=>
    {     console.log ('session ran');
            // fetch('/users/currentuser/')
        fetch('/users/currentuser/',
            {
                credentials: 'include',
            })
                .then(data => data.json())
                .then(jsondata => this.setState({user: jsondata}))

    };

    // change=(e)=>
    // {
    //     this.setState({username:''});
    // };

    noUser=(e)=>
    {
        this.setState({username:null});
        this.setState({user:[]});
    };
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
        // this.setState({ username: ''});
        fetch('/users/logout',{
            credentials: 'include',
        })
            .then(data => data.text())
            .then(text => console.log(text));
        this.changeID();
        this.noUser();
        this.collectdata();
    };

    changeID=(e)=>
    {
      this.setState({tweet_id:false});
      this.session();

    };



    render()
    {


        console.log(this.state.user);
        console.log(this.state.username);

        const mapHomeTweets=this.state.hometweets.map((ele)=>
        {
            return(
                <div className='tweetbackground' key={ele.tweets._id}>
                    <div className='centertweets'>{ele.username}</div>
                    <div className='centertweets'>{ele.tweets.message}</div>
                    <div className='centertweets'><img className='resizeimage' src={ele.tweets.image}/></div>
                </div>

            )
        }).slice(0,5);
        const mapUser=this.state.user.map((ele)=> //maps all of the user information
        {
               var backgroundImage=ele.background;
               var background={
                   backgroundImage:`url(${backgroundImage})`,
                   marginBottom: '6%',
                   textAlign: 'center',
                   height:'10%',
                   width:'100%'
               };
            return(
                <div  style={background} key={ele._id}>
                <h1>{ele.username}</h1>
                    <div><img className='profileimage' src={ele.image}/></div>
                    {/*<div> <img src={ele.background}/></div>*/}
                </div>
            )
        });
        const mapTweets= this.state.user.map((test)=>  //maps all the user's tweets. I also reversed the array so I c
        //list out the tweets in the most recent order. Here I can also set how many tweets I want to return
            {
                return test.tweets.map((element,ndx)=> {
                    var post='lock-locked-8x.png';
                    if (element.private =='false')
                        var post='globe-8x.png';

                    console.log(element._id);
                    // this.setState({tweet_id:element.id});
                    {
                        return (
                            <div className='tweetbackgroundB' key={element._id}>
                                <img className='small' src={post}/>
                                <div className='centertweets'>{test.username}</div>
                                <div className='centertweets'>{element.message}</div>
                                <div className='centertweets'><img className='resizeimage' src={element.image}/></div>

                                <Button variant='light' size='lg' type='submit' name={element._id} onClick={this.grabID}>Edit</Button>

                                {/*<button name={element._id}  onClick={this.grabID}>Edit</button>*/}
                            </div>
                        )
                    }
                }).slice(-5).reverse()
            });


        return (
          <div className="App">
            <header className="App-header">

                <Banner homelogout={this.logout} loginInfo={this.loginInfo} session={this.session} mapHomeTweets={mapHomeTweets} isLogged={this.state.isLogged}
                         mapUser={mapUser} mapTweets={mapTweets} tweet_id={this.state.tweet_id} username={this.state.username} changeID={this.changeID} /*searchBar={this.searchBar}*/ /*searchArray={this.state.searchArray} searchFlag={this.state.searchFlag}*//>
            </header>
          </div>
        );
    }
}

export default App;
