const { app, BrowserWindow } = require('electron')

function CreateWindow()
{
    const win = new BrowserWindow
    ({
        width: 800,
        height: 600,
        webPreferences:
        {
            nodeIntegration: false,
        },
    });

    win.loadURL('https://music.youtube.com');
}

app.whenReady().then(CreateWindow);

app.on('window-all-closed', () => 
{
    if (process.platform !== 'darwin') app.quit();
});