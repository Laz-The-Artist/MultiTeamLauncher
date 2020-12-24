import {app, BrowserWindow, ipcMain} from 'electron'

import * as path from 'path'

import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCec2A2RTYHx3iCU7VwzJxSgoW51VrTk9A",
  authDomain: "multiteam-base.firebaseapp.com",
  projectId: "multiteam-base",
  storageBucket: "multiteam-base.appspot.com",
  messagingSenderId: "254163081307",
  appId: "1:254163081307:web:f49ae701be060a9395877e",
  measurementId: "G-9LPRKBL456"
};


function createWindow() {
  firebase.initializeApp(firebaseConfig);


    // Create the browser window.
    const mainWindow = new BrowserWindow({
      height: 737,
      width: 1312,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        // preload: path.join(__dirname, "renderer/login.js")
      }
    });
  
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "./login.html"));
  
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    ipcMain.on('login', (even, data) => {
      mainWindow.loadFile(path.join(__dirname, "./main.html"))
      // firebase.auth()
      // .createUserWithEmailAndPassword(data.username, data.password)
      // .then((val) => {
      //   console.log(val)
      // })
    })
}
  
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});