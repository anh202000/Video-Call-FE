import React, { useState, useEffect } from "react";
import LoginPageFooter from "./LoginPageFooter";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInputs";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { validateLoginForm } from "../../utils/auth/validators";
import AuthBox from "../../utils/sharedCustom/AuthBox";
import axios from "axios";
import { service } from "../../utils/service/api";
import { ToastContainer, toast } from 'react-toastify';
import { setUsername } from "../../store/actions/dashboardActions";
import { registerNewUser } from "../../utils/wssConnection/wssConnection";
import { Typography } from "@mui/material";
import Cookies from 'js-cookie';

const LoginPageNew = ({ login, saveUsername }) => {
  const history = useHistory();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");

  const checkGmail = userList && userList?.filter((item) => item?.mail === mail) || []
  const checkPassword = userList && userList?.filter((item) => item?.password === password) || []
  console.log({ checkGmail, checkPassword }, '123')

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  useEffect(() => {
    axios.get(
      service.loginapi,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          setUserList(response.data)
          const checkAuth = response.data?.filter((item) =>
              item?.username === document.cookie?.replace("token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NDAiLCJleHAiOjE3Mjk0ODA2NTksImlhdCI6MTY0MzA4MDY1OX0.-yAjNmRzMKA6Sg5mj1qAu_TNKpWtlGgQBi05oPHiOcYek4oPxEdyVt3ASVl0aGY4Q6a0MD1-e7DCt8oCvtvXww", "")
            )
          if(checkAuth?.length > 0) {
            history.push('/')
          }
        }
      });

  }, [])

  const handleLogin = () => {
    if (checkGmail?.length === 0) {
      toast.error('Gmail doesn`t exist, please input another Gmail!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (checkPassword?.length === 0) {
      toast.error('Password not correct, please input another Password!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (checkGmail?.length > 0 && checkPassword?.length > 0) {
      const inforUser = userList && userList?.filter((item) => item?.password === password && item?.mail === mail) || []
      const authToken = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NDAiLCJleHAiOjE3Mjk0ODA2NTksImlhdCI6MTY0MzA4MDY1OX0.-yAjNmRzMKA6Sg5mj1qAu_TNKpWtlGgQBi05oPHiOcYek4oPxEdyVt3ASVl0aGY4Q6a0MD1-e7DCt8oCvtvXww` + `${inforUser[0]?.username}`
      // registerNewUser(inforUser[0]?.username);
      // saveUsername(inforUser[0]?.username);
      toast.success('Login success', {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(
        () => {
          Cookies.set('token', authToken);
          history.push('/')
        },
        1000,
      );
    }
  };

  return (
    <AuthBox>
      <ToastContainer />
      <Typography align="center" variant="h2" sx={{ color: "white", margin: '20px' }}>
        Smart Video Call
      </Typography>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
        message={message}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username => dispatch(setUsername(username))
  };
};

export default connect(null, mapActionsToProps)(LoginPageNew);
