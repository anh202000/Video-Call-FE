import React, { useState, useEffect, useRef } from 'react';
import { Emoji, Picker } from 'emoji-mart';
import randomColor from 'randomcolor';
import './styled.css'
import { When } from 'react-if'
import { MdClose, MdEmojiEmotions, MdImage, MdThumbUp } from 'react-icons/md';
import { io } from 'socket.io-client';
import moment from 'moment'
import axios from "axios";

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
    const getMoment = moment().format('HH:mm:ss');
    const [state, setState] = useState({ message: "", name: username, timeSend: getMoment, roomId: [callerUserName, username], urlImg: '' })
    const [chat, setChat] = useState([])
    const [emoji, setEmoji] = useState(false);
    const [color, setColor] = useState("");
    const [file, setFile] = useState("");
    const [fileSize, setFileSize] = useState({});

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
            socketRef.current.on("message", ({ name, message, timeSend, roomId, urlImg }) => {
                setChat([...chat, { name, message, timeSend, roomId, urlImg }])
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
        setState({ message: state?.message ? state?.message + event.native : event.native, name: username, timeSend: getMoment, urlImg: file || '' })
    }

    const onCLickSendLike = (event) => {
        const { name, message, timeSend, roomId, urlImg } = state
        socketRef.current.emit("message", { name, message: 'like', timeSend, roomId, urlImg })
        setState({ message: "", name, timeSend, roomId, urlImg: '' })
        setFile('')
    }

    const onClickImage = () => {
        inputFile.current.click();
    };

    const takeImage = (event) => {
        const formData = new FormData()
        console.log(event.target.files[0], 'event.target.files[0]')
        formData.append("file", event.target.files[0])
        formData.append("upload_preset", "cloudfilesAnhLPT")
        axios
            .post(
                "https://api.cloudinary.com/v1_1/anhlptstore/image/upload/",
                formData
            )
            .then((response) => {
                if (response.status === 200) {
                    setFile(response.data.url)
                    setFileSize(event.target.files[0])
                    setState({ message: '', name: username, timeSend: getMoment, roomId: [callerUserName, username], urlImg: response.data.url })
                }
            });
    }

    const onClickShowEmoji = () => {
        setEmoji(!emoji)
    }

    const onTextChange = (e) => {
        setState({ message: e.target.value, name: username, timeSend: getMoment, roomId: [callerUserName, username], urlImg: file || '' })
    }

    const onMessageSubmit = (e) => {
        const { name, message, timeSend, roomId, urlImg } = state
        socketRef.current.emit("message", { name, message, timeSend, roomId, urlImg })
        if (urlImg?.length > 0) {
            axios
                .post(
                    "https://6162d627c48338001730074e.mockapi.io/assign/mount",
                    {
                        name: name,
                        url: urlImg,
                        time: timeSend,
                        size: fileSize?.size,
                        filename: fileSize?.name
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        setFileSize({});
                    }
                });
        }
        setFileSize({})
        setState({ message: "", name, timeSend, roomId, urlImg })
        setFile('')
    }

    const scrollBottom = () => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollBottom()
    }, [chat])

    console.log(chat, 'chat')
    return (
        <div className="chat_form background_secondary_color" ref={bottomRef}>
            <When condition={emoji}>
                <Picker
                    style={styles.emoji}
                    onSelect={onClickEmoji}
                    showPreview={false}
                    showSkinTones={false}
                />
            </When>

            <div class="container_chat">
                {chat &&
                    chat?.length > 0 &&
                    chat?.map((item) => {
                        return (
                            <div
                                className={
                                    item?.name === username
                                        ? "chat-message-group writer-user"
                                        : "chat-message-group"
                                }
                            >
                                <When condition={item?.name !== username}>
                                    <div class="chat-thumb">
                                        <div
                                            class="avatar_form"
                                            style={{
                                                background: color,
                                                float: item?.name === username ? "left" : "right",
                                                marginRight:
                                                    item?.name === username ? "20px" : "10px",
                                            }}
                                        >
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
                                    <div class="from">
                                        {item?.name !== username ? item?.name : "You"}
                                    </div>
                                    <div class="message">
                                        <When condition={item?.message === 'like'}>
                                            <MdThumbUp width="2rem" />
                                        </When>
                                        <When condition={item?.message !== 'like'}>
                                            {item?.message}
                                            <When condition={item?.urlImg?.length > 0}>
                                                <img src={item?.urlImg} css={{ borderRadius: "none !important" }} alt="Cinque Terre" width="50%" height="100" />
                                            </When>
                                        </When>
                                    </div>
                                    <div class="from">{item?.timeSend}</div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <When condition={file?.length !== 0}>
                <div
                    style={{
                        position: "fixed",
                        bottom: "38%",
                        height: "2%",
                        width: "full",
                        right: "13%",
                    }}
                >
                    <MdClose onClick={() => setFile('')} className="closeImage" fontSize="20" />
                    <img src={file} alt="Cinque Terre" width="100" height="100" />
                </div>
            </When>

            <input
                className="messages_input"
                type=""
                value={state.message}
                onChange={(e) => onTextChange(e)}
                onKeyDown={handleOnKeyDownEvent}
                placeholder="..."
            />
            <input
                type="file"
                id="file"
                accept="image/png, image/gif, image/jpeg, video/mp4,video/x-m4v,video/*"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={takeImage}
            />
            <MdThumbUp onClick={onCLickSendLike} className="like" />
            <MdEmojiEmotions onClick={onClickShowEmoji} className="emoji" />
            <MdImage onClick={onClickImage} className="image" />
        </div>
    );
}
export default ChatForm;
