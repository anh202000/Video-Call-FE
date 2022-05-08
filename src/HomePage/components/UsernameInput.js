// import React, { useEffect, useState } from "react";
// import Tooltip from "@atlaskit/tooltip";
// import { When } from "react-if";
// import WarningIcon from "@atlaskit/icon/glyph/warning";
// import { Y200 } from "@atlaskit/theme/colors";
// import { token } from "@atlaskit/tokens";
// import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
// import { G400 } from "@atlaskit/theme/colors";
// import Flag from "@atlaskit/flag";

// const UsernameInput = (props) => {
//   const { username, setUsername } = props;
//   const [hide, setHide] = useState();

//   const initialName =
//     /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/g;

//   //   ^               // start of line
//   // [a-zA-Z]{2,}    // will except a name with at least two characters
//   // \s              // will look for white space between name and surname
//   // [a-zA-Z]{1,}    // needs at least 1 Character
//   // \'?-?           // possibility of **'** or **-** for double barreled and hyphenated surnames
//   // [a-zA-Z]{2,}    // will except a name with at least two characters
//   // \s?             // possibility of another whitespace
//   // ([a-zA-Z]{1,})? // possibility of a second surname

//   const CheckFlagValidate =
//     username.length > 0 ? initialName.test(username) : "";

//   useEffect(() => {
//     setHide("");
//   }, [username]);

//   return (
//     <>
//       <div className="login-page_input_container">
//         <input
//           placeholder="Enter your name"
//           type="text"
//           value={username}
//           onChange={(event) => {
//             setUsername(event.target.value);
//           }}
//           className="login-page_input background_main_color text_main_color"
//         />
//       </div>

//       <div className="login-page_button_container">
//         <Tooltip content="Join now">
//           <button
//             className="login-page_button background_main_color text_main_color"
//             onClick={props?.handleSubmitButtonPressed}
//           >
//             Join now
//           </button>
//         </Tooltip>
//       </div>
//       <When condition={CheckFlagValidate === false}>
//         <div
//           style={
//             hide !== 1
//               ? { position: "absolute", bottom: "2rem" }
//               : { display: "none" }
//           }
//         >
//           <Flag
//             appearance="error"
//             icon={
//               <WarningIcon
//                 label="Warning"
//                 secondaryColor={token("color.iconBorder.warning", Y200)}
//               />
//             }
//             id="warning"
//             key="warning"
//             title="Name input name with two letters or more !"
//             actions={[
//               {
//                 content: "Hide text",
//                 onClick: () => {
//                   setHide(1);
//                 },
//               },
//             ]}
//             description=""
//           />
//         </div>
//       </When>
//       <When condition={CheckFlagValidate === true}>
//         <div style={{ position: "absolute", bottom: "2rem" }}>
//           <Flag
//             appearance="success"
//             icon={
//               <SuccessIcon
//                 label="Success"
//                 secondaryColor={token("color.iconBorder.success", G400)}
//               />
//             }
//             id="success"
//             key="success"
//             title="Welcome to the room, you can join right now"
//             description=""
//             actions={[{ content: "Join the conversation", onClick: props?.handleSubmitButtonPressed }]}
//           />
//         </div>
//       </When>
//     </>
//   );
// };

// export default UsernameInput;
