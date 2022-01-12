class Socket extends WebSocket {
  constructor(id) {
    const host = require('os').hostname().toLowerCase();
    const port = 8001;
    const url = `ws://${host}:${port}`;
    const protocols = undefined;

    super(url, protocols);

    this.host = host;
    this.port = port;
    this.id = id;

    this.onopen = (event) => this.handleConnect(event);
  }

  sendObj(obj) {
    this.send(JSON.stringify(obj));
  }

  handleConnect(event) {
    const message = {
      type: 'CONNECT',
      payload: {
        id: this.id,
      },
    };
  
    this.sendObj(message)
  }

}


export default Socket;
