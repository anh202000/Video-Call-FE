import React, { useState, useEffect, useRef } from 'react';
import { Emoji, Picker } from 'emoji-mart';
import randomColor from 'randomcolor';
import './styled.css'
import { When } from 'react-if'
import { MdEmojiEmotions, MdImage, MdThumbUp } from 'react-icons/md';
import { io } from 'socket.io-client';
import moment from 'moment'

export const styles = {
    icon: {
        width: '30px',
        height: '26px',
        fill: '#FFFAF0',
        position: 'absolute',
        bottom: '1%',
        right: '2%'
    },
    emoji: {
        width: "98%",
        position: "absolute",
        bottom: "8%",
        right: "1%",
        zindex: "999",
        height: "62%",
    }
};

const ChatForm = ({ username, callerUserName }) => {
    console.log(callerUserName, 'callerUserName')
    const getMoment = moment().format('HH:mm:ss');
    const [state, setState] = useState({ message: "", name: username, timeSend: getMoment, roomId: [callerUserName, username] })
    const [chat, setChat] = useState([])
    const [emoji, setEmoji] = useState(false);
    const [color, setColor] = useState("");
    const [file, setFile] = useState();

    const socketRef = useRef()
    const inputFile = useRef(null) 
    const bottomRef = useRef() 

    useEffect(() => {
        const checkrender = randomColor()
        setColor(checkrender)
    }, [])

    useEffect(
        () => {
            socketRef.current = io.connect("http://localhost:5000")
            socketRef.current.on("message", ({ name, message, timeSend, roomId }) => {
                setChat([...chat, { name, message, timeSend, roomId }])
            })
            return () => socketRef.current.disconnect()
        },
        [chat]
    )

    const handleOnKeyDownEvent = (e) => {
        if (e.keyCode === 13) {
            onMessageSubmit()
        }
    };

    const onClickEmoji = (event) => {
        setState({ message: state?.message ? state?.message + event.native : event.native, name: username, timeSend: getMoment })
    }

    const onCLickSendLike = (event) => {

    }

    const onClickImage = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
      };

    const takeImage = (event) => {
        setState({ message: event.target.files[0].name, name: username, timeSend: getMoment, roomId: [callerUserName, username] })
        setFile(event.target.files[0])
    }

    const onClickShowEmoji = () => {
        setEmoji(!emoji)
    }

    const onTextChange = (e) => {
        setState({ message: e.target.value, name: username, timeSend: getMoment, roomId: [callerUserName, username] })
    }

    const onMessageSubmit = (e) => {
        const { name, message, timeSend, roomId } = state
        socketRef.current.emit("message", { name, message, timeSend, roomId })
        setState({ message: "", name, timeSend, roomId })
    }

    const scrollBottom = () => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if(chat?.length) {
            scrollBottom()
        }
    }, [chat])

    console.log(chat, 'chat')
    return (
        <div className='chat_form background_secondary_color' ref={bottomRef}>
            <When condition={emoji}>
                <Picker
                    style={styles.emoji}
                    onSelect={onClickEmoji}
                    showPreview={false}
                    showSkinTones={false}
                />
            </When>

            <div class="container_chat">
                {chat && chat?.length > 0 && chat?.map((item) => {
                    return (
                        <div className={item?.name === username ? "chat-message-group writer-user" : "chat-message-group"}>
                            <When condition={item?.name !== username}>
                                <div class="chat-thumb">
                                    <div class="avatar_form" style={{ background: color, float: item?.name === username ? 'left' : 'right', marginRight: item?.name === username ? '20px' : '10px' }}>
                                        <div class="avatar__letters">
                                            {item?.name.slice(0, 2)}
                                        </div>
                                        <div class="online-indicator">
                                            <span class="blink"></span>
                                        </div>
                                    </div>
                                </div>
                            </When>
                            <div class="chat-messages">
                                <div class="from">{item?.name !== username ? item?.name : 'You'}</div>
                                <div class="message">{item?.message}</div>
                                <div class="from">{item?.timeSend}</div>
                            </div>
                        </div>
                    )
                })}
            </div>


            <input
                className='messages_input'
                type=''
                value={state.message}
                onChange={(e) => onTextChange(e)}
                onKeyDown={handleOnKeyDownEvent}
                placeholder='...'
            />
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={takeImage}/>
            <MdThumbUp onClick={onCLickSendLike} className='like' />
            <MdEmojiEmotions onClick={onClickShowEmoji} className='emoji' />
            <MdImage onClick={onClickImage} className='image' />
        </div>
    )
}
export default ChatForm;
