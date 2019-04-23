import React, { Component } from 'react';
import '../App.css';
import Edit from "./Edit";


export default class Tweets extends Component{
    constructor(props)
    {
        super(props)
    }

    addTweet=(e)=>
    {
        console.log(this.props.username);
        e.preventDefault();
        fetch('/users/tweets/'+this.props.username,
            {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    message: e.target.message.value,
                    image: e.target.image.value,
                    // private: true,
                    private: e.target.private.checked,
                })
            })
                .then(data=>data.text())
                .then(()=>this.props.session())


    };
    render()
    {
      if(this.props.tweet_id)
      {
          return <Edit id={this.props.tweet_id} changeID={this.props.changeID} session={this.props.session}/>
      }



        return(
            <div>
                <form onSubmit={this.addTweet}>
                    <label htmlFor='message'>Message</label>
                    <input type='text' id='message' name='message'/>
                    <label htmlFor='image'>image</label>
                    <input type='text' id='image' name='image'/>
                    <label htmlFor='private'>Private only</label>
                    <input type='checkbox' id='private' name='private'/>
                    <button>Submit</button>

                </form>


                <h1>{this.props.tweets}</h1>
            </div>
        );
    }
}