import React from 'react';
import GroupCallRoomsListItem from './GroupCallRoomsListItem';
import { connect } from 'react-redux';
import './GroupCallRoomsList.css';

const GroupCallRoomsList = (props) => {
  const { groupCallRooms } = props;

  const dumyList = [
    {
    roomId: '123123',
    hostName: '123123',
  },
  {
    roomId: '123123qweqwe',
    hostName: '123123 asdasd',
  }
]
  return (
    <>
      {dumyList.map(room => <GroupCallRoomsListItem key={room.roomId} room={room} />)}
    </>
  );
};

const mapStoreStateToProps = ({ dashboard }) => (
  {
    ...dashboard
  }
);

export default connect(mapStoreStateToProps)(GroupCallRoomsList);
