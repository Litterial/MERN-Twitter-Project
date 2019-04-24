import React, { Component } from 'react';
import '../App.css';

export default class Search extends Component{

    constructor(props)
    {
        super(props);
        this.state={searchState:false}
    }

    searchBar=(e)=>
    {
        e.preventDefault();
        console.log('entered');
        fetch('/users/search/'+e.target.search.value)
            .then(data=>data.json())
            .then(jsondata=>this.setState({searchState:jsondata}));
        // return <Redirect to={'/search'}/>
    };

    render(){
        if(this.state.searchState)
        {
            var mapSearch=this.state.searchState.map((ele)=>
            {
                return(
                    <div>
                        <h1>{ele.username}</h1>
                        <h1>{ele.tweets.message}</h1>
                        <h1>{ele.tweets.image}</h1>
                    </div>

                )
            })
            return(
                <div>
                    <form  onSubmit={this.searchBar}>
                        <label htmlFor='search'>Search</label>
                        <input type='text' name='search' id='search'/>
                        Results
                        {mapSearch}

                    </form>
                </div>
            )
        }

        return(
            <div>
                <form  onSubmit={this.searchBar}>
                    <label htmlFor='search'>Search</label>
                    <input type='text' name='search' id='search'/>

                </form>
            </div>


        );
    }
}

