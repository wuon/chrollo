import commandExists from 'command-exists';
import fs from 'fs';

const isMPVInstalled = () => {
  const exists = commandExists.sync('mpv --version') || fs.existsSync('./bin');
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
};

export default init;
