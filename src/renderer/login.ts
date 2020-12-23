import * as electron from 'electron'

document.getElementById("connect").onclick = () => {
    electron.ipcRenderer.send('login')
}