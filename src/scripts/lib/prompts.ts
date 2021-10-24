import chalk from 'chalk';

export const ΘinstallationCompleted = chalk`
{green Installation process complete!}

Chrollo is ready for you, simply enter {bold chrollo} in your terminal to discover the world of {red a}{rgb(241, 118, 28) n}{yellow i}{green m}{blue e}!
`;

export const ΘmpvNotFoundWarning = chalk.yellow(
  'Chrollo requires mpv to work. Please make sure mpv is installed before using Chrollo.',
);

export const ΘautoInstallNotSupported = chalk.red(
  `Oh no... You are using an operating system Chrollo doesn't support, you must install mpv on your own.`,
);

export const ΘautoInstallFailed = chalk.red(
  `Oh no... Auto mpv installation failed, you must install mpv on your own.`,
);
