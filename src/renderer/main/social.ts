import { MainWindow } from "../main";
import { Tab } from "./main";

export abstract class SocialSubTab extends Tab {
    constructor(main: MainWindow) {
        super(main)
    }

    load() {
        this.loadSubTab()
    }

    init() {}

    emptyContent() {
        this.getElement("tab-content").innerHTML = null
    }

    isTabSelected(index: number) {
        return this.getMain().getCurrentTab() == 2 && this.getMain().getCurrentSocialTab() == index
    }

    abstract loadSubTab(): void;
}

export class FriendsTab extends SocialSubTab {
    friendList: any[];
    constructor(main: MainWindow) {
        super(main)

        this.friendList = []

        this.getMain().on("friend-list", (even, data) => {
            this.parseFriendList(data)
        })

        this.getMain().send("friend-list", {})

        setInterval(() => {
            this.getMain().send("friend-list", {})
        }, 60000)
    }

    parseFriendList(list: any) {
        this.friendList = list["friends"]

        if (this.isTabSelected(0)) {
            this.emptyContent()
            this.loadSubTab()
        }
    }

    loadSubTab() {
        var friendListDiv = this.HTMLElement("div")
            .set("id", "friend-list")
            .set("class", "friend-list")

        for (let i=0; i< this.friendList.length; i++) { 
            var placeholderPFPImage = this.HTMLElement("i")
                .set("class", "fas fa-user")

            var testFriendImage = this.HTMLElement("div")
                .set("class", "pfp")
                .child(placeholderPFPImage.build())

            var testFriendName = this.HTMLElement("h1")
                .set("id", "friend-user-name")
                .setInner(this.friendList[i].username)

            var testFriendStatus = this.HTMLElement("h4")
                .set("id", "friend-user-status")
                .setInner(this.friendList[i].status)

            var messageInput = this.HTMLElement("input")
                .set("id", "friend-msg-input")
                .set("placeholder","Message")
                .set("type", "text")

            var sendIcon = this.HTMLElement("i")
                .set("id", "ico-send")
                .set("class", "fas fa-paper-plane")

            var sendButton = this.HTMLElement("div")
                .set("class", "button_icon")
                .set("id", "send-btn")
                .child(sendIcon.build())

            var messageBoxDiv = this.HTMLElement("div")
                .set("class", "message_box")
                .child(messageInput.build())
                .child(sendButton.build())

            var testFriendDiv = this.HTMLElement("div")
                .set("id", "friend-list-item")
                .child(testFriendImage.build())
                .child(testFriendStatus.build())
                .child(testFriendName.build())
                .child(messageBoxDiv.build())

            friendListDiv.child(testFriendDiv.build())
        }

        this.getElement("tab-content").appendChild(friendListDiv.build())
    }

    getName() {
        return "friends"
    }
}

export class GroupsTab extends SocialSubTab {
    constructor(main: MainWindow) {
        super(main)
    }

    loadSubTab() {
        
    }

    getName() {
        return "groups"
    }
}

export class SocialTab extends Tab {

    constructor(main: MainWindow) {
        super(main)
    }

    load() {
        this.getMain().setSocialTab(this.getMain().getCurrentSocialTab())
    }

    init() {
        this.getElement("tab-content").setAttribute("class", "content_social")
        this.getElement("game-list").setAttribute("class", "sidebar_hidden")
        
        this.getElement("sub-header-friends").style.display = "inline-block"
        this.getElement("sub-header-groups").style.display = "inline-block"
        this.getElement("add-friend").style.display = "inline-block"

        this.getElement("sub-header-general").style.display = "none"
        this.getElement("sub-header-account").style.display = "none"
    }

    getName() {
        return "social"
    }
}