import { useParams } from "react-router-dom";
import ChatBar from "../components/ChatBar";
import VideoCallActions from "../components/VideoCallActions";
import VideoParticipant from "../components/VideoParticipant";

const CallPage = () => {
  const { id } = useParams();
  const isHost = window.location.hash === "#init";
  const url = `${window.location.origin}${window.location.pathname}`;

  return (
    <div className="app-container">
      <div className="app-main">
        <div className="video-call-wrapper">
          <VideoParticipant
            name="Andy Will"
            picture={
              "https://images.unsplash.com/photo-1566821582776-92b13ab46bb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
            }
          />
          <VideoParticipant
            name="Emmy Lou"
            picture={
              "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            }
          />
        </div>
        <VideoCallActions />
      </div>
      <ChatBar />
    </div>
  );
};

export default CallPage;
