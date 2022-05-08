import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import logo from "../resources/logo.png";
import UsernameInput from "./components/UsernameInput";
import SubmitButton from "./components/SubmitButton";
import { useHistory } from "react-router-dom";
import { setUsername } from "../store/actions/dashboardActions";
import { registerNewUser } from "../utils/wssConnection/wssConnection";
import "./LoginPage.css";
import axios from "axios";
import { service } from "../utils/service/api";
import { MdVideoCall } from "react-icons/md";
import Header from "../utils/sharedCustom/HeaderBar/header";
import randomColor from "randomcolor";
const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState("");
  const [listUser, setListUser] = useState([]);

  const history = useHistory();
  const getCookie = document.cookie;
  const getUserName = document.cookie?.replace(
    "token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NDAiLCJleHAiOjE3Mjk0ODA2NTksImlhdCI6MTY0MzA4MDY1OX0.-yAjNmRzMKA6Sg5mj1qAu_TNKpWtlGgQBi05oPHiOcYek4oPxEdyVt3ASVl0aGY4Q6a0MD1-e7DCt8oCvtvXww",
    ""
  );
  useEffect(() => {
    if (getCookie?.length === 0) {
      history.push("/login");
    } else {
      axios
        .get(service.loginapi, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setListUser(response.data);
            const checkAuth = response.data?.filter(
              (item) =>
                item?.username ===
                getCookie?.replace(
                  "token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NDAiLCJleHAiOjE3Mjk0ODA2NTksImlhdCI6MTY0MzA4MDY1OX0.-yAjNmRzMKA6Sg5mj1qAu_TNKpWtlGgQBi05oPHiOcYek4oPxEdyVt3ASVl0aGY4Q6a0MD1-e7DCt8oCvtvXww",
                  ""
                )
            );
            if (checkAuth?.length === 0) {
              history.push("/login");
            } else {
              setUsername(getUserName);
              history.push("/");
            }
          }
        });
    }
  }, [getCookie]);

  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    saveUsername(username);
    history.push("/dashboard");
  };

  return (
    // <div className='login-page_container background_main_color'>
    //   <div className='login-page_login_box background_secondary_color'>
    //     <div className='login-page_logo_container'>
    //       <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
    //     </div>
    //     <div className='login-page_title_container'>
    //       <h2>Get on Board</h2>
    //     </div>
    //     <UsernameInput username={username} setUsername={setUsername} handleSubmitButtonPressed={handleSubmitButtonPressed}/>
    //     {/* <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} username={username}/> */}
    //   </div>
    // </div>
    <div className="home-page">
      <Header />
      <div className="body">
        <div className="left-side">
          <div className="content">
            <h2 class="animate-charcter">Smart Video Call</h2>
            <p style={{ color: "#000000" }}>
              Hello{" "}
              <span
                style={{
                  color: "#00796b",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {getUserName}
              </span>
              , We re-engineered the service to make it free and available for
              all.
            </p>

            <div className="action-btn">
              <div className="input-block">
                <div className="input-section">
                  <input
                    style={{ color: "#00796b", fontSize: "18px" }}
                    placeholder="Enter you name"
                    value={getUserName}
                  />
                </div>
                <button
                  className="btn green"
                  onClick={handleSubmitButtonPressed}
                >
                  Get Started
                  <MdVideoCall
                    style={{
                      width: "28px",
                      height: "28px",
                      marginLeft: "4px",
                      verticalAlign: "middle",
                      fill: "#e6e5e8",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="help-text">
            <a style={{ marginRight: "20px", fontSize: "16px" }}>
              The system has{" "}
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {listUser?.length || 0}
              </span>{" "}
              users{" "}
            </a>

            <div
              class="avatars"
              style={{
                background: "#00796b",
                cursor: "pointer",
                marginRight: "20px",
              }}
            >
              <div class="avatar__letterss">{listUser?.length + "+" || 0}</div>
            </div>

            {listUser &&
              listUser?.slice(0, 6)?.map((item) => {
                const color = randomColor();
                return (
                  <div
                    class="avatars"
                    style={{ background: color, cursor: "pointer" }}
                  >
                    <div class="avatar__letterss">
                      {item?.username?.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="right-side">
          <div className="content">
            <div id="slideshow">
              <div class="containerss">
                <img src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg" />
                <img src="https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/123257/Originals/Video-call-la-gi-nhung-ung-dung-goi-video-call-pho-bien-hien-nay-2.jpg" />
                <img src="https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/123257/Originals/Video-call-la-gi-nhung-ung-dung-goi-video-call-pho-bien-hien-nay-4.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username)),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
