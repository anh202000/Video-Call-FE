import React from "react";
import './ActiveUsersList.css';
import userAvatar from '../../../resources/userAvatar.png';

const ActiveUsersListItem = (props) => {

    const { ActiveUsers } = props
    console.log(props)

    const handleListItemPressed = () => {
        // call to other user
    }
    
    return (
        <div className="active_user_list_item" onClick={handleListItemPressed}>
          <div className="active_user_list_image_container">
              <img className="active_user_list_image" src={userAvatar} />
          </div>
          <span className="active_list_user_text">{ActiveUsers?.username}</span>
        </div>
    );
};

export default ActiveUsersListItem;
