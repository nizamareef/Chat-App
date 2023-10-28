
import Slider from '../components/Slider';
import React, { useContext ,useState} from 'react';
import Chatcontext from '../context/Chatcontext';
import Users from '../components/Users';
import Messages from '../components/Messages';

const Chats = () => {
  const { user } = useContext(Chatcontext);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div>
       { user && <Slider/>}
      {user && (
        <div className="d-md-flex">
          <Users fetchAgain={fetchAgain} />
          <Messages  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        </div>
      )}
    </div>
  );
}

export default Chats;
