import React, { Component } from 'react';
import '../App.css';

export default class Search extends Component{

    render() {

        const mapSearch = this.props.search.map((element) => {


                return(
                    <div key={element.tweets._id}>
                        <h1>{element.username}</h1>
                        <h1>{element.tweets.message}</h1>
                        <h1>{element.tweets.image}</h1>
                    </div>)}
                    );
        if ((this.props.search).length>0) {
            return (
                <div>
                    Results
                    {mapSearch}
                </div>
            )
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

