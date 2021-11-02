import commandExists from 'command-exists';
import fs from 'fs';
import mpv from '../mpv';

const isMPVInstalled = async () => {
  const exists = (await commandExists.sync('mpv')) || fs.existsSync('./bin');
  if (!exists) {
    console.log(
      "Looks like you don't have mpv installed. You will need it to run chrollo!"
    );
    console.log('You can download mpv from here: https://mpv.io/installation/');
  }
  return exists;
};

const init = async () => {
  if (!isMPVInstalled()) {
    process.exit(1);
  }

  mpv();
};

export default init;
