import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiFieldText,
  EuiFormRow,
  EuiPopover,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiLink,
} from "@elastic/eui";

function EmailLogin() {

    const [isFPPopoverOpen, setIsFPPopoverOpen] = useState(false);
    const openFPPopover = () => {setIsFPPopoverOpen(true);};
    const closeFPPopover = () => {setIsFPPopoverOpen(false);};

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      // Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, emailOrUsername, password);
      const user = userCredential.user;

    //   dispatch(setUser({ uid: user.uid , email: user.email!, name: user.displayName! }));
      navigate("/");
    } catch (error) {
        const errorMessage = (error as Error).message;
        window.alert(errorMessage);
    }

  };

  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: "280px" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>

                <EuiText textAlign="center" grow={false}>
                  <h2>
                    <EuiTextColor>Login via </EuiTextColor>
                    <EuiTextColor color="#0b5cff">E-mail</EuiTextColor>
                  </h2> <br />
                </EuiText>
                
                <EuiFormRow
                  label="Enter Username or Email"
                  helpText="Your_Name@gmail.com">
                  <EuiFieldText value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} />
                </EuiFormRow>
                <br />
                
                <EuiFormRow
                  label="Enter Password"
                  helpText="Enter Strong Password">
                  <EuiFieldText type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </EuiFormRow>
                <br />
                
                <EuiFlexGroup justifyContent="center" alignItems="center">
                  <EuiFlexItem>
                    <EuiButton fill onClick={handleSubmit}>
                      Login
                    </EuiButton>
                  </EuiFlexItem>
                  
                
                </EuiFlexGroup>
                <br/>
                <h6>
                 
                        <EuiPopover
                            id = "forgetPassword"
                            button={<EuiLink onClick={openFPPopover}>Forget Password</EuiLink>}
                            isOpen={isFPPopoverOpen}
                            closePopover={closeFPPopover}
                        >
                            <ForgetPassword/>
                        </EuiPopover>
                    
                </h6>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}

export default EmailLogin;
