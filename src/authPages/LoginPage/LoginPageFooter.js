import React from "react";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@mui/material";
import CustomPrimaryButton from "../../utils/sharedCustom/CustomPrimaryButton";
import RedirectInfo from "../../utils/sharedCustom/RedirectInfo";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail address and password should contains between 6 and 12 characters";
};

const getFormValidMessage = () => {
  return "Press to log in!";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const history = useHistory();

  const handlePushToRegisterPage = () => {
    history.push("/register");
  };

  const handlePushToForgotPage = () => {
    history.push("/forgot-password");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Log in"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegisterPage}
      />
      <RedirectInfo
        text="or "
        redirectText="Forgot Password"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToForgotPage}
      />
    </>
  );
};

export default LoginPageFooter;
