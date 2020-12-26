import firebase from 'firebase'

export class FirebaseHandler {
    private auth: firebase.auth.Auth
    private uid: string = ""
    private database: firebase.database.Database

    private username: string = ""
    private status: string = "online"

    constructor(config: object) {
        firebase.initializeApp(config)
        this.auth = firebase.auth()
        this.database = firebase.database()
    }

    async getUsername() {
        if (!this.username) {
            try {
                var name = await this.getUserField("username")
    
                if (name) this.username = name.val()
            } catch (e) {
                console.error(e)
            }
        }


        return this.username
    }

    getStatus() {
        return this.status
    }

    createAccount(username: string, email: string, password: string) {
        var prom = this.auth.createUserWithEmailAndPassword(email, password)
        
        prom.then((cred: firebase.auth.UserCredential) => {
            this.setUid(cred.user.uid)
            this.setUserInfo("username", username)
            this.setUserInfo("friends", [])

            this.connect()
        }, (reason) => {
            
        }).catch((reason) => {

        })

        return prom
    }

    login(email: string, password: string) {
        var prom = this.auth.signInWithEmailAndPassword(email, password)
        
        prom.then(async (cred: firebase.auth.UserCredential) => {
            this.setUid(cred.user.uid)

            await this.connect()
        }, (reason) => {
            
        }).catch((reason) => {

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

    private getUserField(key: string) {
        return this.database.ref("users/" + this.uid).child(key).get()
    }

    private async connect() {
        this.setUserInfo("status", "online")

        try {
            var name = await this.getUserField("username")

            if (name) this.username = name.val()
        } catch (e) {
            console.error(e)
        }
    }

    private async getUserInfo(id: string): Promise<object> {
        var obj = {}

        var objPro = await this.database.ref("users/" + id).get()

        if (objPro) {
            obj = objPro.val()
        }

        return obj;
    }

    async getFriendList(): Promise<any[]> {
        var friendList: any[] = []

        var friendListPromise = await this.getUserField("friends")

        if (friendListPromise) {
            try {
                var ids = (<string[]>friendListPromise.val())
                for (let i = 0; i < ids.length; i++) {
                    friendList.push(await this.getUserInfo(ids[i]))
                }
            } catch(e) {
                console.log("Friends list doesn't exist.")
            }
        }


        return friendList;
    }
}