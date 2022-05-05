import React from "react";
import InputWithLabel from "../../utils/sharedCustom/InputWithLabel";

const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const vailEmail =  emailPattern.test(mail);
  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-mail"
        type="text"
        placeholder="Enter e-mail address"
      />
      {
        mail.length > 2 && vailEmail !== true ? <text style={{fonsize: '12', color: 'red', margin: '6px, 0px, 10px, 0px'}}>Gmail must be format ex: abc@gmail.com</text> : ''
      }
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      />
      {
        password.length > 2 ? password.length > 5 && password.length < 12 ? '' : <text style={{fonsize: '12', color: 'red', margin: '6px, 0px, 10px, 0px'}}>Password must contain between 6 and 13 characters</text> : ''
      }
    </>
  );
};

export default LoginPageInputs;
