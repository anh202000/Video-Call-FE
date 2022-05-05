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
      registerNewUser(inforUser[0]?.username);
      saveUsername(inforUser[0]?.username);
      toast.success('Login success', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(
        () => {
          history.push('/')
        },
        5000,
      );
      const userDetails = {
        mail,
        password,
      };
      login(userDetails, history);

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
