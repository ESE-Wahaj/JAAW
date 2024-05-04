import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeProvider,
} from "@elastic/eui";
import { EuiThemeColorMode } from "@elastic/eui/src/services/theme";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Router, redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "./app/hooks";
import { setToasts } from "./app/slices/MeetingSlice";
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import Dashboard from "./pages/Dashboard";
import JoinMeeting from "./pages/JoinMeeting";
import Login from "./pages/Login";
import Meeting from "./pages/Meeting";
import MyMeetings from "./pages/MyMeetings";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import VideoConference from "./pages/VideoConference";
import Documentation from "./pages/Documentation";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import Admin from "./pages/Admin";
import DownloadApp from "./pages/DownloadApp";
import AdminDashboard from "./pages/AdminDashboard";
// import {PrRoutes as Routes, PrRoute as Route} from 'protected-react-router';
import { BrowserRouter } from 'react-router-dom';
import { firebaseAuth } from "./utils/firebaseConfig";
import useAuth from "./hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
export default function App() {
  const dispatch = useDispatch();
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [isInitialEffect, setIsInitialEffect] = useState(true);
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);



  // console.log(process.env.REACT_APP_ZEGOCLOUD_APP_ID)
  const navigate = useNavigate();
  const removeToast = (removedToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removedToast.id)
      )
    );
  };

  const protectionAuth = () => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  };
  const isAuthenticated = protectionAuth();

  const notAuthenticatedAction = () => {
    // Redirect logic based on the current route
    const currentPath = window.location.pathname;
    if (currentPath === '/login' || currentPath === '/admin') {
      // Do nothing if on login or admin page
      redirect("/login");
      return;
    }
  };

  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (isInitialEffect) setIsInitialEffect(false);
    else {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme]);



  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };





  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>


          <Routes

          // notAuthenticatedRoute="/login" // Pass an array of routes

          >
            <Route >
              <Route path="/create" element={<CreateMeeting />} />
              <Route path="/create1on1" element={<OneOnOneMeeting />} />
              <Route path="/videoconference" element={<VideoConference />} />
              <Route path="/mymeetings" element={<MyMeetings />} />
              <Route path="/join/:id" element={<JoinMeeting />} />
              <Route path="/meetings" element={<Meeting />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<Login />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/download-app" element={<DownloadApp />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />

          </Routes>



          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={4000}
          />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
}
