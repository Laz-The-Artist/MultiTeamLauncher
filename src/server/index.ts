import {app, BrowserWindow, ipcMain, dialog} from 'electron'

import * as path from 'path'
import { ClientSettings, DataStorage } from './datastorage';
import { FirebaseHandler } from './firebase';
import {Crypter} from './crypter'

var firebaseConfig = {
  apiKey: "AIzaSyCec2A2RTYHx3iCU7VwzJxSgoW51VrTk9A",
  authDomain: "multiteam-base.firebaseapp.com",
  projectId: "multiteam-base",
  storageBucket: "multiteam-base.appspot.com",
  messagingSenderId: "254163081307",
  appId: "1:254163081307:web:f49ae701be060a9395877e",
  databaseURL: "https://multiteam-base-default-rtdb.europe-west1.firebasedatabase.app",
  measurementId: "G-9LPRKBL456"
};


async function createWindow() {
  const firebaseClient = new FirebaseHandler(firebaseConfig)
  const dataStorage = new DataStorage(app.getPath("userData"));
  const clientSettings = new ClientSettings()


  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 737,
    width: 1312,
    icon: path.join(__dirname, '../res/img/', 'mt_launcher_icon.png'),
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      // preload: path.join(__dirname, "renderer/login.js")
    }
  });

  await mainWindow.loadFile(path.join(__dirname, "../loading.html"))

  if (await dataStorage.fileExist("client_settings.json")) {
    var uncrypter = new Crypter(await dataStorage.readFile("client_settings.json"))
    clientSettings.read(uncrypter)
  } else {
    await dataStorage.writeFile("client_settings.json", clientSettings.write(new Crypter()).getBuffer())
  }

  var existingCreditentials = {
    email: "",
    password: ""
  }

  if (await dataStorage.fileExist("creditentials.data")) {
    var uncrypter = new Crypter(await dataStorage.readFile("creditentials.data"))
    existingCreditentials.email = uncrypter.readString()
    existingCreditentials.password = uncrypter.readString()
  }



  // and load the index.html of the app.
  if (existingCreditentials.email != "" && existingCreditentials.password != "" && (await tryLogin(0, existingCreditentials)).pass) {
    await login(mainWindow, existingCreditentials.email, existingCreditentials.password, clientSettings)
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../login.html"));
  }
  // Open the DevTools.
  await mainWindow.webContents.openDevTools();

  ipcMain.on('login', async (even, data) => {
    var result = await tryLogin(data["operation"], data)
    if (result.pass) {
      await login(mainWindow, data["email"], data["password"], clientSettings)
    } else {
      ipcMain.emit("login-error", {
        operation: data["operation"],
        error: result.reason
      })
    }
  })
  .on("friend-list", async (even, data) => {
    var obj = {
      friends: await firebaseClient.getFriendList()
    }
    even.reply('friend-list', obj)
  })
  .on("get-username", async (even, data) => {
    even.reply("get-username", {username: await firebaseClient.getUsername(), status: firebaseClient.getStatus()})
  }).on("client-settings", (even, data) => {
    even.reply("client-settings", {settings:JSON.stringify(clientSettings)})
  }).on("client-settings-update", async (even, data) => {
    clientSettings.fromJson(JSON.parse(data["settings"]))
    await dataStorage.writeFile("client_settings.json", clientSettings.write(new Crypter()).getBuffer())
  }).on("chose-path", async (ev, data) => {
    var options: any = {
      properties: [
        "createDirectory", "dontAddToRecent", "openDirectory", "showHiddenFiles", "treatPackageAsDirectory"
      ]
    }

    data["path"] == "unset" ? undefined : options["defaultPath"] = data["path"];

    var newPath = dialog.showOpenDialogSync(mainWindow, options)[0]

    clientSettings.setGameLibraryLoc(newPath)
    await dataStorage.writeFile("client_settings.json", clientSettings.write(new Crypter()).getBuffer())
    ev.reply("client-settings", {settings:JSON.stringify(clientSettings)})
    ev.reply("chose-path", {})
  })

  async function login(mainWindow: BrowserWindow, email: string, password: string, clientSettings: ClientSettings) {
    mainWindow.loadFile(path.join(__dirname, "../main.html"))

    var crypter = new Crypter()
    crypter.writeString(email)
    crypter.writeString(password)

    await dataStorage.writeFile("creditentials.data", crypter.getBuffer())
  }

  async function tryLogin(action: number, data: any) {
    var er = {}
    if (action == 1) {
      try {
        await firebaseClient.createAccount(data["username"], data["email"], data["password"])
        return {pass:true}
      } catch (e) {
        er = e
      }
    } else {
      try {
        await firebaseClient.login(data["email"], data["password"])
        return {pass:true}
      } catch (e) {
        er = e
      }
    }
    return {pass:false, reason: er}
  }

  app.on("before-quit", () => {
    firebaseClient.setUserInfo("status", "offline")
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