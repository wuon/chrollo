import fs from 'fs';
import got from 'got';
import ora from 'ora';
import os from 'os';
import _7z from '7zip-min';

import { mpvInstallationInfo } from './config';
import { validateFileHash } from './utils';

export const winDownloadArchive = (fileName: string) =>
  new Promise<string>((resolve, reject) => {
    const archiveFile = fs.createWriteStream(fileName);
    const arch = os.arch();
    const { url, hash } =
      arch == 'x64' ? mpvInstallationInfo.win.x64 : mpvInstallationInfo.win.x86;
    const spinner = ora('Downloading binary archive...').start();
    const downloadStream = got.stream(url);

    downloadStream.pipe(archiveFile);

    downloadStream
      .on('downloadProgress', ({ transferred, total, percent }) => {
        const percentage = Math.round(percent * 100);
        spinner.text = `Downloading binary archive... ${percentage}%`;
      })
      .on('error', (err) => {
        console.log(err);
        spinner.fail('Download failed, you must install mpv manually.');
        reject(err);
      });

    archiveFile
      .on('error', (err) => {
        spinner.fail('File writing failed, you must install mpv manually.');
        reject(err);
      })
      .on('finish', () => {
        spinner.succeed('Download completed!');
        resolve(hash);
      });
  });

export const winValidateArchive = async (fileName: string, hash: string) => {
  const spinner = ora('Validating archive hash...').start();
  const valid = await validateFileHash(fileName, hash);

  if (valid) {
    spinner.succeed('File hash is valid!');
  } else {
    spinner.fail('File hash is invalid. Installation is aborted');
  }
  return valid;
};

export const winUnzipArchive = async (fileName: string) =>
  new Promise<void>((resolve, reject) => {
    const spinner = ora('Unpacking archive hash...').start();
    _7z.unpack(fileName, './bin', (err) => {
      if (err) {
        spinner.fail('Unpacking failed. Installation is aborted');
        reject(err);
        return;
      }
      spinner.succeed('Unpack finished!');
      resolve();
    });
  });
