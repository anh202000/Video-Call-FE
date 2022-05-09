import React, { useEffect, useState } from "react";
import logo from "../resources/logo.png";
import ActiveUsersList from "./components/ActiveUsersList/ActiveUsersList";
import * as webRTCHandler from "../utils/webRTC/webRTCHandler";
import * as webRTCGroupHandler from "../utils/webRTC/webRTCGroupCallHandler";
import "./Dashboard.css";
import DirectCall from "./components/DirectCall/DirectCall";
import { callStates } from "../store/actions/callActions";
import DashboardInformation from "./components/DashboardInformation/DashboardInformation";
import { connect } from "react-redux";
import GroupCallRoomsList from "./components/GroupCallRoomsList/GroupCallRoomsList";
import GroupCall from "./components/GroupCall/GroupCall";
import { When } from 'react-if'

const Dashboard = ({ username, callState }, props) => {
  const [showRightList, setShowRightList] = useState(true)
  console.log(username, 'username')
  useEffect(() => {
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, []);
  const onClickShowRightList = () => {
    setShowRightList(!showRightList)
  }
  return (
    <div className="dashboard_container background_main_color">
      <div className="dashboard_left_section">
        <div className="dashboard_content_container" id="dashboard_content_container">
          <DirectCall onClickShowRightList={onClickShowRightList} showRightList={showRightList} />
          <GroupCall onClickShowRightList={onClickShowRightList} showRightList={showRightList}/>
          {callState !== callStates.CALL_IN_PROGRESS && (
            <DashboardInformation username={username} />
          )}
        </div>
        <div className="dashboard_rooms_container background_secondary_color">
          <GroupCallRoomsList onClickShowRightList={onClickShowRightList} showRightList={showRightList}/>
        </div>
      </div>
      <div className="dashboard_right_section background_secondary_color">
        <When condition={showRightList}>
          <div className="dashboard_active_users_list">
            <ActiveUsersList />
          </div>
        </When>
      </div>
    </div>
  );
};

const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard,
});

export default connect(mapStateToProps)(Dashboard);
