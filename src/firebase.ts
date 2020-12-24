import firebase from 'firebase'

export class FirebaseHandler {
    private auth: firebase.auth.Auth
    private uid: string = ""
    private database: firebase.database.Database

    constructor(config: object) {
        firebase.initializeApp(config)
        this.auth = firebase.auth()
        this.database = firebase.database()
    }

    createAccount(username: string, email: string, password: string) {
        var prom = this.auth.createUserWithEmailAndPassword(email, password)
        
        prom.then((cred: firebase.auth.UserCredential) => {
            this.setUid(cred.user.uid)
            this.setUserInfo(this.uid, "username", username)
        })

        return prom
    }

    login(email: string, password: string) {
        var prom = this.auth.signInWithEmailAndPassword(email, password)
        
        prom.then((cred: firebase.auth.UserCredential) => {
            this.setUid(cred.user.uid)
        })

        return prom
    }

    private setUid(uid: string) {
        this.uid = uid
        this.setUserInfo(uid, "uid", uid)
    }

    private setUserInfo(uid: string, key: string, value: any) {
        this.database.ref("users/" + uid).child(key).set(value)
    }

    private getUserInfo(uid: string, key: string) {
        return this.database.ref("users/" + uid).child(key).get()
    }
}