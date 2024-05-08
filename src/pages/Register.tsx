import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig"; // Import firebaseDB and usersRef
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
} from "@elastic/eui";
import { addDoc } from "firebase/firestore";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;

      // Store additional user information in Firebase
      await addDoc(usersRef, {
        username: username,
        email: email,
      });

      console.log(user);
      window.alert('Successfully registered!');
      // Redirect or navigate to the login page after successful registration
      window.location.href = "/Login";
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
                    <EuiTextColor>Register </EuiTextColor>
                    <EuiTextColor color="#0b5cff"> with us</EuiTextColor>
                  </h2> <br />
                  
                </EuiText>
                <EuiFormRow
                    label="Enter User Name"
                     helpText="Your_Name"
                     >
                        <EuiFieldText value={username} onChange={(e) => setUsername(e.target.value)} />
                </EuiFormRow>
                <br />
                        
                <EuiSpacer size="l" />
                <EuiFormRow
                    label="Enter Email"
                    helpText="Your_Name@gmail.com">
                    <EuiFieldText value={email} onChange={(e) => setEmail(e.target.value)} />
                </EuiFormRow>
                <br />
                <EuiFormRow
                    label="Enter Password"
                    helpText="Password">
                    <EuiFieldText type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </EuiFormRow>
                <br />
                <EuiFlexGroup justifyContent="center" alignItems="center">
                 
                  <EuiFlexItem>
                    <EuiButton fill onClick={handleSubmit}>
                      Register
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

export default Register;
