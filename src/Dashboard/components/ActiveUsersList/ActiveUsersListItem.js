import React, { useEffect } from "react";
import './ActiveUsersList.css';
import userAvatar from '../../../resources/userAvatar.png';

const ActiveUsersListItem = (props) => {

    const { activeUser } = props
    console.log(props)

    const handleListItemPressed = () => {
        // call to other user
    }

    const username = activeUser?.username?.length > 12 ? activeUser?.username.slice(0,12) + '...' : activeUser?.username
    const socketId = activeUser?.socketId?.length > 12 ? activeUser?.socketId.slice(0,12) + '...' : activeUser?.socketId

    return (
        <div className="active_user_list_item" onClick={handleListItemPressed}>
            <div className="active_user_list_image_container">
                <img className="active_user_list_image" src={userAvatar} />
            </div>
            <div>
                <span className="active_list_user_text">{activeUser?.username ? username : socketId}</span>
            </div>
        </div>
    );
};

export default ActiveUsersListItem;
