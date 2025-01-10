/** @format */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import {
   sweetErrorHandling,
   sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { Messages } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import { T } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
   modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
   },
   paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 2),
   },
}));

const ModalImg = styled.img`
   width: 62%;
   height: 100%;
   border-radius: 10px;
   background: #000;
   margin-top: 9px;
   margin-left: 10px;
`;

interface AuthenticationModalProps {
   signupOpen: boolean;
   loginOpen: boolean;
   handleSignupClose: () => void;
   handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
   // Props
   const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
   const classes = useStyles();
   /** Input Coming **/
   const [memberNick, setMemberNick] = useState<string>("");
   const [memberPhone, setMemberPhone] = useState<string>("");
   const [memberPassword, setmemberPassword] = useState<string>("");
   const { setAuthMember } = useGlobals();

   /** HANDLERS **/

   const handleUsername = (e: T) => {
      setMemberNick(e.target.value);
      console.log(e.target.value);
   };

   const handlePhone = (e: T) => {
      setMemberPhone(e.target.value);
      console.log(e.target.value);
   };

   const handlePassword = (e: T) => {
      setmemberPassword(e.target.value);
      console.log(e.target.value);
   };

   const handlePasswordKeyDown = (e: T) => {
      if (e.key === "Enter" && signupOpen) {
         handleSignupRequest().then();
      } else if (e.key === "Enter" && loginOpen) {
         handleLoginRequest().then();
      }
   };

   // SignUp request handler

   const handleSignupRequest = async () => {
      try {
         const isFulfill =
            memberNick !== "" && memberPhone !== "" && memberPassword !== "";

         if (!isFulfill) throw new Error(Messages.error3);

         const signupInput: MemberInput = {
            memberNick: memberNick,
            memberPhone: memberPassword,
            memberPassword: memberPassword,
         };

         const member = new MemberService();

         const result = await member.signup(signupInput);

         // Saving authenticated user cookies
         setAuthMember(result);
         handleSignupClose();
         await sweetTopSuccessAlert("Successfully Signed Up", 1000);
      } catch (err) {
         console.log(err);
         handleSignupClose();
         sweetErrorHandling(err).then();
      }
   };

   // Login request handler

   const handleLoginRequest = async () => {
      try {
         const isFulfill = memberNick !== "" && memberPassword !== "";
         if (!isFulfill) throw new Error(Messages.error3);

         const loginInput: LoginInput = {
            memberNick: memberNick,
            memberPassword: memberPassword,
         };

         const member = new MemberService();

         const result = await member.login(loginInput);
         // Saving authenticated user cookies

         setAuthMember(result);
         handleLoginClose();
         await sweetTopSuccessAlert("Successfully Logged In", 1000);
      } catch (err) {
         handleLoginClose();
         sweetErrorHandling(err).then();
      }
   };

   // handlers
   return (
      <div>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={signupOpen}
            onClose={handleSignupClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}>
            <Fade in={signupOpen}>
               <Stack
                  className={classes.paper}
                  direction={"row"}
                  sx={{ width: "800px" }}>
                  <ModalImg
                     src={"/img/veggies.jpg"}
                     alt="camera"
                  />
                  <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
                     <h2>Signup Form</h2>
                     <TextField
                        sx={{ marginTop: "7px" }}
                        id="outlined-basic"
                        label="username"
                        variant="outlined"
                        onChange={handleUsername}
                     />
                     <TextField
                        sx={{ my: "17px" }}
                        id="outlined-basic"
                        label="phone number"
                        variant="outlined"
                        onChange={handlePhone}
                     />
                     <TextField
                        id="outlined-basic"
                        label="password"
                        variant="outlined"
                        onChange={handlePassword}
                        onKeyDown={handlePasswordKeyDown}
                     />
                     <Fab
                        sx={{ marginTop: "30px", width: "120px" }}
                        variant="extended"
                        color="warning"
                        onClick={handleSignupRequest}
                        onKeyDown={handlePasswordKeyDown}>
                        <LoginIcon sx={{ mr: 1 }} />
                        Signup
                     </Fab>
                  </Stack>
               </Stack>
            </Fade>
         </Modal>

         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={loginOpen}
            onClose={handleLoginClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}>
            <Fade in={loginOpen}>
               <Stack
                  className={classes.paper}
                  direction={"row"}
                  sx={{ width: "700px" }}>
                  <ModalImg
                     src={"/img/ramen.jpg"}
                     alt="camera"
                  />
                  <Stack
                     sx={{
                        marginLeft: "65px",
                        marginTop: "25px",
                        alignItems: "center",
                     }}>
                     <h2>Login Form</h2>
                     <TextField
                        id="outlined-basic"
                        label="username"
                        variant="outlined"
                        onChange={handleUsername}
                        sx={{ my: "10px" }}
                     />
                     <TextField
                        id={"outlined-basic"}
                        label={"password"}
                        variant={"outlined"}
                        type={"password"}
                        onChange={handlePassword}
                        onKeyDown={handlePasswordKeyDown}
                     />
                     <Fab
                        sx={{ marginTop: "27px", width: "120px" }}
                        variant={"extended"}
                        color={"warning"}
                        onClick={handleLoginRequest}>
                        <LoginIcon sx={{ mr: 1 }} />
                        Login
                     </Fab>
                  </Stack>
               </Stack>
            </Fade>
         </Modal>
      </div>
   );
}
