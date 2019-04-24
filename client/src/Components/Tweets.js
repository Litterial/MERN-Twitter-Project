import React, { Component } from 'react';
import '../App.css';
import Edit from "./Edit";
import {BrowserRouter as Router, Route,Link,Redirect} from "react-router-dom";


export default class Tweets extends Component
{
    constructor(props) {super(props)}

    addTweet=(e)=>
    {
        console.log(this.props.username);
        console.log(e.target.date.value);
        e.preventDefault();
        fetch('/users/tweets/'+this.props.username,
            {
                    method: 'POST',
                    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify
                    (
                        {
                                    message: e.target.message.value,
                                    image: e.target.image.value,
                                    private: e.target.private.checked,
                                    date:e.target.date.value,
                                }
                    )
                })
                .then(data=>data.text())
                .then(()=>this.props.session())


    };
    render()
    {

      if(this.props.tweet_id)
      {
          return <Redirect to='/edit'/>

          // return <Edit id={this.props.tweet_id} changeID={this.props.changeID} session={this.props.session}/>
      }

      if(this.props.username)
      {
        return(
            <div>
                <form onSubmit={this.addTweet}>
                    <label htmlFor='message'>Message</label>
                    <input type='text' id='message' name='message'/>
                    <label htmlFor='image'>image</label>
                    <input type='text' id='image' name='image'/>
                    <label htmlFor='private'>Private only</label>
                    <input type='checkbox' id='private' name='private'/>
                    <input type='hidden' name='date' value={Date.now()}/>
                    <button>Submit</button>

                </form>
                <h1>{this.props.tweets}</h1>
            </div>
        )
      }

          return(
              <div>
          {this.props.mapHomeTweets}
              </div>
          )
    }
};
