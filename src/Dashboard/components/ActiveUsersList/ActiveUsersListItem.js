import React, { useEffect } from "react";
import './ActiveUsersList.css';
import userAvatar from '../../../resources/userAvatar.png';
import Avatar, { AvatarItem } from '@atlaskit/avatar';
import Tooltip from '@atlaskit/tooltip';
import { callToOtherUser } from "../../../utils/webRTC/webRTCHandler";

const ActiveUsersListItem = (props) => {

    const { activeUser } = props
    console.log(props)

    const handleListItemPressed = () => {
        callToOtherUser(activeUser)
    }

    const username = activeUser?.username?.length > 12 ? activeUser?.username.slice(0, 12) + '...' : activeUser?.username
    const socketId = activeUser?.socketId?.length > 12 ? activeUser?.socketId.slice(0, 12) + '...' : activeUser?.socketId

    return (
        <div className="active_user_list_item" onClick={handleListItemPressed}>
            <div className="active_user_list_image_container">
                <AvatarItem avatar={<Avatar presence="online" />} />
            </div>
            <div>
                <Tooltip content={activeUser?.username ? username : 'Unknow'}>
                    <span className="active_list_user_text">{activeUser?.username ? username : socketId}</span>
                </Tooltip>
            </div>
        </div>
    );
};

export default ActiveUsersListItem;
