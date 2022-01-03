import React from "react";
import './ActiveUsersList.css';
import ActiveUsersListItem from './ActiveUsersListItem.js'

const ActiveUsers = [
    {
        socketId: 312,
        username: 'John'
    },
    {
        socketId: 313,
        username: 'John 1'
    },
    {
        socketId: 314,
        username: 'John 2'
    }
]

const ActiveUsersList = () => {
    return (
        <div className="active_user_list_container">
           {
               ActiveUsers.map((ActiveUsers) => <ActiveUsersListItem key={ActiveUsers.socketId} ActiveUsers={ActiveUsers}/>)
           }
        </div>
    );
};

export default ActiveUsersList;
