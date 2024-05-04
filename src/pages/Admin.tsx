import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiText,
  EuiSpacer,
} from "@elastic/eui";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firebaseDB } from "../utils/firebaseConfig";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Query admins collection for the provided email
      const adminsRef = collection(firebaseDB, "admins");
      const q = query(adminsRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      // Check if admin with provided email exists
      if (!querySnapshot.empty) {
        // Get the first document (assuming unique email)
        const adminDoc = querySnapshot.docs[0];
        const adminData = adminDoc.data();

        // Check if password matches
        if (adminData.password === password) {
          // If credentials are correct, redirect to admin dashboard
          navigate("/admin-dashboard");
        } else {
          setError("Incorrect password");
        }
      } else {
        setError("Admin not found");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div style={{ paddingTop: "80px", maxWidth: "400px", margin: "auto" }}>
      <EuiText>
        <h2>Admin Login</h2>
      </EuiText>
      <EuiSpacer size="l" />

      <EuiForm component="form" onSubmit={handleSubmit}>
        <EuiFormRow label="Email" fullWidth>
          <EuiFieldText
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow label="Password" fullWidth>
          <EuiFieldText
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </EuiFormRow>
        {error && (
          <EuiText color="danger">
            <p>{error}</p>
          </EuiText>
        )}
        <EuiButton type="submit" fill>
          Login
        </EuiButton>
      </EuiForm>
    </div>
  );
};

export default Admin;
