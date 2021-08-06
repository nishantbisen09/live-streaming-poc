import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import io from "socket.io-client";
import ChatBar from "../components/ChatBar";
import VideoCallActions from "../components/VideoCallActions";
import VideoParticipant from "../components/VideoParticipant";
import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from "../utils/apiEndpoints";
import { getRequest, postRequest } from "../utils/apiRequests";

let peer = null;
let socket = io.connect(`${window.location.hostname}:4000`);
// const initialState = [];

const CallPage = () => {
  const { id } = useParams();
  const isHost = window.location.hash === "#init";
  const url = `${window.location.origin}${window.location.pathname}`;

  // const [streamObj, setStreamObj] = useState();
  // const [screenCastStream, setScreenCastStream] = useState();
  // const [isPresenting, setIsPresenting] = useState(false);
  // const [isMessenger, setIsMessenger] = useState(false);
  // const [messageAlert, setMessageAlert] = useState({});
  // const [isAudio, setIsAudio] = useState(true);

  // const [messageList, messageListReducer] = useReducer(
  //   MessageReducer,
  //   initialState
  // );

  useEffect(() => {
    initWebRTC();
    socket.on("code", data => {
      if (data.url === url) {
        peer.signal(data.code);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReceiverCode = async () => {
    const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    if (response.code) {
      peer.signal(response.code);
    }
  };

  const initWebRTC = () => {
    console.log(navigator.mediaDevices);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(stream => {
        peer = new Peer({
          initiator: isHost,
          trickle: false,
          stream: stream,
        });

        if (!isHost) {
          getReceiverCode();
        }

        peer.on("signal", async data => {
          if (isHost) {
            const payload = {
              id,
              signalData: data,
            };

            await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
          } else {
            socket.emit("code", { code: data, url }, cb => {
              console.log("code sent");
            });
          }
        });

        peer.on("connect", () => {
          console.log("peer connected");
        });

        peer.on("stream", stream => {
          let video = document.querySelector("video");

          if ("srcObject" in video) {
            video.srcObject = stream;
            console.log(stream);
          } else {
            video.src = window.URL.createObjectURL(stream); // for older browsers
          }

          video.play();
        });
      });
  };

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
        </div>
        <VideoCallActions />
      </div>
      <ChatBar />
    </div>
  );
};

export default CallPage;
