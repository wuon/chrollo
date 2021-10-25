import chalk from 'chalk';

export const installationCompleted = chalk`
{green Installation process complete!}

Chrollo is ready for you, simply enter {bold chrollo} in your terminal to discover the world of {red a}{rgb(241, 118, 28) n}{yellow i}{green m}{blue e}!
`;

export const mpvNotFoundWarning = chalk.yellow(
  'Chrollo requires mpv to work. Please make sure mpv is installed before using Chrollo.'
);

export const autoInstallNotSupported = chalk.red(
  `Oh no... You are using an operating system where Chrollo's auto mpv installer isn't supported yet, you must install mpv on your own.`
);

export const autoInstallFailed = chalk.red(
  `Oh no... The mpv auto installation failed, you must install mpv on your own.`
);
