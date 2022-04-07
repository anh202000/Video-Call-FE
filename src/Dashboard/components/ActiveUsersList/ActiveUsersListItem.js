import React, { useEffect } from "react";
import './ActiveUsersList.css';
import userAvatar from '../../../resources/userAvatar.png';
import Avatar, { AvatarItem } from '@atlaskit/avatar';
import Tooltip from '@atlaskit/tooltip';
import { callToOtherUser } from "../../../utils/webRTC/webRTCHandler";
import { callStates } from "../../../store/actions/callActions";
import randomColor from "randomcolor";

const ActiveUsersListItem = (props) => {
    var color = randomColor()
    console.log(color, 'color')
    const { activeUser, callState } = props
    console.log(props)

    const handleListItemPressed = () => {
        if (callState === callStates.CALL_AVAILABLE) {
            callToOtherUser(activeUser);
        }
    };

    const username = activeUser?.username?.length > 12 ? activeUser?.username.slice(0, 12) + '...' : activeUser?.username
    const socketId = activeUser?.socketId?.length > 12 ? activeUser?.socketId.slice(0, 12) + '...' : activeUser?.socketId

    return (
        <div className="active_user_list_item" onClick={handleListItemPressed}>
            <div class="avatar" style={{background: color}}>
                <div class="avatar__letters">
                    {activeUser?.username && activeUser?.username?.slice(0,2).toUpperCase()}
                </div>
                <div class="online-indicator">
                    <span class="blink"></span>
                </div>
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
