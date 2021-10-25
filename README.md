![header](./assets/header.png)

# Chrollo

[![NPM version](https://img.shields.io/npm/v/chrollo.svg)](https://www.npmjs.com/package/chrollo)&nbsp;
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A node.js based CLI to enjoy your favourite anime. Inspired by pystardust's great work (pystardust/ani-cli).

[Features](#features) |
[Requirements](#requirements) |
[Installation](#installation) |
[License](#license)

## Features

- Stay up to date with the most recently uploaded anime
- Browse and search for a specific anime series

## Requirements

In order for Chrollo to work, mpv is required to be installed. When installing with npm, Chrollo will attempt to install mpv automatically using our post install script. This will create a local installation of mpv isolated specifically for Chrollo. In the event where your operating system is unsupported by Chrollo's auto installer, you may need to install mpv globally by following the instructions below:

### Windows

With [chocolatey](https://chocolatey.org/):

```bash
choco install mpv
```

### OSX

With [brew](https://brew.sh/):

```bash
brew install mpv
```

### Linux

```bash
sudo apt update
sudo apt install mpv
```

Or, you can follow the steps [here](https://mpv.io/installation/) for other mpv installation methods.

## Installation

With [npm](https://npmjs.org/):

```bash
npm install -g chrollo
```

To use Chrollo on the command line, install Chrollo via npm, then you should be able to run `chrollo` from the command line.

## License

[MIT](http://g14n.info/mit-license)
