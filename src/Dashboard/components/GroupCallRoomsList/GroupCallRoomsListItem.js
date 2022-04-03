import React, { useState } from 'react';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import { When } from 'react-if'

const GroupCallRoomsListItem = ({ room }) => {
  const [passwordRoom, setPassWordRoom] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const onShowPass = () => setShowPass(!showPass)

  const onClickShowRoom = () => setShowPopup(!showPopup)

  const handleListItemPressed = () => {
    setShowPopup(!showPopup)
  };
  console.log(room, 'room')


  const joinRoom = () => {
    if (passwordRoom === room?.password) {
      webRTCGroupCallHandler.joinGroupCall(room.socketId, room.roomId, room.hostName);
      onClickShowRoom()
    } if (room?.password?.length === 0) {
      webRTCGroupCallHandler.joinGroupCall(room.socketId, room.roomId, room.hostName);
      onClickShowRoom()
    }
  }

  return (
    <>
      <When condition={showPopup}>
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close" onClick={onClickShowRoom}>X</span>
            <p class="text">Join room {room?.roomName}</p>

            <label class="roomPassLabel" for="roomPass">Password</label>
            <input type={showPass !== true ? "password" : "text"} id="roomPass" name="lastname" placeholder="Your Password.." onChange={event => setPassWordRoom(event.target.value)} />

            <input type="checkbox" size={18} onChange={onShowPass} /><span class="showPass">Show password</span>

            <div className='div-button'>
              <button type="button" onClick={onClickShowRoom} class="cancelbtn">Cancel</button>
              <button type="button" onClick={joinRoom} class="submitbtn">Join</button>
            </div>
          </div>
        </div>
      </When>

      <div onClick={handleListItemPressed} className='group_calls_list_item background_main_color_room'>
        <span>{room.roomName || room.hostName}</span>
      </div>
    </>
  );
};

export default GroupCallRoomsListItem;
