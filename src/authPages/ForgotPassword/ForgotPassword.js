import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthBox from "../../utils/sharedCustom/AuthBox";
import { validateRegisterForm } from "../../utils/auth/validators";
import axios from "axios";
import { service } from "../../utils/service/api";
import qs from "qs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassworkPageInputs from "./ForgotPasswordPageInputs";
import ForgotPassworkPageFooter from "./ForgotPasswordPageFooter";

const ForgotPassworkPage = ({ register }) => {
  const history = useHistory();

  const [mail, setMail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleUpdatePassword = () => {
    const checkId = userList && userList?.filter((item) => item.mail === mail)
    axios.put(
      service.loginapi + '/' + checkId[0]?.id,
      qs.stringify({
        password: newPassword,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          toast.success('Register accout success', {
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
              history.push("/login")
            },
            5000,
          );
        }
      });
  };

  const checkMail = userList && userList?.filter((item) => item.mail === mail) || []
  const checkPassword = userList && userList?.filter((item) => item.pasword === oldPassword) || []

  useEffect(() => {
    if(checkMail !== 0 && checkPassword !== 0 && newPassword.length > 5 && newPassword.length < 12 && confirmNewPassword === newPassword) {
      setIsFormValid(true)
    } else setIsFormValid(false)
  }, [mail, oldPassword, newPassword, confirmNewPassword])

  return (
    <AuthBox>
      <ToastContainer />
      <Typography variant="h5" sx={{ color: "white " }}>
        Forgot Password
      </Typography>
      <ForgotPassworkPageInputs
        mail={mail}
        setMail={setMail}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setnewPassword={setnewPassword}
        confirmNewPassword={confirmNewPassword}
        setConfirmNewPassword={setConfirmNewPassword}
        userList={userList}
      />
      <ForgotPassworkPageFooter
        handleRegister={handleUpdatePassword}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    // ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(ForgotPassworkPage);
