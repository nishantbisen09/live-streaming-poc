import { useHistory } from "react-router-dom";
import shortid from "shortid";

const HomePage = () => {
  const history = useHistory();
  const startCall = () => {
    const uid = shortid.generate();
    history.push(`/${uid}#init`);
  };

  return (
    <>
      <h1>Hello this is home page</h1>
      <button onClick={startCall}>Start a new meeting</button>
    </>
  );
};

export default HomePage;
