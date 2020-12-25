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

    abstract loadSubTab(): void;
}

export class FriendsTab extends SocialSubTab {
    constructor(main: MainWindow) {
        super(main)
    }

    loadSubTab() {
        var friendListDiv = document.createElement("div")
        friendListDiv.setAttribute("id", "friend-list")
        friendListDiv.setAttribute("class", "friend-list")

        for (let i=0; i< 10; i++) { 
            var placeholderPFPImage = document.createElement("i")
            placeholderPFPImage.setAttribute("class", "fas fa-user")

            var testFriendImage = document.createElement("div")
            testFriendImage.setAttribute("class", "pfp")
            testFriendImage.appendChild(placeholderPFPImage)

            var testFriendName = document.createElement("h1")
            testFriendName.setAttribute("id", "friend-user-name")
            testFriendName.innerHTML = "Cat Core"

            var testFriendStatus = document.createElement("h4")
            testFriendStatus.setAttribute("id", "friend-user-status")
            testFriendStatus.innerHTML = "Online"

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
            testFriendDiv.appendChild(testFriendName)
            testFriendDiv.appendChild(testFriendStatus)
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
    }
}