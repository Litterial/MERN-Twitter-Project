import React, { Component } from 'react';
import '../App.css';

export default class Search extends Component{

    render() {
        if (this.props.search) {
            const mapSearch = this.props.search.map((element) => {


                    return (
                        <div className='resultsElements' key={element.tweets._id}>
                            <h1>{element.username}</h1>
                            <h1>{element.tweets.message}</h1>
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

