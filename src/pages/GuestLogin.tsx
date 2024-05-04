import React, { useState } from "react";
import { signInAnonymously, updateProfile } from "firebase/auth";
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
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";

function GuestLogin() {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Sign in anonymously
      const userCredential = await signInAnonymously(firebaseAuth);
      const user = userCredential.user;
      
      // Update the user's display name
      await updateProfile(user, { displayName: username });

      // Dispatch user information to the store
    //   dispatch(setUser({ uid: user.uid, email: `${username}@example.com`, name: username }));

      // Redirect or navigate to the desired page after successful login
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
                    <EuiTextColor>Log In</EuiTextColor>
                  </h2>
                  <br />
                </EuiText>
                <EuiFormRow
                  label="Enter User Name"
                  helpText="Your_Name"
                >
                  <EuiFieldText value={username} onChange={(e) => setUsername(e.target.value)} />
                </EuiFormRow>
                <br />
                <EuiFlexGroup justifyContent="center" alignItems="center">
                  <EuiFlexItem>
                    <EuiButton fill onClick={handleSubmit}>
                      Login
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

export default GuestLogin;
