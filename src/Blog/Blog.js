import { useEffect, useRef, useState } from "react";
import Header from "../utils/sharedCustom/HeaderBar/header";
import "./Blog.css";
import { MdAdd, MdOutlineManageSearch, MdImage } from "react-icons/md";
import moment from "moment";
import axios from "axios";
import { When } from "react-if";
import { service } from "../utils/service/api";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify";

const Blog = () => {
  const getUserName = document.cookie?.replace(
    "token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NDAiLCJleHAiOjE3Mjk0ODA2NTksImlhdCI6MTY0MzA4MDY1OX0.-yAjNmRzMKA6Sg5mj1qAu_TNKpWtlGgQBi05oPHiOcYek4oPxEdyVt3ASVl0aGY4Q6a0MD1-e7DCt8oCvtvXww",
    ""
  );
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const [contentS, setContentS] = useState("");
  const [feed, setFeed] = useState([]);
  const remoteVideoRef = useRef();
  const inputFile = useRef(null);
  const getMoment = moment().format("YYYY-MM-DD HH:mm:ss");
  const onClickImage = () => {
    inputFile.current.click();
  };

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onChangeContentS = (event) => {
    setContentS(event.target.value);
  };

  const getNewFeed = () => {
    axios
      .get(service.createPost, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFeed(response.data);
        }
      });
  };

  useEffect(() => {
    getNewFeed();
  }, []);

  const takeImage = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "cloudfilesAnhLPT");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/anhlptstore/image/upload/",
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          setFile(response.data.url);
        }
      });
  };

  const createPosts = () => {
    axios
      .post(
        service.createPost,
        qs.stringify({
          createdate: getMoment,
          username: getUserName,
          content: content,
          comment: "",
          url: file || "",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setContent("");
        setFile("");
        if (response.status === 201) {
          getNewFeed()
          toast.success("Register accout success", {
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
  };

  const a = feed && feed?.length > 0 && feed?.filter((item) => item.username.toLowerCase().includes(contentS.toLowerCase()))

  const searchFeeds = () => {
    setFeed(a)
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
                placeholder="Find name user"
                onChange={onChangeContentS}
              />
            </div>
            <button className="btn green" onClick={searchFeeds}>
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
              onClick={() => {}}
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
              fontSize: "16px",
            }}
          >
            {content || ""}
          </p>

          <When condition={file?.length > 0}>
            <img class="img-new-post" src={file} />
          </When>

          <textarea
            class="write-post"
            placeholder="Enter new post here!!!"
            onChange={onChangeContent}
          />
          <MdImage
            onClick={onClickImage}
            style={{
              width: "28px",
              height: "28px",
              marginLeft: "4px",
              margin: "2px 0px 0px 10px",
              fill: "#00796b",
            }}
          />
          <input
            type="file"
            id="file"
            accept="image/png, image/gif, image/jpeg, video/mp4,video/x-m4v,video/*"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={takeImage}
          />

          <span
            style={{
              position: "absolute",
              color: "#00796b",
              fontSize: "18px",
              fontWeight: "bold",
              margin: "10px 0px 0px 10px",
              verticalAlign: "middle",
              cursor: "pointer",
            }}
            onClick={content?.length > 0 ? createPosts : () => {}}
          >
            Post
          </span>
        </div>
      </div>

      {feed &&
        feed?.length > 0 &&
        feed?.map((item) => {
          return (
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
                  <div class="avatar__letterss">
                    {item?.username?.slice(0, 2)}
                  </div>
                </div>
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

                <p
                  style={{
                    color: "#000000",
                    fontSize: "12px",
                    margin: "-16px 0px 30px 52px",
                  }}
                >
                  {item?.createdate}
                </p>

                <p
                  style={{
                    fontSize: "16px",
                  }}
                >
                  {item?.content}
                </p>

                <When condition={item?.url}>
                  <img class="img-post" src={item?.url} />
                </When>
              </div>
            </div>
          );
        })?.reverse()}
    </div>
  );
};

export default Blog;
