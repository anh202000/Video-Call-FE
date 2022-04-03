import React, { useState } from 'react';
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from 'react-icons/md';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import './styled.css'

const styles = {
    icon: {
      width: '25px',
      height: '25px',
    }
  };

const PopupRoom = ({ onClickShowRoom }) => {
    
  const [passwordRoom, setPassWordRoom] = useState('')
  const [roomNm, setRoomNm] = useState('')
  const [showPass, setShowPass] = useState(false)

  const onShowPass = () => setShowPass(!showPass)
  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall({ roomName: roomNm, password: passwordRoom });
    onClickShowRoom()
  };
  console.log(passwordRoom, roomNm)
    return (
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close" onClick={onClickShowRoom}>X</span>
                <p class="text">Create Room Chat</p>

                    <label class="roomNmLabel" for="roomNm">Room Name</label>
                    <input type="text" id="roomNm" name="firstname" placeholder="Your Room Name.." onChange={event => setRoomNm(event.target.value)}/>

                    <label class="roomPassLabel" for="roomPass">Password</label>
                    <input type={showPass !== true ? "password" : "text"} id="roomPass" name="lastname" placeholder="Your Password.." onChange={event => setPassWordRoom(event.target.value)}/>

                    <input type="checkbox" size={18} onChange={onShowPass} /><span class="showPass">Show password</span>
                
                <div className='div-button'>
                    <button type="button" onClick={onClickShowRoom} class="cancelbtn">Cancel</button>
                    <button type="button" onClick={createRoom} class="submitbtn">Create</button>
                </div>
            </div>
        </div>
    );
}

export default PopupRoom