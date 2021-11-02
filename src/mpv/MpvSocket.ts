import { Socket } from 'net';

enum SocketEvent {
  ERROR = 'error',
  CONNECT = 'connect',
  DATA = 'data',
  CLOSE = 'close'
}

interface SocketError {
  errno: number;
  code: string;
  syscall: string;
  address: string;
}

interface IpcRequest {
  request_id: number;
  command: string[];
}

const RETRY_TIMEOUT = 100;
const MAX_RETRIES = 10;

class MpvSocket {
  private id: number;
  private path: string;
  private numberOfRetries: number;

  private _socket: Socket;
  private _isConnected: boolean;

  constructor(path: string) {
    this.id = 0;
    this.path = path;
    this.numberOfRetries = 0;

    this._socket = new Socket();
    this._isConnected = false;

    this._socket.setEncoding('utf8');
    this._socket.connect(path);

    this._socket.on(SocketEvent.ERROR, this.errorHandler);
    this._socket.on(SocketEvent.CONNECT, this.connectHandler);
    this._socket.on(SocketEvent.DATA, this.dataHandler);
  }

  get socket(): Socket {
    return this._socket;
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  private connectHandler = () => {
    this._isConnected = true;
    this._socket.on(SocketEvent.CLOSE, this.closeHandler);
  };

  private closeHandler = () => {
    this._isConnected = false;

    this._socket.removeAllListeners(SocketEvent.CLOSE);
    this._socket.removeAllListeners(SocketEvent.ERROR);
    this._socket.removeAllListeners(SocketEvent.DATA);
    this._socket.removeAllListeners(SocketEvent.CONNECT);

    this._socket.destroy();
  };

  private errorHandler = (error: SocketError) => {
    if (
      this.numberOfRetries < MAX_RETRIES &&
      (error.code === 'ENOENT' || error.code === 'ECONNREFUSED')
    ) {
      this.numberOfRetries += 1;
      setTimeout(() => {
        this._socket.connect(this.path);
      }, RETRY_TIMEOUT * this.numberOfRetries);
    }
  };

  private dataHandler = (data: string) => {
    if (data) {
      const messages = data.trim().split('\n');
      messages.forEach((message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.event) {
          this._socket.emit(`mpv:${parsedMessage.event}`);
        }
      });
    }
    return;
  };

  send = (command: string[]) => {
    return new Promise<boolean>((resolve, reject) => {
      const ipcRequest: IpcRequest = {
        request_id: ++this.id,
        command
      };
      const message = JSON.stringify(ipcRequest) + '\n';

      if (!this._isConnected) {
        reject(new Error('Socket is not connected.'));
      }

      const result = this._socket.write(message);
      resolve(result);
    });
  };
}

export default MpvSocket;
