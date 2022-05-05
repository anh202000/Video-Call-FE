import React from "react";
import InputWithLabel from "../../utils/sharedCustom/InputWithLabel";

const ForgotPassworkPageInputs = (props) => {
  const {
    mail,
    setMail,
    oldPassword,
    setOldPassword,
    newPassword,
    setnewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    userList
  } = props;

  const checkMail = userList && userList?.filter((item) => item.mail === mail) || []
  const checkPassword = userList && userList?.filter((item) => item.password === oldPassword) || []

  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-mail address"
        type="text"
        placeholder="Enter e-mail address"
      />
      {
        mail.length > 2 && checkMail?.length === 0 ? <text style={{ fonsize: '12', color: 'red', margin: '6px, 0px, 10px, 0px' }}>Gmail doesn't exist!</text> : ''
      }

      <InputWithLabel
        value={oldPassword}
        setValue={setOldPassword}
        label="Old Password"
        type="password"
        placeholder="Enter a username"
      />
      {
        oldPassword.length > 2 && checkPassword?.length === 0 ? <text style={{ fonsize: '12', color: 'red', margin: '6px, 0px, 10px, 0px' }}>Old Password not correct!</text> : ''
      }

      <InputWithLabel
        value={newPassword}
        setValue={setnewPassword}
        label="New Password"
        type="password"
        placeholder="Enter password"
      />
      {
        newPassword.length > 2 ? newPassword.length > 5 && newPassword.length < 12 ? '' : <text style={{fonsize: '12', color: 'red', margin: '6px, 0px, 10px, 0px'}}>New Password must contain between 6 and 13 characters</text> : ''
      }

      <InputWithLabel
        value={confirmNewPassword}
        setValue={setConfirmNewPassword}
        label="Confrim newPassword"
        type="password"
        placeholder="Enter password"
      />
      {
        confirmNewPassword?.length > 2 ? confirmNewPassword !== newPassword ? <text style={{fonsize: '12', color: 'red', margin: '6px, 0px, 10px, 0px'}}>Confrim password must same new pasword</text> : '' : ''
      }

    </>
  );
};

export default ForgotPassworkPageInputs;
