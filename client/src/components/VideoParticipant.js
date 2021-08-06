const VideoParticipant = ({ name, picture, stream }) => {
  return (
    <div className="video-participant">
      <a href="/" className="name-tag">
        {name}
      </a>
      <img src={picture} alt="participant" />
    </div>
  );
};

export default VideoParticipant;
