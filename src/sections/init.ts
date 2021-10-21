import { exec } from 'child_process';

const isMPVInstalled = () => {
  return new Promise<boolean>((resolve) => {
    exec('mpv --version', (error) => {
      if (error) {
        const { code } = error;
        if (code === 127) {
          console.log(
            "Looks like you don't have mpv installed. You will need it to run chrollo!"
          );
          console.log(
            'You can download mpv from here: https://mpv.io/installation/'
          );
        } else {
          console.log(error);
          console.error(
            'An unexpected error has occured. Please check the stacktrace above for more information.'
          );
        }
        resolve(false);
      }
      resolve(true);
    });
  });
};

const init = async () => {
  if (!(await isMPVInstalled())) {
    process.exit(1);
  }
};

export default init;
