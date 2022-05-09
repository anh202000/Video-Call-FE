import { useEffect, useState } from "react";
import Header from "../utils/sharedCustom/HeaderBar/header";
import "./MnAcc.css";
import { MdOutlineManageSearch, MdAdd } from "react-icons/md";
import { IoIosCreate } from 'react-icons/io'
import axios from "axios";
import { When } from "react-if";
import { service } from "../utils/service/api";
import { toast } from "react-toastify";
import randomColor from "randomcolor";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FiDelete } from "react-icons/fi";
import moment from 'moment'
import qs from 'qs'

const MnAcc = () => {
  const getUserName = document.cookie?.replace(
    "token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NDAiLCJleHAiOjE3Mjk0ODA2NTksImlhdCI6MTY0MzA4MDY1OX0.-yAjNmRzMKA6Sg5mj1qAu_TNKpWtlGgQBi05oPHiOcYek4oPxEdyVt3ASVl0aGY4Q6a0MD1-e7DCt8oCvtvXww",
    ""
  );

  const [contentS, setContentS] = useState("");

  const [gmail, setGmail] = useState("");
  const [userNm, setUserNm] = useState("");
  const [pw, setPw] = useState("");

  const [feed, setFeed] = useState([]);
  const [getRole, setGetRole] = useState([])
  const [openPost, setOpenPost] = useState(false);
  const getCookie = document.cookie;
  const history = useHistory();
  const getMoment = moment().format("YYYY-MM-DD HH:mm:ss");

  const showAddPost = () => {
    setOpenPost(!openPost);
  };

  const onChangeContentS = (event) => {
    setContentS(event.target.value);
  };

  const getNewFeed = () => {
    axios
      .get("https://62737bd46b04786a0906fef7.mockapi.io/api/login/users", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFeed(response?.data);
        }
      });
  };

  useEffect(() => {
    getNewFeed();
  }, []);

  const searchList =
    feed &&
    feed?.length > 0 &&
    feed?.filter((item) =>
      item.username.toLowerCase().includes(contentS.toLowerCase())
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

  const deletePost = (id) => {
    axios
      .delete(`https://62737bd46b04786a0906fef7.mockapi.io/api/login/users/${id}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          getNewFeed();
          toast.success("Remove success", {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  }

  const createAcc = () => {
    axios
      .post(`https://62737bd46b04786a0906fef7.mockapi.io/api/login/users`,
        qs.stringify({
          mail: gmail,
          username: userNm,
          password: pw,
          role: "",
        }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setGmail('')
          setUserNm('')
          setPw('')
          getNewFeed();
          toast.success("Remove success", {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  }

  return (
    <div className="home-page">
      <Header />
      <div className="body">
        <div className="action-btn">
          <div className="input-block">
            <div className="input-section">
              <input
                className="input-search"
                style={{ color: "#00796b", fontSize: "18px" }}
                placeholder="Find user name"
                onChange={onChangeContentS}
              />
            </div>
            <button className="btn green">
              Search
              <MdOutlineManageSearch
                style={{
                  width: "28px",
                  height: "28px",
                  marginLeft: "4px",
                  verticalAlign: "middle",
                  fill: "#e6e5e8",
                }}
              />
            </button>

            <button
              style={{ borderRadius: "50%" }}
              className="btn green"
              onClick={showAddPost}
            >
              <MdAdd
                style={{
                  width: "28px",
                  height: "28px",
                  verticalAlign: "middle",
                  fill: "#e6e5e8",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Post */}
      <When condition={openPost}>
        <div className="body-post">
          <div class="content-post">
            <div
              class="avatars"
              style={{
                background: "#00796b",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              <div class="avatar__letterss">{getUserName?.slice(0, 2)}</div>
            </div>
            <span
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0px 4px 0px 4px",
              }}
            >
              {getUserName}
            </span>

            <IoIosCreate
              onClick={createAcc}
              style={{
                width: "28px",
                height: "28px",
                verticalAlign: "middle",
                fill: "#00796b",
                float: 'right'
              }}
            />

            <p
              style={{
                color: "#000000",
                fontSize: "12px",
                margin: "-16px 0px 30px 52px",
              }}
            >
              VN {getMoment}
            </p>

            <p
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "10px 4px 6px 4px",
              }}
            >
              Gmail
            </p>

            <input
              class="write-post"
              placeholder="Enter new password here!!!"
              onChange={(event) => setGmail(event.target.value)}
            />

            <p
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "10px 4px 6px 4px",
              }}
            >
              User name
            </p>

            <input
              class="write-post"
              placeholder="Enter new user name here!!!"
              onChange={(event) => setUserNm(event.target.value)}
            />

            <p
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "10px 4px 6px 4px",
              }}
            >
              Password
            </p>

            <input
              class="write-post"
              placeholder="Enter new password here!!!"
              onChange={(event) => setPw(event.target.value)}
            />
          </div>
        </div>
      </When>

      {searchList &&
        searchList?.length > 0 &&
        searchList
          ?.map((item) => {
            const color = randomColor()
            return (
              <div className="body-post">
                <div class="content-post">
                  <div
                    class="avatars"
                    style={{
                      background: color,
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    <div class="avatar__letterss">
                      {item?.username?.slice(0, 2)}
                    </div>
                  </div>

                  <When condition={getRole[0]?.role === 'admin'}>
                    <FiDelete
                      onClick={() => deletePost(item?.id)}
                      style={{
                        width: "28px",
                        height: "28px",
                        verticalAlign: "middle",
                        fill: "#00796b",
                        float: 'right'
                      }}
                    />
                  </When>

                  <span
                    style={{
                      color: "#00796b",
                      fontSize: "18px",
                      fontWeight: "bold",
                      margin: "0px 4px 0px 4px",
                    }}
                  >
                    {item?.username}
                  </span>

                  <div style={{ marginTop: '30px' }}>
                    <p
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        margin: "-16px 0px 30px 52px",
                      }}
                    >
                      Name: {item?.username}
                    </p>

                    <p
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        margin: "-16px 0px 30px 52px",
                      }}
                    >
                      Gmail: {item?.mail}
                    </p>

                    <p
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        margin: "-16px 0px 30px 52px",
                      }}
                    >
                      Password: {item?.password}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default MnAcc;
