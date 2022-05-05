import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
// import AuthBox from "../../shared/components/AuthBox";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";
// import { validateRegisterForm } from "../../shared/utils/validators";
import { connect } from "react-redux";
// import { getActions } from "../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import AuthBox from "../../utils/sharedCustom/AuthBox";
import { validateRegisterForm } from "../../utils/auth/validators";
import axios from "axios";
import { service } from "../../utils/service/api";
import qs from "qs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = ({ register }) => {
  const history = useHistory();

  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const [isFormValid, setIsFormValid] = useState(false);
  const checkdulicateMail = userList && userList?.filter((item) => item.mail === mail) || []
  const checkdulicateUserName = userList && userList?.filter((item) => item?.username === username) || []

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

  const handleRegister = () => {
    if (checkdulicateMail?.length > 0) {
      toast.error('Gmail already exists, please enter another Gmail!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (checkdulicateUserName?.length > 0) {
      toast.error('UserName already exists, please enter another UserName!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      axios.post(
        service.loginapi,
        qs.stringify({
          mail,
          password,
          username,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
        .then((response) => {
          if (response.status === 201) {
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

      const userDetails = {
        mail,
        password,
        username,
      };
      register(userDetails, history);
    }
  };

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({
        mail,
        username,
        password,
      })
    );
  }, [mail, username, password, setIsFormValid]);

  return (
    <AuthBox>
      <ToastContainer />
      <Typography variant="h5" sx={{ color: "white " }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
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

export default connect(null, mapActionsToProps)(RegisterPage);
