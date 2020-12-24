import {ipcRenderer} from 'electron'

enum TAB {
    GAMES,
    SOCIAL,
    SETTINGS
}

function getElement(id: string): HTMLElement {
    return document.getElementById(id)
}

let currentTab = TAB.GAMES

getElement("header-games").setAttribute("class", "header_tab_selected")

getElement("header-games").onclick = () => {
    getElement("header-games").setAttribute("class", "header_tab_selected")
    getElement("header-social").setAttribute("class", "header_tab")
    getElement("header-settings").setAttribute("class", "header_tab")
    currentTab = TAB.GAMES
    loadTab(currentTab)
}

getElement("header-social").onclick = () => {
    getElement("header-social").setAttribute("class", "header_tab_selected")
    getElement("header-games").setAttribute("class", "header_tab")
    getElement("header-settings").setAttribute("class", "header_tab")
    currentTab = TAB.SOCIAL
    loadTab(currentTab)
}

getElement("header-settings").onclick = () => {
    getElement("header-settings").setAttribute("class", "header_tab_selected")
    getElement("header-social").setAttribute("class", "header_tab")
    getElement("header-games").setAttribute("class", "header_tab")
    currentTab = TAB.SETTINGS
    loadTab(currentTab)
}

loadTab(currentTab)

function loadGameTab() {
    createGameContent()
    var testGameInfo = [
        {
            name: "JASG",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "./res/img/game_icon_jasg.png",
            previewURL: "https://www.americasfinestlabels.com/images/CCS400PL.jpg",
            descriptionTitle: "Just a survival game",
            description: "JASG is a fantasy 8-bit Survival game, within a topdown-perspective world.<br><br>This amazing new experience comes with a lot of exploration, advancing through this mysterious world, achieving magic, defeating bosses, crafting equipment and many more! Have i mentioned that its like 70% procedural?",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "Soldiers of The Office",
            version: {
                name: "N/A",
                versionNumber: "0.0.0"
            },
            iconURL: "./res/img/game_icon_soto.png",
            previewURL: "https://www.americasfinestlabels.com/images/CCS400PL.jpg",
            descriptionTitle: "Description",
            description: "Soldiers of the office is a story based, 2D platformer-shooter, all about the weird war of humans against an infection that spreads with ultra-modern technology.",
            downloadURL: "",
            color: "#242735"
        },
        {
            name: "Project Freedom",
            version: {
                name: "N/A",
                versionNumber: "0.0.0"
            },
            iconURL: "./res/img/game_icon_pf.png",
            previewURL: "https://www.americasfinestlabels.com/images/CCS400PL.jpg",
            descriptionTitle: "Description",
            description: "Project Freedom is a 3D game, but its not what you would expect.<br><br>This game will have a play-mode for every type of game, like minecraft, pubg, cs:go, lol, overwatch, and many more new custom or weird play-modes",
            downloadURL: "",
            color: "#009f00"
        }
    ]

    while (getElement("game-list").hasChildNodes()) {
        getElement("game-list").removeChild(getElement("game-list").childNodes[0])
    }

    var badgeDownload = "fas fa-arrow-alt-circle-down"
    var badgeDownloadColor = "#4CBE6A"
    var badgeUpdate = "fas fa-arrow-alt-circle-up"
    var badgeUpdateColor = "#E1E1E1"
    var badgeError = "fas fa-exclamation-circle"
    var badgeErrorColor = "#E95F66"

    for (const i in testGameInfo) {
        var gameIcon = document.createElement("img")
        gameIcon.setAttribute("src", testGameInfo[i].iconURL)
        gameIcon.setAttribute("class", "sidebar_item_icon")
        gameIcon.setAttribute("alt", "sidebar_item_icon")
        gameIcon.setAttribute("draggable", "false")

        var downStatus = document.createElement("i")
        downStatus.setAttribute("class", badgeDownload)
        downStatus.setAttribute("id", "sidebar_item_badge")
        downStatus.style.color = badgeDownloadColor

        var gameDiv = document.createElement("div")
        gameDiv.setAttribute("class", "sidebar_item")
        gameDiv.style.backgroundColor = testGameInfo[i].color
        gameDiv.appendChild(gameIcon)
        gameDiv.appendChild(downStatus)
        gameDiv.onclick = () => {
            selectGame(Number.parseInt(i))
        }

        getElement("game-list").appendChild(gameDiv)
    }

    selectGame(0)

    function selectGame(id: number) {
        getElement("game-preview").style.backgroundImage = "url(" + testGameInfo[id].previewURL + ")"
        getElement("game-icon-img").setAttribute("src", testGameInfo[id].iconURL)
        getElement("game-icon").style.backgroundColor = testGameInfo[id].color
        getElement("game-title").innerHTML = testGameInfo[id].name
        getElement("game-version").innerHTML = testGameInfo[id].version.name
        getElement("game-description-title").innerHTML = testGameInfo[id].descriptionTitle
        getElement("game-description").innerHTML = testGameInfo[id].description
    }

    function createGameContent() {
        // <div><img src="" alt="game-icon" id="game-icon"></div>
        var iconImg = document.createElement("img")
        iconImg.setAttribute("src", "")
        iconImg.setAttribute("alt", "game-icon")
        iconImg.setAttribute("id", "game-icon-img")
        iconImg.setAttribute("draggable", "false")

        var iconDiv = document.createElement("div")
        iconDiv.setAttribute("id", "game-icon")
        iconDiv.appendChild(iconImg)
    
        // <h1 id="game-title"></h1>
        var nameH1 = document.createElement("h1")
        nameH1.innerHTML = ""
        nameH1.setAttribute("id", "game-title")
    
        // <h2 id="game-version"></h2>
        var versionH2 = document.createElement("h2")
        versionH2.innerHTML = ""
        versionH2.setAttribute("id", "game-version")
    
        // <input type="submit" value="Play/Update" id="play-update" class="button_regular">
        var button = document.createElement("input")
        button.setAttribute("type", "submit")
        button.setAttribute("value", "Play/Update")
        button.setAttribute("id", "play-update")
        button.setAttribute("class", "button_regular")
    
        // <div id="game-preview" style="backgroud-image: ">
        // ...
        // </div>
        var gamePreviewDiv = document.createElement("div")
        gamePreviewDiv.style.backgroundImage = ""
        gamePreviewDiv.setAttribute("id", "game-preview")
    
        gamePreviewDiv.appendChild(iconDiv)
        gamePreviewDiv.appendChild(nameH1)
        gamePreviewDiv.appendChild(versionH2)
        gamePreviewDiv.appendChild(button)
    
    
        getElement("tab-content").appendChild(gamePreviewDiv)
    
        // <h1 id="game-description-title"></h1>
        var descTitle = document.createElement("h1")
        descTitle.innerHTML = ""
        descTitle.setAttribute("id", "game-description-title")
    
        // <h4 id="game-description"></h4>
        var desc = document.createElement("h4")
        desc.innerHTML = ""
        desc.setAttribute("id", "game-description")
    
        // <div>
        // ...
        // </div>
        var descDiv = document.createElement("div")
    
        descDiv.appendChild(descTitle)
        descDiv.appendChild(desc)
    
        getElement("tab-content").appendChild(descDiv)
    }
}

function loadSocialTab() {
    createSocialContent()



    function createSocialContent() {
        var friendTab = document.createElement("div")
        friendTab.innerHTML = "Friends"
        friendTab.setAttribute("class", "header_tab_sub")
        friendTab.setAttribute("id", "friend-tab")

        var groupsTab = document.createElement("div")
        groupsTab.innerHTML = "Groups"
        groupsTab.setAttribute("class", "header_tab_sub")
        groupsTab.setAttribute("id", "groups-tab")

        var subMenuDiv = document.createElement("div")
        subMenuDiv.setAttribute("class", "header-sub")

        subMenuDiv.appendChild(friendTab)
        subMenuDiv.appendChild(groupsTab)

        getElement("tab-content").appendChild(subMenuDiv)

        var addFriendIcon = document.createElement("i")
        addFriendIcon.setAttribute("id", "ico-addFriend")
        addFriendIcon.setAttribute("class", "fas fa-plus-circle")

        var addFriendButton = document.createElement("div")
        addFriendButton.setAttribute("class", "button_icon")
        addFriendButton.setAttribute("id", "add-friend")
        addFriendButton.appendChild(addFriendIcon)

        getElement("tab-content").appendChild(addFriendButton)

        var testFriendImage = document.createElement("img")
        testFriendImage.setAttribute("src", "../../concept/JasgIcon.png")

        var testFriendName = document.createElement("h1")
        testFriendName.innerHTML = "Cat Core"

        var testFriendStatus = document.createElement("h4")
        testFriendStatus.innerHTML = "Online"

        var messageInput = document.createElement("input")
        messageInput.setAttribute("type", "text")

        var sendIcon = document.createElement("i")
        sendIcon.setAttribute("id", "ico-send")
        sendIcon.setAttribute("class", "fas fa-paper-plane")

        var sendButton = document.createElement("div")
        sendButton.setAttribute("class", "button_icon")
        sendButton.appendChild(sendIcon)

        var messageBoxDiv = document.createElement("div")
        messageBoxDiv.appendChild(messageInput)
        messageBoxDiv.appendChild(sendButton)

        var testFriendDiv = document.createElement("div")
        testFriendDiv.appendChild(testFriendImage)
        testFriendDiv.appendChild(testFriendName)
        testFriendDiv.appendChild(testFriendStatus)
        testFriendDiv.appendChild(messageBoxDiv)

        var friendListDiv = document.createElement("div")
        friendListDiv.setAttribute("id", "friend-list")

        friendListDiv.appendChild(testFriendDiv)

        getElement("tab-content").appendChild(friendListDiv)
    }
}

function loadTab(tab: TAB) {
    getElement("tab-content").innerHTML = null
    if (tab == TAB.GAMES) loadGameTab()
    else if (tab == TAB.SOCIAL) loadSocialTab()
}