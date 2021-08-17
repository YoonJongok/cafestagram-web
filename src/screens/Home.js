import { useHistory } from "react-router-dom";
import { LogUserOut } from "../apollo";

function Home() {
  const history = useHistory();
  return (
    <div>
      <h1>Welcome Home</h1>
      <button onClick={() => LogUserOut(history)}>Log out</button>
    </div>
  );
}
export default Home;
