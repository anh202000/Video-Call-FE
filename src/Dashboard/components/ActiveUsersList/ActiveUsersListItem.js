import React, { useEffect } from "react";
import './ActiveUsersList.css';
import userAvatar from '../../../resources/userAvatar.png';

const ActiveUsersListItem = (props) => {

    const { activeUser } = props
    console.log(props)

    const handleListItemPressed = () => {
        // call to other user
    }

    return (
        <div className="active_user_list_item" onClick={handleListItemPressed}>
            <div className="active_user_list_image_container">
                <img className="active_user_list_image" src={userAvatar} />
            </div>
            <div>
                <span className="active_list_user_text">{activeUser?.username ? activeUser?.username : activeUser?.socketId}</span>
            </div>
        </div>
    );
};

export default ActiveUsersListItem;
