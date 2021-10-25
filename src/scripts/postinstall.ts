import os from 'os';
import commandExists from 'command-exists';
import inquirer from 'inquirer';

import {
  installationCompleted,
  mpvNotFoundWarning,
  autoInstallNotSupported,
  autoInstallFailed
} from './lib/prompts';
import {
  winDownloadArchive,
  winUnzipArchive,
  winValidateArchive
} from './lib/windows';

const main = async () => {
  // Since we only implemented automatic binary installation for windows
  // ignore the other platforms for now
  const supportedPlatforms = new Set(['win32']);
  if (
    supportedPlatforms.has(os.platform()) &&
    !commandExists.sync('mpv --version')
  ) {
    const { shouldInstall } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldInstall',
        message: `You don't have mpv installed, would you like Chrollo to automatically install it for you?`
      }
    ]);
    if (shouldInstall) {
      await installMPVBinary();
    } else {
      console.log(mpvNotFoundWarning);
    }
    console.log(installationCompleted);
  }
};

const installMPVBinary = async () => {
  const platform = os.platform();
  switch (platform) {
    case 'win32':
      await installMPVForWindows();
      break;
    case 'darwin':
    case 'linux':
    default:
      console.log(autoInstallNotSupported);
  }
};

const installMPVForWindows = async () => {
  try {
    const fileName = 'mpv_archive.7z';
    const hash = await winDownloadArchive(fileName);
    const valid = await winValidateArchive(fileName, hash);
    if (!valid) {
      throw Error('archive hash is invalid');
    }
    await winUnzipArchive(fileName);
  } catch (e) {
    console.log(autoInstallFailed);
  }
};

main();
