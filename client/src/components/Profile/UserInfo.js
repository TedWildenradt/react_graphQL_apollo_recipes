import React from 'react';
import {Link} from 'react-router-dom';

const UserInfo = ({session}) => (
  <div>
    <h3>User Info</h3>
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {session.getCurrentUser.joinDate}</p>
    <ul>
      <h3>{session.getCurrentUser.username}'s Favorites</h3>
      {session.getCurrentUser.favorites.map(favorite => 
        <li key={favorite._id}>
          <Link to={`/recipes/${favorite._id}`}><p>{favorite.name}</p></Link>
        </li>)}
    </ul>
  </div>
)

export default UserInfo;