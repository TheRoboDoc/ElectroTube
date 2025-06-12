const { app, BrowserWindow, nativeTheme, shell, session } = require('electron');
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

    win.setMenuBarVisibility(false);

    win.loadURL('https://music.youtube.com');

    win.on('close', () =>
    {
        store.set('windowState',
        {
            bounds: win.getBounds(),
            isMaximized: win.isMaximized()
        });
    });

    win.webContents.setWindowOpenHandler(({ url }) =>
    {
        if 
        (
            url.startsWith('https://music.youtube.com') ||
            url.startsWith('https://accounts.google.com') ||
            url.startsWith('https://play.google.com') ||
            url.startsWith('https://myaccount.google.com')
        )
        {
            return { action: 'allow' }
        }

        if (url.startsWith('https://'))
        {
            shell.openExternal(url);
        }

        return { action: 'deny' };
    });

    session.defaultSession.setPermissionRequestHandler((_, permission, callback) =>
    {
        if (permission === 'media')
        {
            return callback(true);
        }

        callback(false);
    });

    nativeTheme.themeSource = 'dark';
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