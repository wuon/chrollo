import fs from 'fs';
import os from 'os';

import Mpv from './Mpv';

let instance: Mpv;

const mpv = () => {
  if (!instance) {
    let binary = 'mpv';

    if (fs.existsSync('./bin') && os.platform() === 'win32') {
      binary = '.\\bin\\mpv.exe';
    }

    instance = new Mpv(binary);
  }
  return instance;
};

export default mpv;
