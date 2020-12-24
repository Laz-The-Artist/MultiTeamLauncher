import firebase from 'firebase'

export class FirebaseHandler {
    private auth: firebase.auth.Auth
    private uid: string = ""
    private database: firebase.database.Database

    private username: string = ""

    constructor(config: object) {
        firebase.initializeApp(config)
        this.auth = firebase.auth()
        this.database = firebase.database()
    }

    createAccount(username: string, email: string, password: string) {
        var prom = this.auth.createUserWithEmailAndPassword(email, password)
        
        prom.then((cred: firebase.auth.UserCredential) => {
            this.setUid(cred.user.uid)
            this.setUserInfo("username", username)
            this.setUserInfo("friends", [])

            this.connect()
        })

        return prom
    }

    login(email: string, password: string) {
        var prom = this.auth.signInWithEmailAndPassword(email, password)
        
        prom.then((cred: firebase.auth.UserCredential) => {
            this.setUid(cred.user.uid)

            this.connect()
        })

        return prom
    }

    private setUid(uid: string) {
        this.uid = uid
        this.setUserInfo("uid", uid)
    }

    private setUserInfo(key: string, value: any) {
        this.database.ref("users/" + this.uid).child(key).set(value)
    }

    private getUserInfo(key: string) {
        return this.database.ref("users/" + this.uid).child(key).get()
    }

    private connect() {
        this.setUserInfo("status", "online")

        this.getUserInfo("username").then((val) => {
            this.username = val.val()
        }, (reason) => {
            console.error(reason)
        })
    }
}