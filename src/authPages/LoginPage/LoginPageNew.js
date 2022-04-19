import React, { useState, useEffect } from "react";
import LoginPageFooter from "./LoginPageFooter";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInputs";
// import { validateLoginForm } from "../../shared/utils/validators";
import { connect } from "react-redux";
// import { getActions } from "../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import { validateLoginForm } from "../../utils/auth/validators";
import AuthBox from "../../utils/sharedCustom/AuthBox";

const LoginPageNew = ({ login }) => {
  const history = useHistory();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = () => {
    const userDetails = {
      mail,
      password,
    };

    login(userDetails, history);
  };

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    // ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(LoginPageNew);
