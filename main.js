const { app, BrowserWindow, session } = require('electron')
const Store = require('electron-store').default;
const path = require('path');

let store;

function CreateWindow()
{
    const state = store.get('windowState') ||
    {
        bounds: {width: 1200, height: 800 },
        isMaximized: false
    };

    const win = new BrowserWindow
    ({
        ...state.bounds,
        width: 800,
        height: 600,
        webPreferences:
        {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        },
        title: "ElectroTube",
        icon: path.join(__dirname, 'icon.png')
    });

    if (state.isMaximized)
    {
        win.maximize();
    }

    win.loadURL('https://music.youtube.com');

    win.on('close', () =>
    {
        store.set('windowState',
        {
            bounds: win.getBounds(),
            isMaximized: win.isMaximized()
        });
    });
}

app.whenReady().then(async () =>
{
    const isDebug = process.argv.includes('--clear-store');

    store = new Store();

    if (isDebug)
    {
        console.log('Clearing store and session...');

        store.clear();

        await session.defaultSession.clearStorageData();
        await session.defaultSession.clearCache();
    }

    CreateWindow();
});

app.on('window-all-closed', () => 
{
    if (process.platform !== 'darwin') app.quit();
});