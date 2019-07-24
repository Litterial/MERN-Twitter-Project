import React, { Component } from 'react';
import '../App.css';
import queryString from 'query-string'
import {BrowserRouter as Router, Route,Link,Redirect} from "react-router-dom";


export default class Search extends Component{

    componentDidMount() {
        console.log('component mounted on search.js');
        console.log(this.props.query);


        // return <Redirect to ={'/register'}/>


    }




    render() {
        const values = queryString.parse(window.location.search);
        console.log(values);
        console.log(values.q);
        if (values.q && values.q !== undefined && this.props.query!=values.q && this.props.query)
        {
            return<Redirect to={'/search?q='+this.props.query}/>
        }

        if (this.props.search) {
            const mapSearch = this.props.search.map((element) => {


                    return (
                        <div className='resultsElements' key={element.tweets._id}>
                            <div>{element.username}</div>
                            <div>{element.tweets.message}</div>
                            <img className='resizeimage' src={element.tweets.image}/>
                        </div>)
                }
            );
            if ((this.props.search).length > 0) {
                return (
                    <div className='centerResults'>
                        <h1>Results</h1>
                        {mapSearch}
                    </div>
                )
            }

        }
        return (
            <div>
                {/*<form  onSubmit={this.searchBar}>*/}
                {/*    <label htmlFor='search'>Search</label>*/}
                {/*    <input type='text' name='search' id='search'/>*/}

                {/*</form>*/}
                No tweets found
            </div>


        );

    }

}

