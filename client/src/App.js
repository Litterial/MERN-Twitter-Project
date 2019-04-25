import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
                hometweets:[],
                isLogged:'',
                // searchFlag:false,
                // searcharray:{}
            }

    }


    // searchBar=(e)=>
    // {
    //     e.preventDefault();
    //     console.log('entered');
    //     fetch('/users/search/'+e.target.search.value)
    //         .then(data=>data.json())
    //         .then(jsonData=>this.setState({searcharray:jsonData,searchFlag:true}));
    //     // return <Redirect to={'/search'}/>
    // };


    componentDidMount=(e)=>
    {

            fetch('/users/hometweets')
                .then(data => data.json())
                .then(jsondata => this.setState({hometweets: jsondata}))

    };

     componentWillUnmount=(e)=> {
         this.setState({hometweets:[]});
         this.setState({user:[]});
         this.setState({isLogged:''})
     };

    session=(e)=>
    {
        if(this.state.username) {   //if there is a user looged in, call this function to fetch all of the user's data from mongo
            fetch('/users/currentuser/' + this.state.username)
                .then(data => data.json())
                .then(jsondata => this.setState({user: jsondata})
                )

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
      this.session();

    };


    render()
    {


        console.log(this.state.user);

        const mapHomeTweets=this.state.hometweets.map((ele)=>
        {
            return(
                <div className='' key={ele.tweets._id}>
                    <div>{ele.username}</div>
                    <div>{ele.tweets.message}</div>
                    <div>{ele.tweets.image}</div>
                    <div>{ele.tweets.private}</div>
                </div>

            )
        }).slice(0,5);
        const mapUser=this.state.user.map((ele)=> //maps all of the user information
        {

            return(
                <div className='centerbutton' key={ele._id}>
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
                    {
                        return (
                            <div className='centerbutton' key={element._id}>
                                <h1>{element.message}</h1>
                                <h1>{element.image}</h1>
                                <h1>{element.private}</h1>
                                <button name={element._id}  onClick={this.grabID}>Edit</button>
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
