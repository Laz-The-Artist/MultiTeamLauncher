import * as electron from 'electron'

enum Operation {
    SIGNIN,
    SIGNUP
}

let operation = Operation.SIGNIN

for (const i in [0,1]) {
    console.log(i)
    document.getElementById("connect" + i).onclick = () => {
        electron.ipcRenderer.send('login', {
            email: (<any>document.getElementById("email" + i)).value,
            password: (<any>document.getElementById("password" + i)).value,
            username: document.getElementById("username" + i) ? (<any>document.getElementById("username" + i)).value : "",
            operation:  operation
        })
    }
}

document.getElementById("sign-up-text").onclick = () => {
    document.getElementById("window-login").style.display = "none";
    document.getElementById("window-signup").style.display = "block";

    (<any>document.getElementById("email" + Operation.SIGNUP)).value = (<any>document.getElementById("email" + Operation.SIGNIN)).value;
    (<any>document.getElementById("password" + Operation.SIGNUP)).value = (<any>document.getElementById("password" + Operation.SIGNIN)).value;

    operation = Operation.SIGNUP
}

document.getElementById("login-text").onclick = () => {
    document.getElementById("window-login").style.display = "block";
    document.getElementById("window-signup").style.display = "none";

    (<any>document.getElementById("email" + Operation.SIGNIN)).value = (<any>document.getElementById("email" + Operation.SIGNUP)).value;
    (<any>document.getElementById("password" + Operation.SIGNIN)).value = (<any>document.getElementById("password" + Operation.SIGNUP)).value;

    operation = Operation.SIGNIN
}

electron.ipcRenderer.on("login-error", (even, data) => {
    if (data["operation"] == Operation.SIGNUP) {
        document.getElementById("msg-login-error2").style.display = "block"
    } else {
        document.getElementById("msg-login-error").style.display = "block"
    }
    // console.error(data["error"])
})