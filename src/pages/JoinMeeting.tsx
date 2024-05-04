import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { firebaseAuth, meetingsRef } from "../utils/firebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingId";
import { appIdInput, serverSecretInput, validTillDate, newValueCheck } from "./AdminDashboard";



const JoinMeeting = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState<any>(undefined);
  const [userLoaded, setUserLoaded] = useState(false);
  const meetingContainerRef = useRef<HTMLDivElement>(null);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
    setUserLoaded(true);
  });

  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(
          meetingsRef,
          where("meetingId", "==", params.id)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user?.uid;
          if (meeting.meetingType === "1-on-1") {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
                navigate(user ? "/" : "/login");
              }
            } else navigate(user ? "/" : "/login");
          } else if (meeting.meetingType === "video-conference") {
            const index = meeting.invitedUsers.findIndex(
              (invitedUser: string) => invitedUser === user?.uid
            );
            if (index !== -1 || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
              }
            } else {
              createToast({
                title: `You are not invited to the meeting.`,
                type: "danger",
              });
              navigate(user ? "/" : "/login");
            }
          } else {
            setIsAllowed(true);
          }
        }
      }
    };
    getMeetingData();
  }, [params.id, user, userLoaded, createToast, navigate]);
;

    const appId = process.env.REACT_APP_ZEGOCLOUD_APP_ID;
    const serverSecret = process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET;
  
  useEffect(() => {
    const joinMeeting = async () => {
      if (isAllowed && meetingContainerRef.current) {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          Number(appId),
          String(serverSecret), // Add null check and provide default value
          params.id as string,
          user?.uid ? user.uid : generateMeetingID(),
          user?.displayName ? user.displayName : generateMeetingID()
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp?.joinRoom({
          container: meetingContainerRef.current,
          maxUsers: 50,
          sharedLinks: [
            {
              name: "Personal link",
              url: window.location.origin,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
        });
      }
    };

    joinMeeting();
  }, [isAllowed, params.id, user]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isAllowed && (
        <div
          className="myCallContainer"
          ref={meetingContainerRef}
          style={{ width: "100%", height: "100%" }}
        ></div>
      )}
    </div>
  );
};

export default JoinMeeting;


// if (newValueCheck === "true") {
//   const appId = Number(appIdInput);
//   const serverSecret = String(serverSecretInput);
//   const validTill = String(validTillDate);
//   }  if (newValueCheck === "false"){
//     const appId = 1740873369;
//     const serverSecret = "4ec48dfc76136444118292304a99ee0b";
//     const validTill = "30-May-2024";
//   }
// const appId = Number(appIdInput);
// const serverSecret = String(serverSecretInput);
// const validTill = String(validTillDate);

// const appIdFromMeetings = appId;
// const serverSecretFromMeetings = serverSecret;
// const validTillDateFromMeetings = validTill;



// export { appIdFromMeetings, serverSecretFromMeetings, validTillDateFromMeetings };
