import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Socket } from 'net';

import MpvSocket from './MpvSocket';

const ipcServer = '/tmp/chrollo.sock';
const ARGS = [`--input-ipc-server=${ipcServer}`, '--no-config', '--idle=yes'];

class Mpv {
  private childProcess: ChildProcessWithoutNullStreams;
  private mpvSocket: MpvSocket;

  constructor(binary: string) {
    this.childProcess = spawn(binary, ARGS);

    process.on('exit', () => this.kill());

    this.childProcess.on('exit', () => process.off('exit', () => this.kill()));
    this.childProcess.on('error', (error) => console.log(error));

    this.childProcess.stdout.setEncoding('utf8');
    this.childProcess.stdout.on('data', () => {
      return;
    });

    this.childProcess.stderr.setEncoding('utf8');
    this.childProcess.stderr.on('data', () => {
      return;
    });

    this.mpvSocket = new MpvSocket(ipcServer);
  }

  get socket(): Socket {
    return this.mpvSocket.socket;
  }

  async play(referrer: string, file: string) {
    await this.mpvSocket.send(['set_property', 'referrer', referrer]);
    await this.mpvSocket.send(['loadfile', file]);
  }

  kill() {
    this.childProcess.kill();
  }
}

export default Mpv;
