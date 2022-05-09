import { useEffect, useRef, useState } from "react";
import Header from "../utils/sharedCustom/HeaderBar/header";
import "./Files.css";
import { MdAdd, MdOutlineManageSearch, MdImage } from "react-icons/md";
import { BsFillImageFill, BsDownload } from 'react-icons/bs'
import moment from "moment";
import axios from "axios";
import { When } from "react-if";
import { service } from "../utils/service/api";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify";
import randomColor from "randomcolor";
import { saveAs } from 'file-saver';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FiDelete } from "react-icons/fi";

const Files = () => {
  const getUserName = document.cookie?.replace(
    "token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NDAiLCJleHAiOjE3Mjk0ODA2NTksImlhdCI6MTY0MzA4MDY1OX0.-yAjNmRzMKA6Sg5mj1qAu_TNKpWtlGgQBi05oPHiOcYek4oPxEdyVt3ASVl0aGY4Q6a0MD1-e7DCt8oCvtvXww",
    ""
  );

  const [contentS, setContentS] = useState("");
  const [feed, setFeed] = useState([]);
  const [getRole, setGetRole] = useState([])
  const getCookie = document.cookie;

  const history = useHistory();

  const onChangeContentS = (event) => {
    setContentS(event.target.value);
  };

  const getNewFeed = () => {
    axios
      .get("https://6162d627c48338001730074e.mockapi.io/assign/mount", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const getYourFiles = response.data?.filter((item) => item?.name === getUserName)
          if (getRole[0]?.role === 'admin') {
            setFeed(response?.data);
          } else {
            setFeed(getYourFiles);
          }
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
      item.filename.toLowerCase().includes(contentS.toLowerCase())
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
      .delete(`https://6162d627c48338001730074e.mockapi.io/assign/mount/${id}`, {
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
                placeholder="Find filename"
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
          </div>
        </div>
      </div>

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
                      background: item?.name === getUserName ? "#00796b" : color,
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    <div class="avatar__letterss">
                      {item?.name?.slice(0, 2)}
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
                    {item?.name}
                  </span>

                  <p
                    style={{
                      color: "#000000",
                      fontSize: "12px",
                      margin: "-16px 0px 30px 52px",
                    }}
                  >
                    send file: {item?.time}
                  </p>

                  <BsFillImageFill
                    style={{
                      width: "28px",
                      height: "28px",
                      verticalAlign: "middle",
                      fill: "#00796b",
                    }} />
                  <span
                    style={{
                      color: "#000000",
                      fontSize: "18px",
                      margin: "0px 10px 0px 10px",
                    }}
                  >
                    {item?.filename}
                  </span>

                  <span
                    style={{
                      color: "#000000",
                      fontSize: "14px",
                      margin: "0px 10px 0px 10px",
                      float: 'right'
                    }}
                  >
                    {item?.size / 1000} kb
                  </span>

                  <When condition={item?.url}>
                    <img class="img-post" src={item?.url} />
                  </When>
                </div>
              </div>
            );
          })
          ?.reverse()}
    </div>
  );
};

export default Files;
