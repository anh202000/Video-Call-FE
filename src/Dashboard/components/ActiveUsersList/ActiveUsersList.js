import React from "react";
import { connect } from "react-redux";
import './ActiveUsersList.css';
import ActiveUsersListItem from './ActiveUsersListItem.js'

const ActiveUsersList = ({activeUsers}) => {
console.log(activeUsers,'activeUsers')
    return (
        <div className="active_user_list_container">
            {
                activeUsers?.map((activeUser) => <ActiveUsersListItem key={activeUser.socketId} activeUser={activeUser} />)
            }
        </div>
    );
};

const mapStateToProps = ({ dashboard }) => ({
    ...dashboard
  });
  
  export default connect(mapStateToProps)(ActiveUsersList);
