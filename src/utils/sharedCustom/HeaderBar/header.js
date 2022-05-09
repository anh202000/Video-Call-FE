import Cookies from "js-cookie";
import randomColor from "randomcolor";
import { useEffect, useState } from "react";
import { When } from "react-if";
import { useHistory, useLocation } from "react-router-dom";
import "./styled.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { service } from "../../service/api";

const Header = () => {
  const [getRole, setGetRole] = useState([])
  console.log(getRole, 'getRole')
  const getCookie = document.cookie;

  var color = randomColor();
  const history = useHistory();
  const getUserName = document.cookie?.replace(
    "token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NDAiLCJleHAiOjE3Mjk0ODA2NTksImlhdCI6MTY0MzA4MDY1OX0.-yAjNmRzMKA6Sg5mj1qAu_TNKpWtlGgQBi05oPHiOcYek4oPxEdyVt3ASVl0aGY4Q6a0MD1-e7DCt8oCvtvXww",
    ""
  );
  const [showContextMenu, setShowContextmenu] = useState(false);
  const onClickContextMenu = () => setShowContextmenu(!showContextMenu);
  const changePassworkPage = () => {
    history.push("/Change-password");
  };
  const logOut = () => {
    Cookies.remove("token");
    history.push("/login");
  };
  const location = useLocation();
  const getPathName = location.pathname;

  const callPhoneNumber = () => {
    navigator.clipboard.writeText("0962731018");
    toast.success("Copy phone number 0962731018 success", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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
              setGetRole(checkAuth)
            }
          }
        });
    }
  }, [getCookie]);

  return (
    <div className="header">
      <div className="logo">
        <img
          className="logo_img"
          src="https://cdn.dribbble.com/users/384646/screenshots/10774919/media/1a5d0064ae5c47ef6d2e1292c32dd7a0.png"
        />
        <div class="stage">
          <div class="wrapper">
            <div class="slash"></div>
            <div class="sides">
              <div class="side"></div>
              <div class="side"></div>
              <div class="side"></div>
              <div class="side"></div>
            </div>
            <div class="text">
              <div class="text--backing">
                <span style={{ color: "00796b" }}>SVC</span>
              </div>
              <div class="text--left">
                <div class="inner">
                  <span style={{ color: "00796b" }}>SVC</span>
                </div>
              </div>
              <div class="text--right">
                <div class="inner">
                  <span style={{ color: "00796b" }}>SVC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="action-btn">
        <When condition={getRole[0]?.role !== 'admin'}>
        <h2
          style={getPathName === "/" ? { fontSize: "20px" } : {}}
          class="links"
          onClick={() => history.push("/")}
        >
          Home Page
        </h2>
        </When>
        
        <When condition={getRole[0]?.role !== 'admin'}>
        <h2
          style={getPathName === "/about" ? { fontSize: "20px" } : {}}
          class="links"
          onClick={() => history.push("/about")}
        >
          About
        </h2>
        </When>

        <When condition={getRole[0]?.role === 'admin'}>
        <h2
          style={getPathName === "/manage-accout" ? { fontSize: "20px" } : {}}
          class="links"
          onClick={() => history.push("/manage-accout")}
        >
          Manage account
        </h2>
        </When>

        <h2
          style={getPathName === "/blog" ? { fontSize: "20px" } : {}}
          class="links"
          onClick={() => history.push("/blog")}
        >
          {getRole[0]?.role !== 'admin' ? "Blog SVC" : "Manage Blog"} 
        </h2>

        <h2
          style={getPathName === "/files" ? { fontSize: "20px" } : {}}
          class="links"
          onClick={() => history.push("/files")}
        >
           {getRole[0]?.role !== 'admin' ? "Files" : "Manage files"} 
        </h2>

        <div
          class="avatar"
          style={{ background: color, cursor: "pointer" }}
          onClick={onClickContextMenu}
        >
          <div class="avatar__letters">
            {getUserName && getUserName?.slice(0, 2).toUpperCase()}
          </div>
          <div class="online-indicator">
            <span class="blink"></span>
          </div>
        </div>

        <When condition={showContextMenu}>
          <div className="menu-context-home background_calling_color">
            <h2 style={{ color: "#00796b", fontSize: "18px" }}>
              {getUserName} !
            </h2>
            <ul>
              <li>
                <a onClick={changePassworkPage}>Change password</a>
              </li>
              <li>
                <a onClick={logOut}>Logout</a>
              </li>
            </ul>
          </div>
        </When>
      </div>

      <div class="wrappers" onClick={callPhoneNumber}>
        <div class="ring">
          <div class="coccoc-alo-phone coccoc-alo-green coccoc-alo-show">
            <div class="coccoc-alo-ph-circle"></div>
            <div class="coccoc-alo-ph-circle-fill"></div>
            <div class="coccoc-alo-ph-img-circle"></div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute" }}>
        <ToastContainer />
      </div>
    </div>
  );
};
export default Header;
