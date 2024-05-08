import React, { useState } from "react";
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiBottomBar,
  EuiImage,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import logo from "../assets/logo.png";
import animation from "../assets/animation.gif";
import Register from "./Register";
import EmailLogin from "./EmailLogin";
import GuestLogin from "./GuestLogin";
import LoginHeader from "./LoginHeader";
import Footer from "./Footer";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isRegisterPopoverOpen, setIsRegisterPopoverOpen] = useState(false);
  const [isLoginPopoverOpen, setIsLoginPopoverOpen] = useState(false);
  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);

  const openRegisterPopover = () => {
    setIsRegisterPopoverOpen(true);
  };
  const closeRegisterPopover = () => {
    setIsRegisterPopoverOpen(false);
  };
  const openLoginPopover = () => {
    setIsLoginPopoverOpen(true);
  };
  const closeLoginPopover = () => {
    setIsLoginPopoverOpen(false);
  };
  const openGuestPopover = () => {
    setIsGuestPopoverOpen(true);
  };
  const closeGuestPopover = () => {
    setIsGuestPopoverOpen(false);
  };

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      const firestoreQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDB, "users"), {
          uid,
          name: displayName,
          email,
        });
      }
      dispatch(setUser({ uid, email: email!, name: displayName! }));
      navigate("/");
    }
  };

  return (
    <>
      <LoginHeader />

      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                <EuiImage src={animation} alt="logo" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage src={logo} alt="logo" size="230px" />
                <EuiSpacer size="xs" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>One Platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton fill onClick={login}>
                  Login with Google
                </EuiButton>
                <br />
                <EuiFlexGroup justifyContent="center" alignItems="center">
                  <EuiFlexItem>
                    <EuiButton>
                      <EuiPopover
                        id="registerPopover"
                        button={
                          <EuiButton onClick={openRegisterPopover}>
                            Register via E-mail
                          </EuiButton>
                        }
                        isOpen={isRegisterPopoverOpen}
                        closePopover={closeRegisterPopover}
                      >
                        <Register />
                      </EuiPopover>
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiButton>
                      <EuiPopover
                        id="loginPopover"
                        button={
                          <EuiButton onClick={openLoginPopover}>
                            Login with E-mail
                          </EuiButton>
                        }
                        isOpen={isLoginPopoverOpen}
                        closePopover={closeLoginPopover}
                      >
                        <EmailLogin />
                      </EuiPopover>
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
                <br />
                <EuiButton>
                  <EuiPopover
                    id="guestPopover"
                    button={
                      <EuiButton onClick={openGuestPopover}>
                        Guest Login
                      </EuiButton>
                    }
                    isOpen={isGuestPopoverOpen}
                    closePopover={closeGuestPopover}
                  >
                    <GuestLogin />
                  </EuiPopover>
                </EuiButton>

              </EuiFlexItem>
            </EuiFlexGroup>

          </EuiPanel>     
        </EuiFlexItem>
        
      </EuiFlexGroup>

      <EuiFlexGroup>
        <EuiFlexItem>
        <Footer/></EuiFlexItem></EuiFlexGroup>


     
        
      

    </>
  );
}

export default Login;
