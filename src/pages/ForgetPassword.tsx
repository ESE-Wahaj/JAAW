import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiFieldText,
  EuiFormRow,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Send password reset email
      await sendPasswordResetEmail(firebaseAuth, email);
      window.alert("Password reset email sent!");
      // Redirect or navigate to the desired page after successful submission
      navigate("/");
    } catch (error) {
        const errorMessage = (error as Error).message;
        window.alert(errorMessage);
  };
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
                    <EuiTextColor>Forget Password</EuiTextColor>
                  </h2>
                  <br />
                </EuiText>
                <EuiFormRow
                  label="Enter Email"
                  helpText="Your_Email@gmail.com"
                >
                  <EuiFieldText
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </EuiFormRow>
                <br />
                <EuiFlexGroup justifyContent="center" alignItems="center">
                  <EuiFlexItem>
                    <EuiButton fill onClick={handleSubmit}>
                      Send Verification Email
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
                <br />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}


export default ForgetPassword;
