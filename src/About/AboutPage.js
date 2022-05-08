import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUsername } from "../store/actions/dashboardActions";
import { registerNewUser } from "../utils/wssConnection/wssConnection";
import "./About.css";
import axios from "axios";
import { service } from "../utils/service/api";
import { MdVideoCall } from "react-icons/md";
import Header from "../utils/sharedCustom/HeaderBar/header";
import randomColor from "randomcolor";
import Policies from "./Polices";
import Location from "./Location";
import Develop from "./Develop";

const AboutPage = () => {
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
            }
          }
        });
    }
  }, [getCookie]);

  return (
    <div className="home-page">
      <Header />

      <div className="body">
        <div className="left-side">
          <div className="content">
            <h2 class="animate-charcter">Introduce SVC</h2>
            <p style={{ color: "#000000" }}>
              Enjoy frictionless meetings.
              <span
                style={{
                  color: "#00796b",
                  fontSize: "18px",
                  fontWeight: "bold",
                  margin: "0px 4px 0px 4px",
                }}
              >
                Smart Video Call
              </span>
              system takes the headaches out of joining a video call at work.
              Just set up a meeting and share a link. No worrying about whether
              teammates, clients, or customers have the right accounts or
              plug-ins. With a fast, lightweight interface and smart participant
              management, multi-person video calls are a breeze.
            </p>
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
          <span class="message-robot">I'm moving to the future...</span>
          <div id="robot">
            <div class="head"></div>
            <div class="arm l">
              <div>
                <div></div>
              </div>
            </div>
            <div class="leg l">
              <div>
                <div></div>
              </div>
            </div>
            <div class="leg r">
              <div>
                <div></div>
              </div>
            </div>
            <div class="arm r">
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Develop by */}
      <Develop />

      {/* Policy */}
      <Policies />

      {/* Location */}
      <Location/>
    </div>
  );
};

export default AboutPage;
