# ElectroTube

**Electron wrapper for YouTube Music**

A standalone, cross-platform desktop application for enjoying [YouTube Music](https://music.youtube.com) without relying on browser extensions or Progressive Web App support.

## Why ElectroTube?

Firefox does not support installing YouTube Music as a standalone PWA (Progressive Web App), unlike Chromium-based browsers.

**ElectroTube** was created to solve that. It offers:

- A dedicated desktop app feel
- Independence from browser state or extensions
- Persistent window sizing and position
- Simple setup, no fluff

## Features

- Loads [https://music.youtube.com](https://music.youtube.com) in an Electron window
- Saves window dimensions and position between sessions
- Installer support for both **Windows** and **Linux (.deb / AppImage)**

## Installation

### Windows

Download and run the latest `.exe` installer from the [Releases](https://github.com/TheRoboDoc/ElectroTube/releases) section.

### Linux (Debian-based)

Download the `.deb` file and install using:

```bash
sudo dpkg -i electrotube_VERSION_amd64.deb
```

### Linux (AppImage)

Download the `.AppImage`, then:

```bash
chmod +x ElectroTube_VERSION.AppImage
./ElectroTube_VERSION.AppImage
```

## Development

Clone and install:

```bash
git clone https://github.com/TheRoboDoc/ElectroTube.git
cd ElectroTube
npm install
```
Run in development mode:

```bash
npm start
```

Build installers:

```bash
# Windows
npm run build:win

# Linux
npm run build:linux
```

## Dependencies

* [Electron](https://electronjs.org/)
* [electron-store](https://github.com/sindresorhus/electron-store)
* [electron-builder](https://www.electron.build/)

## License

MIT License © RoboDoc

> *"The flesh is weak, but the standalone client is strong."*
