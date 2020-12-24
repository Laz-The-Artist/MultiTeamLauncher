import * as electron from 'electron'

document.getElementById("connect").onclick = () => {
    console.log()
    electron.ipcRenderer.send('login', {
        username: (<any>document.getElementById("username")).value,
        password: (<any>document.getElementById("password")).value
    })
}