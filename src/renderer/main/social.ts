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
        var friendListDiv = document.createElement("div")
        friendListDiv.setAttribute("id", "friend-list")
        friendListDiv.setAttribute("class", "friend-list")

        for (let i=0; i< this.friendList.length; i++) { 
            var placeholderPFPImage = document.createElement("i")
            placeholderPFPImage.setAttribute("class", "fas fa-user")

            var testFriendImage = document.createElement("div")
            testFriendImage.setAttribute("class", "pfp")
            testFriendImage.appendChild(placeholderPFPImage)

            var testFriendName = document.createElement("h1")
            testFriendName.setAttribute("id", "friend-user-name")
            testFriendName.innerHTML = this.friendList[i].username

            var testFriendStatus = document.createElement("h4")
            testFriendStatus.setAttribute("id", "friend-user-status")
            testFriendStatus.innerHTML = this.friendList[i].status

            var messageInput = document.createElement("input")
            messageInput.setAttribute("id", "friend-msg-input")
            messageInput.setAttribute("placeholder","Message")
            messageInput.setAttribute("type", "text")

            var sendIcon = document.createElement("i")
            sendIcon.setAttribute("id", "ico-send")
            sendIcon.setAttribute("class", "fas fa-paper-plane")

            var sendButton = document.createElement("div")
            sendButton.setAttribute("class", "button_icon")
            sendButton.setAttribute("id", "send-btn")
            sendButton.appendChild(sendIcon)

            var messageBoxDiv = document.createElement("div")
            messageBoxDiv.setAttribute("class", "message_box")
            messageBoxDiv.appendChild(messageInput)
            messageBoxDiv.appendChild(sendButton)

            var testFriendDiv = document.createElement("div")
            testFriendDiv.setAttribute("id", "friend-list-item")
            testFriendDiv.appendChild(testFriendImage)
            testFriendDiv.appendChild(testFriendStatus)
            testFriendDiv.appendChild(testFriendName)
            testFriendDiv.appendChild(messageBoxDiv)

            friendListDiv.appendChild(testFriendDiv)
        }

        this.getElement("tab-content").appendChild(friendListDiv)
    }
}

export class GroupsTab extends SocialSubTab {
    constructor(main: MainWindow) {
        super(main)
    }

    loadSubTab() {
        
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
    }
}