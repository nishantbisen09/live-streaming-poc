const VideoCallActions = () => {
  return (
    <div className="video-call-actions ">
      <button className="video-action-button mic"></button>
      <button className="video-action-button camera"></button>
      <button className="video-action-button maximize"></button>
      <button className="video-action-button endcall">Leave</button>
    </div>
  );
};

export default VideoCallActions;
