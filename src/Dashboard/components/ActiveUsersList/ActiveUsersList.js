import React from "react";
import { connect } from "react-redux";
import './ActiveUsersList.css';
import ActiveUsersListItem from './ActiveUsersListItem.js'

const ActiveUsersList = (props) => {
const {activeUsers, callState } = props

    return (
        <div className="active_user_list_container">
            {
                activeUsers?.map((activeUser) => <ActiveUsersListItem key={activeUser.socketId} activeUser={activeUser} callState={callState}/>)
            }
        </div>
    );
};

const mapStateToProps = ({ dashboard, call }) => ({
    ...dashboard,
    ...call
  });
  
  export default connect(mapStateToProps)(ActiveUsersList);
