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

    createAccount(email: string, password: string) {
        this.auth.createUserWithEmailAndPassword(email, password)
            .then((cred: firebase.auth.UserCredential) => {
                this.uid = cred.user.uid
            }, (reason) => {
                console.error(reason)
            })
    }

    login(email: string, password: string) {
        this.auth.signInWithEmailAndPassword(email, password)
            .then((cred: firebase.auth.UserCredential) => {
                this.uid = cred.user.uid
            }, (reason) => {
                console.error(reason)
            })
    }
}