import React, { Component } from 'react';
import '../App.css';
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom'
import {Button, Form, FormControl} from "react-bootstrap";


export default class Edit extends Component{

    constructor(props)
    {
        super(props);
        this.state={editarray:[],mounted:false};

    }

    componentDidMount=(e)=>
    {

        this.setState({mounted:true});
        {
            fetch('/users/mytweets/' + this.props.id)
                .then(data => data.json())
                .then(jsondata => this.setState({editarray: [jsondata]}))
        }
    };

    componentWillUnmount=(e)=> {
        this.setState({mounted:false});
        this.setState({editarray:[]});
        this.props.changeID()
    };

    editTweet=(e)=>
    {
        e.preventDefault();
        fetch('/users/mytweets/'+this.props.id,
            {
                method:'PUT',
                headers:{'Accept': 'application/json', 'Content-Type': 'application/json'},
                body:JSON.stringify({message:e.target.message.value, image:e.target.image.value, private:e.target.private.checked})
                })

            .then(data=>data.json())
            .then(jsondata=>this.setState({editarray:[jsondata]}));
                 console.log('editarray');
                // console.log(this.state.editarray);
                this.props.changeID();
                // this.props.session();
            // .then(jsonData=>d)
    };


    render(){

        if(this.props.id==false)
        {
            return <Redirect to='/'/>
        }

        console.log(this.state.editarray);
        console.log('___________________');
        console.log(this.props.id);
        var edit=this.state.editarray.map((ele)=>
        {
            // checks to see if user checked the checkbox in their initial tweet, if true, this will change the defaultChecked
            //value to true to fill the checkbox, otherwise it will change to false and uncheck the checkbox
            let c = ele.private ==='true'? true: false;

            return(
                <div>
                    {/*<form onSubmit={this.editTweet}>*/}
                    {/*    <label htmlFor='message'>Message</label>*/}
                    {/*    <input type='text' id='message' name='message' defaultValue={ele.message}/>*/}
                    {/*    <label htmlFor='image'>image</label>*/}
                    {/*    <input type='text' id='image' name='image' defaultValue={ele.image}/>*/}
                    {/*    <label htmlFor='private'>Private only</label>*/}
                    {/*    <input type='checkbox' id='private' name='private' defaultChecked={c} />*/}
                    {/*    <button>Submit</button>*/}
                    {/*</form>*/}
                    <Form className='addForm' onSubmit={this.editTweet} >
                        <div>
                            <label htmlFor='message'>Message</label>
                            <br/>
                            <FormControl type='text'  name='message' defaultValue={ele.message}/>
                        </div>
                        <div>
                            <label htmlFor='image'>Image</label>
                            <br/>
                            <FormControl type='text' name='image' defaultValue={ele.image}/>
                        </div>
                        <div>
                            <Form.Check type="checkbox" name='private' defaultValue={c} />

                        </div>
                        <div className={'centerbutton'}>
                            <Button variant='light' size='lg' type='submit'>Submit</Button>
                        </div>
                    </Form>
                </div>
            )});

        return(
            <div>
                Edit form
                {edit}
            </div>
        );
    }
}