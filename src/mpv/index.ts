import fs from 'fs';
import os from 'os';

import Mpv from './Mpv';

let instance: Mpv;

const mpv = () => {
  if (!instance) {
    let binary = 'mpv';
    let ipcServer = '/tmp/chrollo.sock';

    if (os.platform() === 'win32') {
      ipcServer = '\\\\.\\pipe\\mpvsocket';
      if (fs.existsSync('./bin')) {
        binary = '.\\bin\\mpv.exe';
      }
    }

    instance = new Mpv(binary, ipcServer);
  }

  return instance;
};

export default mpv;
