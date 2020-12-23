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
    var testGameInfo = {
        name: "JASG",
        version: {
            name: "WorldGenTest",
            versionNumber: "0.0.0"
        },
        iconURL: "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG",
        previewURL: "https://silasgreen.com/wp-content/uploads/2015/10/Undertale-title-banner.png",
        descriptionTitle: "Description",
        description: "JASG is a game",
        downloadURL: "",
        color: "#140C1F"
    }

    while (getElement("game-list").hasChildNodes()) {
        getElement("game-list").removeChild(getElement("game-list").childNodes[0])
    }

    var gameIcon = document.createElement("img")
    gameIcon.setAttribute("src", testGameInfo.iconURL)
    gameIcon.setAttribute("class", "sidebar_item_icon")
    gameIcon.setAttribute("alt", "sidebar_item_icon")

    var gameDiv = document.createElement("div")
    gameDiv.setAttribute("class", "sidebar_item")
    gameDiv.style.backgroundColor = testGameInfo.color
    gameDiv.appendChild(gameIcon)
    gameDiv.onclick = () => {
        selectGame(testGameInfo.name)
    }

    getElement("game-list").appendChild(gameDiv)

    selectGame(testGameInfo.name)

    function selectGame(name: string) {
        getElement("game-preview").style.backgroundImage = "url(" + testGameInfo.previewURL + ")"
        getElement("game-icon").setAttribute("src", testGameInfo.iconURL)
        getElement("game-title").innerHTML = testGameInfo.name
        getElement("game-version").innerHTML = testGameInfo.version.name
        getElement("game-description-title").innerHTML = testGameInfo.descriptionTitle
        getElement("game-description").innerHTML = testGameInfo.description
    }
}

function loadTab(tab: TAB) {
    if (tab == TAB.GAMES) loadGameTab()
}