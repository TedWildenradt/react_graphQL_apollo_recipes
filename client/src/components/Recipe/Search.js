import React from 'react';

import {Query } from 'react-apollo';
import {SEARCH_RECIPES} from '../../queries';

const Search = () => (
  <Query query={SEARCH_RECIPES} variables={{ searchTerm: '' }}>
    {({ data, loading, error}) => {
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error</div>;
      console.log(data)

       return (
        <div className="App">
          <input type="search" />
        </div>
       )
    }}
  </Query>
)

export default Search; 