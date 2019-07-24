import React, { Component } from 'react';
import '../App.css';

import {BrowserRouter as Router, Route,Link,Redirect} from "react-router-dom";
import {Button, Form, FormControl} from "react-bootstrap";



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
      // console.log(values);
      if(this.props.tweet_id)
      {
          return <Redirect to='/edit'/>

          // return <Edit id={this.props.tweet_id} changeID={this.props.changeID} session={this.props.session}/>
      }
      if(this.props.search)
      {
          console.log('redirect to search from tweets');
          return<Redirect to={'/search?q='+this.props.query}/>
      }
      //
      // if(this.props.username)
      // {
      //   return(
      //       <div>
      //           {/*<form onSubmit={this.addTweet}>*/}
      //           {/*    <label htmlFor='message'>Message</label>*/}
      //           {/*    <input type='text' id='message' name='message'/>*/}
      //           {/*    <label htmlFor='image'>image</label>*/}
      //           {/*    <input type='text' id='image' name='image'/>*/}
      //           {/*    <label htmlFor='private'>Private only</label>*/}
      //           {/*    <input type='checkbox' id='private' name='private'/>*/}
      //           {/*    <input type='hidden' name='date' value={Date.now()}/>*/}
      //           {/*    <button>Submit</button>*/}
      //
      //           {/*</form>*/}
      //           <Form className='addForm' onSubmit={this.addTweet} >
      //               <div>
      //                   <label htmlFor='message'>Message</label>
      //                   <br/>
      //                   <FormControl type='text' placeholder="What's happening? " name='message' id='message'/>
      //               </div>
      //               <div>
      //                   <label htmlFor='image'>Image</label>
      //                   <br/>
      //                   <FormControl type='text' name='image' id='image'/>
      //               </div>
      //               <div>
      //                   <Form.Check type="checkbox" name='private' label="Private only?" />
      //
      //               </div>
      //               <div>
      //
      //                   <FormControl type='hidden' name='date' value={Date.now()}/>
      //               </div>
      //
      //               <div className={'centerbutton'}>
      //                   <Button variant='light' size='lg' type='submit'>Submit</Button>
      //               </div>
      //           </Form>
      //           <div className="divAllTweets">{this.props.tweets}</div>
      //       </div>
      //   )
      // }

          return(
              <div>
              <div className="divAllTweets">
                    {this.props.mapHomeTweets}
              </div>
              </div>
          )
    }
};
