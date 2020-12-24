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
            name: "JASG1",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://www.americasfinestlabels.com/images/CCS400PL.jpg",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "JASG2",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "JASG3",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "JASG4",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "JASG5",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "JASG6",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "JASG7",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "JASG8",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "JASG9",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "JASG10",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        },
        {
            name: "JASG11",
            version: {
                name: "WorldGenTest",
                versionNumber: "0.0.0"
            },
            iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
            previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
            descriptionTitle: "Description",
            description: "Lorem ipsum dolor sit amet <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> consectetur adipisicing elit. Facilis dolorum, nesciunt maxime minus impedit aliquid expedita debitis rerum omnis consequuntur voluptates sit maiores officia tempora? Ea magnam rerum reiciendis beatae!",
            downloadURL: "",
            color: "#140C1F"
        }
    ]

    while (getElement("game-list").hasChildNodes()) {
        getElement("game-list").removeChild(getElement("game-list").childNodes[0])
    }

    for (const i in testGameInfo) {
        var gameIcon = document.createElement("img")
        gameIcon.setAttribute("src", testGameInfo[i].iconURL)
        gameIcon.setAttribute("class", "sidebar_item_icon")
        gameIcon.setAttribute("alt", "sidebar_item_icon")
        gameIcon.setAttribute("draggable", "false")

        var gameDiv = document.createElement("div")
        gameDiv.setAttribute("class", "sidebar_item")
        gameDiv.style.backgroundColor = testGameInfo[i].color
        gameDiv.appendChild(gameIcon)
        gameDiv.onclick = () => {
            selectGame(Number.parseInt(i))
        }

        getElement("game-list").appendChild(gameDiv)
    }
    console.log(getElement("game-list").children)

    selectGame(0)

    function selectGame(id: number) {
        getElement("game-preview").style.backgroundImage = "url(" + testGameInfo[id].previewURL + ")"
        getElement("game-icon").setAttribute("src", testGameInfo[id].iconURL)
        getElement("game-title").innerHTML = testGameInfo[id].name
        getElement("game-version").innerHTML = testGameInfo[id].version.name
        getElement("game-description-title").innerHTML = testGameInfo[id].descriptionTitle
        getElement("game-description").innerHTML = testGameInfo[id].description
    }

    function createGameContent() {
        // <img src="" alt="game-icon" id="game-icon">
        var iconImg = document.createElement("img")
        iconImg.setAttribute("src", "")
        iconImg.setAttribute("alt", "game-icon")
        iconImg.setAttribute("id", "game-icon")
        iconImg.setAttribute("draggable", "false")
    
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
    
        gamePreviewDiv.appendChild(iconImg)
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
        addFriendIcon.setAttribute("class", "fas fa-paper-plane")

        var addFriendButton = document.createElement("div")
        addFriendButton.setAttribute("class", "button_icon")
        addFriendButton.setAttribute("id", "add-friend")
        addFriendButton.appendChild(addFriendIcon)

        /*var addFriendButton = document.createElement("input")
        addFriendButton.setAttribute("type", "submit")
        addFriendButton.setAttribute("id", "add-friend")
        addFriendButton.setAttribute("class", "button_icon")
        addFriendButton.setAttribute("value", "+")*/

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