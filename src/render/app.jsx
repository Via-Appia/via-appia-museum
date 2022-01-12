import React, {useMemo, useCallback} from 'react';
import AppBar from './components/app-bar';
import Socket from './hooks/websocket';

const App = () => {
  const websocket = useMemo(() => {
    const socket = new Socket('testing-id');
    return socket
  }, [])

  const handleSend = useCallback((message) => {
    websocket.sendObj(message)
    // websocket.send(JSON.stringify({test: 'test'}))
  },[])

  return (
    <>
      <AppBar />
      <div className="app">
        <div className="message-box">
          <button onClick={() => handleSend({type: 'TEST', payload: "Hello World!"})}>Send message</button>
        </div>
      </div>
      {/* <iframe src="http://localhost:3000/"></iframe> */}
    </>
  );
};

export default App;
